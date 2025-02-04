import { desc, eq, and } from "drizzle-orm";

import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";

import { sampleBooks } from "@/constants";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";

const Home = async () => {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(1)
    .orderBy(desc(books.createdAt))) as Book[];

  // Get merged book data with borrow status
  const mergedBooks = await db
    .select()
    .from(books)
    .leftJoin(borrowRecords, and(
      eq(borrowRecords.bookId, books.id),
      eq(borrowRecords.userId, session?.user?.id as string)
    ))
    .orderBy(desc(books.createdAt))
    .limit(10);

  // Transform the query result into Book format
  const transformedBooks = mergedBooks.map((record) => ({
    ...record.books,
    isLoanedBook: record.borrow_records?.status === "BORROWED" ? true : false,
    dueDate: record.borrow_records?.dueDate,
    borrowDate: record.borrow_records?.borrowDate
  })) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList
        title="Latest Books"
        books={transformedBooks}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
