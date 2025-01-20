import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>

          <div>{children}</div>
        </div>
      </section>

      <div className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="illustration"
          height={1000}
          width={1000}
          className="size-full object-cover"
        />
      </div>
    </main>
  );
};

export default Layout;
