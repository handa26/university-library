import { SquarePen, Trash2 } from "lucide-react";
import { desc } from "drizzle-orm";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookCover from "@/components/BookCover";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { formatDate } from "@/lib/utils";

const BookList = async () => {
  const allBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Book Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Date Created</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allBooks.map((book) => (
          <TableRow key={book.title}>
            <TableCell>
              <Link
                href={`/admin/books/${book.id}`}
                className="flex items-center gap-2"
              >
                <BookCover
                  coverColor={book.coverColor}
                  coverImage={book.coverUrl}
                  variant="extraSmall"
                />
                {book.title}
              </Link>
            </TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.genre}</TableCell>
            <TableCell>{formatDate(book.createdAt!)}</TableCell>
            <TableCell className="flex gap-4 items-center align-middle">
              <Link href={`/admin/books/${book.id}/edit`}>
                <SquarePen className="text-[#0089F1] size-6" />
              </Link>
              <Trash2 className="text-[#EF3A4B] size-6" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookList;
