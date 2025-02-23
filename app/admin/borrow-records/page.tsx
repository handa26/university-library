import { eq } from "drizzle-orm";

import BorrowBookList from "@/components/admin/BorrowBookList";

import { db } from "@/database/drizzle";
import { borrowRecords, books, users } from "@/database/schema";

const Page = async () => {
  const borrowRequests = await db
    .select()
    .from(borrowRecords)
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .leftJoin(users, eq(borrowRecords.userId, users.id))
    .limit(10);

  const transformedBorrowRequests = borrowRequests.map((borrowRequest) => {
    const { userId, bookId, createdAt, ...rest } = borrowRequest.borrow_records;

    return {
      ...rest,
      bookTitle: borrowRequest.books?.title,
      userRequested: borrowRequest.users?.fullName,
      coverUrl: borrowRequest.books?.coverUrl,
      coverColor: borrowRequest.books?.coverColor
    };
  }) as BorrowBookListProps[];

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div>
        <h2 className="text-xl font-semibold">Borrow Book Requests</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <BorrowBookList borrowRequests={transformedBorrowRequests} />
      </div>
    </section>
  );
};

export default Page;
