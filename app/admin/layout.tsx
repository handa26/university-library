import { ReactNode } from "react";
import { redirect } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";

import { auth } from "@/auth";
import "@/styles/admin.css";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />

      <div className="admin-container">
        <p>header</p>
        {children}
      </div>
    </main>
  );
};

export default Layout;
