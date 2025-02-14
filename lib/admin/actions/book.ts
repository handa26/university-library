"use server";
import { eq } from "drizzle-orm";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};

export const updateBook = async ({
  bookId,
  params,
}: {
  bookId: string;
  params: BookParams;
}) => {
  try {
    const updateBook = await db
      .update(books)
      .set({
        ...params,
        availableCopies: params.totalCopies,
      })
      .where(eq(books.id, bookId))
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updateBook[0])),
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    await db.delete(borrowRecords).where(eq(borrowRecords.bookId, bookId));
    const result = await db.delete(books).where(eq(books.id, bookId));

    if (!result) {
      return {
        success: false,
        message: "Book not found",
      };
    }

    return {
      success: true,
      message: "Book deleted successfully",
    };
  } catch (error: any) {
    console.error("Error deleting book:", error);
    return {
      success: false,
      message: error.message || "An error occurred while deleting the book",
    };
  }
};
