import { eq, desc, and } from "drizzle-orm";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import BookList from "@/components/BookList";
import UniversityCard from "@/components/UniversityCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { signOut } from "@/auth";
import { sampleBooks } from "@/constants";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { users, borrowRecords, books } from "@/database/schema";
import { getInitials } from "@/lib/utils";

const Page = async () => {
  const session = await auth();

  const [currentUser] = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user?.id as string))
    .limit(1);

  const borrowedRecords = await db
    .select()
    .from(borrowRecords)
    .rightJoin(books, eq(borrowRecords.bookId, books.id))
    .where(
      and(
        eq(borrowRecords.userId, session?.user?.id as string),
        eq(borrowRecords.status, "BORROWED")
      )
    )
    .orderBy(desc(borrowRecords.createdAt));

  return (
    <>
      {/* <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form> */}

      {/* <BookList title="Borrowed Books" books={sampleBooks} /> */}
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_card-pin">
            <div />
          </div>

          <div className="mt-[30px] flex gap-5 md:mt-[70px]">
            <div className="flex items-center justify-center rounded-full md:bg-[#333C5C] md:w-[110px] md:h-[110px]">
              {/* <Image
                src="https://placehold.co/99x99.png"
                alt=""
                width={99}
                height={99}
                className="rounded-full"
              /> */}
              <Avatar className="h-[50px] w-[50px] md:h-[90px] md:w-[90px]">
                <AvatarFallback className="bg-amber-100">
                  {getInitials(session?.user?.name || "IN")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              {currentUser?.status === "APPROVED" ? (
                <p className="text-[12px] flex items-center gap-1 text-white md:text-[14px]">
                  <BadgeCheck className="inline h-[16px] w-[16px]" /> Verified
                  Student
                </p>
              ) : (
                <p className="text-[12px] text-red-700 md:text-[14px]">
                  Account not verified yet.
                </p>
              )}
              <p className="font-semibold text-[24px] text-white md:mt-[10px] md:mb-[5px]">
                {currentUser?.fullName}
              </p>
              <p className="text-[14px] text-[#D6E0FF]">{currentUser?.email}</p>
            </div>
          </div>

          <div className="mt-[32px]">
            <p className="text-[16px] text-[#D6E0FF] md:text-[18px]">
              Student ID:
            </p>
            <p className="font-semibold text-[20px] text-white md:text-[24px]">
              {currentUser?.universityId}
            </p>
          </div>

          <div className="mt-[32px]">
            <UniversityCard universityCard={currentUser?.universityCard} />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <BookList
            title="Borrowed Books"
            books={borrowedRecords.map((record) => ({
              // Spread book details
              ...record.books,
              isLoanedBook:
                record.borrow_records?.status === "BORROWED" ? true : false,
              dueDate: record.borrow_records?.dueDate,
              // Add borrow-specific information
              // Include other borrow record fields if needed
            }))}
          />
        </div>
      </section>
    </>
  );
};

export default Page;
