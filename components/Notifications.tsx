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
};

interface Props {
  id: string;
  type: string;
  message: string;
  read: boolean;
}

const Notifications = ({ notifications }: { notifications: Props[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <span className="absolute -top-2 -right-2 bg-[#FF5969] text-white text-xs font-ibm-plex-sans font-bold px-1 rounded-full">
          {notifications.length > 9
            ? "9+"
            : notifications.length === 0
            ? ""
            : notifications.length}
        </span>
        <Bell className="size-6 text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[346px] bg-slate-900 border-slate-800 text-slate-200 lg:mr-[310px] p-0">
        <ScrollArea className="h-72 w-auto mr-auto">
          <div className="p-2 flex justify-end">
            <p className="text-slate-400 font-ibm-plex-sans cursor-pointer">
              Mark all as read
            </p>
          </div>
          <div className="p-0">
            {notifications.map((notification) => {
              return (
                <div
                  className={cn(
                    "hover:bg-slate-200 hover:bg-opacity-10 transition-all duration-300",
                    notification.read ? "bg-slate-800" : "bg-slate-900"
                  )}
                  key={notification.id}
                >
                  <Link
                    href={notifTypeUrlMap[notification.type]}
                    className="font-ibm-plex-sans text-[14px] inline-block mb-2 p-2"
                  >
                    <h4 className="font-bold text-white">
                      {notifTypeStatusMap[notification.type]}
                    </h4>
                    <p className="text-slate-400">{notification.message}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
