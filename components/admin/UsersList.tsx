import { Trash2, SquareArrowOutUpRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

// {`${user.role === "ADMIN" ? "text-[#027A48]" : "text-[#C11574] bg-[#FDF2FA] w-[50px] h-[24px] rounded-full flex justify-center items-center"}`}

const UsersList = ({ users }: { users: User[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date Joined</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Books Borrowed</TableHead>
          <TableHead>University ID No</TableHead>
          <TableHead>University ID Card</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.fullName}</TableCell>
            <TableCell>{formatDate(user.createdAt!)}</TableCell>
            <TableCell>
              <span
                className={cn(
                  "w-[50px] h-[24px] rounded-full flex justify-center items-center",
                  user.role === "ADMIN"
                    ? "text-[#027A48] bg-[#ECFDF3]"
                    : "text-[#C11574] bg-[#FDF2FA]"
                )}
              >
                {user.role === "ADMIN" ? "Admin" : "User"}
              </span>
            </TableCell>
            <TableCell>{user.booksBorrowed}</TableCell>
            <TableCell>{user.universityId}</TableCell>
            <TableCell>
              <a
                href={`https://ik.imagekit.io/handa26${user.universityCard}`}
                className="text-[#0089F1] flex items-center gap-2"
                target="_blank"
              >
                View ID Card
                <SquareArrowOutUpRight className="inline" />
              </a>
            </TableCell>
            <TableCell className="">
              <Trash2 className="text-[#EF3A4B] size-6 inline" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersList;
