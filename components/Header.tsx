import Link from "next/link";
import Image from "next/image";
import { LogOut, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { signOut, auth } from "@/auth";
import { getInitials } from "@/lib/utils";

const Header = async () => {
  const session = await auth();

  return (
    <header className="my-10 flex items-center justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <div className="flex items-center gap-5">
        <Link href="/search">
          <span className="max-sm:hidden text-[20px] text-white font-ibm-plex-sans">Search</span>
          <Search className="size-6 text-white sm:hidden" />
        </Link>

        <Link href="/my-profile">
          <Avatar>
            <AvatarFallback className="bg-amber-100">
              {getInitials(session?.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>
        </Link>

        <button
          onClick={async () => {
            "use server";

            await signOut();
          }}
        >
          <LogOut className="size-6 text-[#FF5969]" />
        </button>
      </div>
    </header>
  );
};

export default Header;
