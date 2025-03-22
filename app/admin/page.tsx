import Link from "next/link";
import { CalendarDays } from "lucide-react";

import BookCover from "@/components/BookCover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { getRecentBorrowRequest, getTotalBorrowedBooks } from "@/lib/actions/book";
import { getRecentlyAddedBooks } from "@/lib/admin/actions/book";
import { getAccountRequests } from "@/lib/admin/actions/user";
import { formatDate } from "@/lib/utils";
import { auth } from "@/auth";
import { getInitials } from "@/lib/utils";

const Page = async () => {
  const session = await auth();

  const recentBorrowRequests = await getRecentBorrowRequest(3);
  const recentlyAddedBooks = await getRecentlyAddedBooks(5);
  const accountRequests = await getAccountRequests(5);
  const totalBorrowedBooks = await getTotalBorrowedBooks();

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        {/* Statistics cards */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
          <Link
            href="/admin/borrow-records"
            className="p-4 bg-white rounded-lg shadow hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <p className="text-gray-600">Borrowed Books</p>
              <span className="text-green-500 text-sm">+2</span>
            </div>
            <h2 className="text-3xl font-bold text-black">10</h2>
          </Link>
          <Link
            href="/admin/users"
            className="p-4 bg-white rounded-lg shadow hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <p className="text-gray-600">Total Users</p>
              <span className="text-green-500 text-sm">+5</span>
            </div>
            <h2 className="text-3xl font-bold text-black">15</h2>
          </Link>
          <Link
            href="/admin/books"
            className="p-4 bg-white rounded-lg shadow hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <p className="text-gray-600">Total Books</p>
              <span className="text-green-500 text-sm">+1</span>
            </div>
            <h2 className="text-3xl font-bold text-black">3</h2>
          </Link>
        </div>

        {/* Quick Access Sections */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
          {/* Borrow Requests */}
          <div className="bg-white p-4 rounded-lg shadow font-ibm-plex-sans">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">Borrow Requests</h3>
              <Link
                href="/admin/borrow-records"
                className="text-[#25388C] font-semibold bg-[#F8F8FF] p-2 rounded-md"
              >
                View All
              </Link>
            </div>
            {recentBorrowRequests.map((request) => (
              <div
                key={request.borrow_records.id}
                className="flex gap-[16px] mb-2 bg-[#F8F8FF] p-2 rounded-md"
              >
                <BookCover
                  coverColor={request.books?.coverColor!}
                  coverImage={request.books?.coverUrl}
                  variant="small"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-[16px] font-semibold text-[#1E293B] mb-[2px]">
                    {request.books?.title}
                  </p>
                  <p className="text-[14px] text-[#64748B]">
                    By {request.books?.author} • {request.books?.genre}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="text-[12px] text-[#3A354E]">
                      {request.users?.fullName}
                    </p>
                    <p className="text-[12px] text-[#3A354E] flex gap-1 items-center">
                      <CalendarDays className="w-[20px]" />
                      {request.borrow_records?.dueDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recently Added Books */}
          <div className="bg-white p-4 rounded-lg shadow font-ibm-plex-sans">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">
                Recently Added Books
              </h3>
              <Link
                href="/admin/books"
                className="text-[#25388C] font-semibold bg-[#F8F8FF] p-2 rounded-md"
              >
                View All
              </Link>
            </div>
            <Link
              href="/admin/books/new"
              className="flex justify-center items-center mb-4 p-2 border border-blue-500 text-blue-500 rounded-full"
            >
              + Add a New Book
            </Link>
            {recentlyAddedBooks.map((book) => (
              <div
                key={book.id}
                className="flex gap-[16px] mb-2 bg-[#F8F8FF] p-2 rounded-md"
              >
                <BookCover
                  coverColor={book?.coverColor!}
                  coverImage={book?.coverUrl}
                  variant="small"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-[16px] font-semibold text-[#1E293B] mb-[2px]">
                    {book?.title}
                  </p>
                  <p className="text-[14px] text-[#64748B]">
                    By {book?.author} • {book?.genre}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="text-[12px] text-[#3A354E] flex gap-1 items-center">
                      <CalendarDays className="w-[20px]" />
                      {formatDate(book?.createdAt!)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Account Requests */}
          <div className="bg-white p-4 rounded-lg shadow font-ibm-plex-sans">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">Account Requests</h3>
              <Link
                href="/admin/account-requests"
                className="text-[#25388C] font-semibold bg-[#F8F8FF] p-2 rounded-md"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {accountRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-[#F8F8FF] rounded-md shadow-sm p-4 flex flex-col items-center font-ibm-plex-sans"
                >
                  <Avatar className="w-[48px] h-[48px] mb-2">
                    <AvatarFallback className="bg-amber-100">
                      {getInitials(request.fullName || "IN")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-[16px] text-[#1E293B] font-medium">
                    {request.fullName}
                  </p>
                  <p className="text-[14px] text-[#64748B]">{request.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
