"use server";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { createNotification } from "@/lib/actions/notification";

export const borrowBook = async (params: BorrowBookParams) => {
  const { bookId, userId } = params;

  try {
    // Check if the book exists and has available copies
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available",
      };
    }

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      status: "PENDING",
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while requesting the book",
    };
  }
};

export const approveBorrowRequest = async (borrowId: string) => {
  try {
    const borrowRecord = await db
      .select({
        id: borrowRecords.id,
        bookId: borrowRecords.bookId,
        status: borrowRecords.status,
        userId: borrowRecords.userId,
      })
      .from(borrowRecords)
      .where(eq(borrowRecords.id, borrowId))
      .limit(1);

    if (!borrowRecord.length || borrowRecord[0].status !== "PENDING") {
      return {
        success: false,
        error: "Invalid or already processed borrow request",
      };
    }

    const book = await db
      .select({ availableCopies: books.availableCopies, title: books.title })
      .from(books)
      .where(eq(books.id, borrowRecord[0].bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is no longer available",
      };
    }

    const borrowDate = new Date();
    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    await db
      .update(borrowRecords)
      .set({
        status: "BORROWED",
        borrowDate,
        dueDate,
      })
      .where(eq(borrowRecords.id, borrowId));

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, borrowRecord[0].bookId));

    await createNotification(
      borrowRecord[0].userId,
      `Your borrow request for "${book[0].title}" has been accepted.`,
      "borrow_request_accepted"
    );

    return {
      success: true,
      message: "Borrow request approved",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while approving the borrow request",
    };
  }
};

export const rejectBorrowRequest = async (borrowId: string) => {
  try {
    const borrowRecord = await db
      .select({
        id: borrowRecords.id,
        status: borrowRecords.status,
        userId: borrowRecords.userId,
      })
      .from(borrowRecords)
      .where(eq(borrowRecords.id, borrowId))
      .limit(1);

    if (!borrowRecord.length || borrowRecord[0].status !== "PENDING") {
      return {
        success: false,
        error: "Invalid or already processed borrow request",
      };
    }

    await db
      .update(borrowRecords)
      .set({ status: "REJECTED" })
      .where(eq(borrowRecords.id, borrowId));

    const book = await db
      .select({ title: books.title })
      .from(books)
      .where(eq(books.id, borrowRecord[0].id))
      .limit(1);

    await createNotification(
      borrowRecord[0].userId,
      `Your borrow request for "${book[0].title}" has been rejected.`,
      "borrow_request_rejected"
    );

    return {
      success: true,
      message: "Borrow request rejected",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while rejecting the borrow request",
    };
  }
};

export const returnBook = async (borrowId: string) => {
  try {
    const borrowRecord = await db
      .select({
        id: borrowRecords.id,
        bookId: borrowRecords.bookId,
        status: borrowRecords.status,
        dueDate: borrowRecords.dueDate,
      })
      .from(borrowRecords)
      .where(eq(borrowRecords.id, borrowId))
      .limit(1);

    if (!borrowRecord.length || borrowRecord[0].status !== "BORROWED") {
      return {
        success: false,
        error: "Invalid or not borrowed book",
      };
    }

    const returnDate = new Date();
    const isLate = returnDate > new Date(borrowRecord[0].dueDate!);

    await db
      .update(borrowRecords)
      .set({
        status: isLate ? "LATE_RETURN" : "RETURNED",
        returnDate: returnDate.toDateString(),
      })
      .where(eq(borrowRecords.id, borrowId));

    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, borrowRecord[0].bookId))
      .limit(1);

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies + 1 })
      .where(eq(books.id, borrowRecord[0].bookId));

    return {
      success: true,
      message: isLate ? "Book returned late" : "Book returned on time",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while returning the book",
    };
  }
};
