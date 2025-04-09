"use client";
import { IKImage } from "imagekitio-next";

import config from "@/lib/config";

const UniversityCard = ({ universityCard }: { universityCard: string }) => {
  return (
    <>
      <IKImage
        path={universityCard}
        urlEndpoint={config.env.imagekit.urlEndpoint}
        alt="university card"
        width={0}
        height={0}
        className="rounded-sm object-fill w-full h-[200px] md:h-[287px]"
        loading="lazy"
        lqip={{ active: true }}
      />
    </>
  );
};

export default UniversityCard;
