import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

import BookCover from "@/components/BookCover";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

// interface Props extends Book {
//   isLoanedBook?: boolean;
//   borrowDate?: string;
//   dueDate?: string;
// }

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
  borrowDate,
  dueDate,
}: Book) => {
  return (
    <li className={cn(isLoanedBook && "w-full xs:w-52")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={coverColor} coverImage={coverUrl} />

        <div className={cn("mt-4", !isLoanedBook && "max-w-28 xs:max-w-40")}>
          <div className="book-title">{title}</div>
          <div className="book-genre">{genre}</div>
        </div>
      </Link>
      {isLoanedBook && (
        <div className="mt-3 w-full">
          <div className="book-loaned">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-light-100">{dayjs(dueDate).diff(dayjs(), "day")} days left to return</p>
          </div>

          <Button className="book-btn">Download receipt</Button>
        </div>
      )}
    </li>
  );
};

export default BookCard;
