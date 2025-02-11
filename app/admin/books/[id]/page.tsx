import Link from "next/link";
import { MoveLeft, PencilLine } from "lucide-react";
import { eq } from "drizzle-orm";

import { Button } from "@/components/ui/button";
import BookCover from "@/components/BookCover";
import BookVideo from "@/components/BookVideo";

import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { formatDate } from "@/lib/utils";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const id = (await params).id;

  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  return (
    <>
      <Button className="back-btn flex items-center gap-2">
        <MoveLeft />
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full">
        <div className="flex gap-[35px] w-1/2">
          <div
            className="w-[266px] h-[228px] bg-[#C4214C] flex justify-center items-center rounded-md"
            style={{ backgroundColor: `${bookDetails.coverColor}33` }}
          >
            <BookCover
              coverColor={bookDetails.coverColor}
              coverImage={bookDetails.coverUrl}
              variant="medium"
            />
          </div>

          <div className="font-ibm-plex-sans w-full flex flex-col justify-between">
            <p className="text-[#64748B] text-[18px]">
              Created at:{" "}
              <span className="text-[#3A354E]">
                {formatDate(bookDetails.createdAt!)}
              </span>
            </p>
            <h2 className="font-semibold text-[24px] leading-[30px] text-[#1E293B]">
              {bookDetails?.title}
            </h2>
            <p className="font-semibold text-[18px] leading-[24px] text-[#3A354E]">
              By {bookDetails?.author}
            </p>
            <p className="text-[16px] leading-[18px] text-[#64748B]">
              {bookDetails?.genre}
            </p>
            <Button className="w-full h-[44px] bg-[#25388C] text-white flex items-center gap-2">
              <PencilLine />
              <Link href={`/admin/books/${id}/edit`}>Edit Book</Link>
            </Button>
          </div>
        </div>

        <div className="flex mt-[36px] gap-[35px]">
          <div className="space-y-5 font-ibm-plex-sans w-1/2">
            <h4 className="text-[16px] font-semibold text-[#1E293B] mb-[16px]">
              Summary
            </h4>
            {bookDetails.summary.split("\n").map((p, i) => (
              <p className="text-[16px] text-slate-500" key={i}>
                {p}
              </p>
            ))}
          </div>

          <div>
            <h4 className="text-[16px] font-semibold text-[#1E293B] mb-[16px]">
              Video
            </h4>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
