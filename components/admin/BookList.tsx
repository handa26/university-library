import { SquarePen, Trash2 } from "lucide-react";
import { desc } from "drizzle-orm";

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

const dummyBooks = [
  {
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell and Peter Norvig",
    genre: "Artificial Intelligence",
    coverUrl:
      "https://m.media-amazon.com/images/I/61nHC3YWZlL._AC_UF1000,1000_QL80_.jpg",
    coverColor: "#c7cdd9",
    dateCreated: "2025-01-30",
  },
  {
    title: "Computer Networking: A Top-Down Approach",
    author: "James F. Kurose and Keith W. Ross",
    genre: "Networking",
    coverUrl:
      "https://m.media-amazon.com/images/I/91hg1HHyiWL._AC_UF1000,1000_QL80_.jpg",
    coverColor: "#f7a13e",
    dateCreated: "2025-01-30",
  },
];

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
            <TableCell className="flex items-center gap-2">
              <BookCover
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
                variant="extraSmall"
              />
              {book.title}
            </TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.genre}</TableCell>
            <TableCell>{formatDate(book.createdAt!)}</TableCell>
            <TableCell className="flex gap-4 items-center align-middle">
              <SquarePen className="text-[#0089F1] size-6" />
              <Trash2 className="text-[#EF3A4B] size-6" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookList;
