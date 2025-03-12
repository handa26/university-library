"use client";
import { Bell } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

const dummyNotifications = [
  {
    id: "notif-1",
    userId: "user-1",
    type: "verfication_accepted",
    message: "Your account verification has been accepted.",
    createdAt: new Date("2023-10-01T10:00:00Z"),
    read: false,
  },
  {
    id: "notif-2",
    userId: "user-1",
    type: "borrow_request_accepted",
    message: "Your borrow request for 'The Great Gatsby' has been accepted.",
    createdAt: new Date("2023-10-02T14:30:00Z"),
    read: true,
  },
  {
    id: "notif-3",
    userId: "user-2",
    type: "overdue_reminder",
    message: "You have an overdue book: '1984'. Please return it immediately.",
    createdAt: new Date("2023-10-03T09:15:00Z"),
    read: false,
  },
  {
    id: "notif-4",
    userId: "user-2",
    type: "verfication_rejected",
    message:
      "Your account verification has been rejected. Please resubmit your documents.",
    createdAt: new Date("2023-10-04T11:45:00Z"),
    read: false,
  },
  {
    id: "notif-5",
    userId: "user-3",
    type: "other",
    message: "You have a new message from the library.",
    createdAt: new Date("2023-10-05T16:20:00Z"),
    read: true,
  },
  {
    id: "notif-6",
    userId: "user-1",
    type: "borrow_request_accepted",
    message:
      "Your borrow request for 'To Kill a Mockingbird' has been accepted.",
    createdAt: new Date("2023-10-06T13:00:00Z"),
    read: false,
  },
  {
    id: "notif-7",
    userId: "user-3",
    type: "overdue_reminder",
    message:
      "You have an overdue book: 'Pride and Prejudice'. Please return it immediately.",
    createdAt: new Date("2023-10-07T10:30:00Z"),
    read: false,
  },
  {
    id: "notif-8",
    userId: "user-2",
    type: "verfication_accepted",
    message: "Your account verification has been accepted.",
    createdAt: new Date("2023-10-08T15:45:00Z"),
    read: true,
  },
  {
    id: "notif-9",
    userId: "user-1",
    type: "other",
    message: "Library will be closed on October 10th for maintenance.",
    createdAt: new Date("2023-10-09T12:00:00Z"),
    read: false,
  },
  {
    id: "notif-10",
    userId: "user-3",
    type: "borrow_request_accepted",
    message:
      "Your borrow request for 'The Catcher in the Rye' has been accepted.",
    createdAt: new Date("2023-10-10T17:30:00Z"),
    read: true,
  },
];

const notifTypeStatusMap: Record<string, string> = {
  verfication_accepted: "Verification Accepted",
  verfication_rejected: "Verification Rejected",
  borrow_request_accepted: "Borrow Request Accepted",
  overdue_reminder: "Overdue ",
  other: "Other",
};

const notifTypeUrlMap: Record<string, string> = {
  verfication_accepted: "/my-profile",
  verfication_rejected: "/my-profile",
  borrow_request_accepted: "/my-profile",
  overdue_reminder: "/",
  other: "/",
}

const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <span className="absolute -top-2 -right-2 bg-[#FF5969] text-white text-xs font-ibm-plex-sans font-bold px-1 rounded-full">
          10
        </span>
        <Bell className="size-6 text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[346px] bg-slate-900 border-slate-800 text-slate-200 lg:mr-[310px] p-0">
        <ScrollArea className="h-72 w-auto mr-auto">
          <div className="p-2 flex justify-end">
            <p className="text-slate-400 font-ibm-plex-sans cursor-pointer">Mark all as read</p>
          </div>
          <div className="p-0">
            {dummyNotifications.map((notification) => {
              return (
                <div className={cn("hover:bg-slate-200 hover:bg-opacity-10 transition-all duration-300", notification.read ? "bg-slate-800" : "bg-slate-900")}>
                  <Link href={notifTypeUrlMap[notification.type]} key={notification.id} className="font-ibm-plex-sans text-[14px] inline-block mb-2 p-2">
                    <h4 className="font-bold text-white">{notifTypeStatusMap[notification.type]}</h4>
                    <p className="text-slate-400">{notification.message}</p>
                  </Link>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
