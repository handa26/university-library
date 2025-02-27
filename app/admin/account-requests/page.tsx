import { eq, and, or } from "drizzle-orm";

import AccountRequestsList from "@/components/admin/AccountRequestsList";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { AccountRequest } from "@/components/admin/AccountRequestsList";

const Page = async () => {
  const accountRequests = (await db
    .select()
    .from(users)
    .where(or(eq(users.status, "PENDING"), eq(users.status, "REJECTED")))) as AccountRequest[];

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div>
        <h2 className="text-xl font-semibold">Account Registration Requests</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <AccountRequestsList requests={accountRequests} />
      </div>
    </section>
  );
};

export default Page;
