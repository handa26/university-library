import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

import { auth } from "@/auth";
import "@/styles/admin.css";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const isAdmin = await db
    .select({ isAdmin: users.role})
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  if (!isAdmin) redirect("/");

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />

      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
