import { eq, and, sql, desc } from "drizzle-orm";

import SearchForm from "@/components/SearchForm";
import BookList from "@/components/BookList";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";

const Page = async ({ searchParams }: { searchParams: { query?: string } }) => {
  const session = await auth();
  const query = (await searchParams).query;

  const booksQuery = await db
    .select()
    .from(books)
    .where(query ? sql`lower(${books.title}) LIKE ${`%${query}%`}` : sql`1 = 0`)
    .leftJoin(
      borrowRecords,
      and(
        eq(borrowRecords.bookId, books.id),
        eq(borrowRecords.userId, session?.user?.id as string)
      )
    )
    .orderBy(desc(books.createdAt))
    .limit(10);

  const transformedBooks = booksQuery.map((record) => ({
    ...record.books,
    isLoanedBook: record.borrow_records?.status === "BORROWED" ? true : false,
    dueDate: record.borrow_records?.dueDate,
    borrowDate: record.borrow_records?.borrowDate,
  })) as Book[];

  return (
    <>
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <div className="text-center w-full mx-auto md:w-[700px]">
          <h2 className="text-[18px] text-[#D6E0FF] font-ibm-plex-sans uppercase mb-[14px]">
            Discover Your Next Great Read:
          </h2>
          <h1 className="text-[56px] font-semibold font-ibm-plex-sans text-white leading-[64px]">
            Explore and Search for{" "}
            <span className="text-[#FFE1BD]">Any Book</span> In Our Library
          </h1>

          <div className="mt-[32px]">
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        {query !== "" && (
          <h2 className="text-4xl text-light-100 font-ibm-plex-sans">
            Search Result for <span className="text-[#FFE1BD]">{query}</span>
          </h2>
        )}
        <BookList
          title=""
          books={transformedBooks}
          containerClassName="mt-10"
        />
      </section>
    </>
  );
};

export default Page;
