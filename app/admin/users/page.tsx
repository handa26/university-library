import { eq, ne, and, count } from "drizzle-orm";

import UsersList from "@/components/admin/UsersList";

import { db } from "@/database/drizzle";
import { auth } from "@/auth";
import { users, borrowRecords } from "@/database/schema";

const Page = async () => {
  const session = await auth();

  const usersWithBorrowCount = await db
  .select({
    user: users,
    borrowedCount: count(borrowRecords.id),
  })
  .from(users)
  .leftJoin(borrowRecords, and(eq(users.id, borrowRecords.userId), eq(borrowRecords.status, "BORROWED")))
  .groupBy(users.id)
  .where(ne(users.id, session?.user?.id as string));

  const transformedUsers = usersWithBorrowCount.map((user) => ({
    ...user.user,
    booksBorrowed: user.borrowedCount
  })) as User[];

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div>
        <h2 className="text-xl font-semibold">All Users</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <UsersList users={transformedUsers} />
      </div>
    </section>
  );
};

export default Page;
