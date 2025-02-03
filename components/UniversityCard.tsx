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
        className="rounded-sm object-fill w-full h-[287px]"
        loading="lazy"
        lqip={{ active: true }}
      />
    </>
  );
};

export default UniversityCard;
