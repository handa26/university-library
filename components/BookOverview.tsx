import Image from "next/image";
import { eq, is, and, desc } from "drizzle-orm";
import dayjs from "dayjs";

import BookCover from "@/components/BookCover";
import BorrowBook from "@/components/BorrowBook";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { db } from "@/database/drizzle";
import { users, borrowRecords } from "@/database/schema";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowedBook = await db
    .select()
    .from(borrowRecords)
    .where(and(eq(borrowRecords.bookId, id), eq(borrowRecords.userId, userId)))
    .orderBy(desc(borrowRecords.createdAt))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user?.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book.",
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books <span>{totalCopies}</span>
          </p>

          <p>
            Available Books <span>{availableCopies}</span>
          </p>
        </div>

        <p className="book-description">{description}</p>

        {user &&
        (!borrowedBook ||
          borrowedBook.length === 0 ||
          borrowedBook[0].status === "RETURNED") ? (
          <BorrowBook
            bookId={id}
            userId={userId}
            borrowingEligibility={borrowingEligibility}
          />
        ) : borrowedBook && borrowedBook[0].status === "PENDING" ? (
          <Alert className="bg-primary/10 border-primary/20 text-primary">
            <AlertDescription>
              Your borrow request is pending approval.
            </AlertDescription>
          </Alert>
        ) : borrowedBook && borrowedBook[0].status === "BORROWED" ? (
          <>
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">
                {borrowedBook[0].dueDate
                  ? `${dayjs(borrowedBook[0].dueDate).diff(
                      dayjs(),
                      "day"
                    )} days left to return`
                  : "Due date not set"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                className="min-h-14 w-fit bg-primary text-dark-100 hover:bg-primary/90 max-md:w-full"
                disabled
              >
                <p className="font-bebas-neue text-xl text-dark-100">
                  Borrowed
                </p>
              </Button>
              <Button className="bg-dark-600 min-h-14 w-fit font-bebas-neue text-base text-primary">
                Download receipt
              </Button>
            </div>
          </>
        ) : (
          <Alert className="bg-primary/10 border-primary/20 text-primary">
            <AlertDescription>
              You cannot borrow this book at this time.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
