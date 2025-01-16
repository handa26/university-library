import Image from "next/image";

import { cn } from "@/lib/utils";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra-small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor: string;
  coverImage: string;
}

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      BOOK SIDE SVG
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "80%" }}
      >
        <Image
          src={coverImage}
          alt="book cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};

export default BookCover;
