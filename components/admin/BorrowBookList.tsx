import { format } from "date-fns";
import { ReceiptText } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookCover from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

const borrowStatusMap: Record<string, string> = {
  BORROWED: "Borrowed",
  RETURNED: "Returned",
  PENDING: "Pending",
  REJECTED: "Rejected",
  LATE_RETURN: "Late Return",
};

const borrowStatusColorMap: Record<string, string> = {
  BORROWED: "text-[#6941C6]",
  RETURNED: "text-[#026AA2]",
  PENDING: "text-[#CC5500]",
  REJECTED: "text-[#B22222]",
  LATE_RETURN: "text-[#C01048]",
};

const BorrowBookList = ({
  borrowRequests,
}: {
  borrowRequests: BorrowBookListProps[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="font-ibm-plex-sans">
          <TableHead>Book</TableHead>
          <TableHead>User Requested</TableHead>
          <TableHead>Borrowed Status</TableHead>
          <TableHead>Borrowed Date</TableHead>
          <TableHead>Return Date</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Receipt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {borrowRequests.map((borrowRequest) => (
          <TableRow key={borrowRequest.id} className="font-ibm-plex-sans">
            <TableCell className="flex items-center gap-2">
              <BookCover
                coverColor={borrowRequest.coverColor!}
                coverImage={borrowRequest.coverUrl}
                variant="extraSmall"
              />
              <p className="line-clamp-3 font-semibold">
                {borrowRequest.bookTitle}
              </p>
            </TableCell>
            <TableCell>
              <p className="font-semibold">{borrowRequest.userRequested}</p>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    "w-[83px] h-[24px] text-[12px] rounded-full flex justify-center items-center bg-[#F9F5FF]",
                    borrowStatusColorMap[borrowRequest.status]
                  )}
                >
                  {borrowStatusMap[borrowRequest.status] ||
                    borrowRequest.status}
                </DropdownMenuTrigger>
                {borrowRequest.status === "BORROWED" ? (
                  <DropdownMenuContent>
                    <DropdownMenuItem>Returned</DropdownMenuItem>
                    <DropdownMenuItem>Late Return</DropdownMenuItem>
                  </DropdownMenuContent>
                ) : borrowRequest.status === "PENDING" ? (
                  <DropdownMenuContent>
                    <DropdownMenuItem>Approve</DropdownMenuItem>
                    <DropdownMenuItem>Reject</DropdownMenuItem>
                  </DropdownMenuContent>
                ) : null}
              </DropdownMenu>
            </TableCell>
            <TableCell>
              <p>{format(new Date(borrowRequest.borrowDate!), "MMM d yyyy")}</p>
            </TableCell>
            <TableCell>
              <p>
                {borrowRequest.returnDate
                  ? format(new Date(borrowRequest.returnDate), "MMM d yyyy")
                  : "-"}
              </p>
            </TableCell>
            <TableCell>
              <p>{format(new Date(borrowRequest.dueDate!), "MMM d yyyy")}</p>
            </TableCell>
            <TableCell>
              <Button className="bg-[#F8F8FF] text-[#25388C] font-semibold hover:bg-[#dbdbdb]">
                <ReceiptText /> Generate
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BorrowBookList;
