import Image from "next/image";
import React from "react";
import { HandleNullImage } from "../../utils/api-helpers";
import { useScreenType } from "../../utils/use-screenType";

interface LeaderShipCardProps {
  theme: string;
  bio_name: string;
  bio_designation: string;
  bio_location: string;
  bio_joining: string;
  bio_info: string;
  bio_image_large: Picture;
  bio_image_small: Picture;
  bio_image_small_Mobile:Picture;
  onClick: () => void;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

const LeaderShipCard = ({
  onClick,
  bio_name,
  bio_designation,
  bio_image_large,
  bio_image_small,
  bio_image_small_Mobile
}: LeaderShipCardProps) => {
  let isMobile = useScreenType(599);
  const Desktop_img = HandleNullImage(bio_image_small);
  const Mobile_img = HandleNullImage(bio_image_small_Mobile);
  return (
    <>
      <div className="leader-ship__card" onClick={onClick}>
        <div className="inline-link"></div>
        <div className="leader-ship__media-wrap lg:mb-6 lg:ms-auto lg:me-auto">
          <div className="leader-ship__media-wrap-animation">
            <Image
              alt="bio"
              width={"264"}
              height={"250"}
              src={isMobile ? Mobile_img:Desktop_img}
            />
          </div>
          <div className="leader-ship__media-wrap-icon hidden lg:flex">
            <span className="material-symbols-outlined">
              east
            </span>
          </div>
        </div>
        <div className="leader-ship__content-wrap lg:text-center">
          <h3 className="mb-2 h5">{bio_name}</h3>
          <p className="label-small">{bio_designation}</p>
          <div className="leader-ship__media-wrap-icon flex lg:hidden">
            <span className="material-symbols-outlined">
              east
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderShipCard;
