import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import BookForm from "@/components/admin/forms/BookForm";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");

  return (
    <>
      <Button className="back-btn flex items-center gap-2" asChild>
        <Link href="/admin/books">
          <MoveLeft />
          Go Back
        </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="UPDATE" book={bookDetails} />
      </section>
    </>
  );
};

export default Page;
