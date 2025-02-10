import Link from "next/link";
import { MoveLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import BookForm from "@/components/admin/forms/BookForm";

const Page = () => {
  return (
    <>
      <Button className="back-btn flex items-center gap-2">
        <MoveLeft />
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
};

export default Page;
