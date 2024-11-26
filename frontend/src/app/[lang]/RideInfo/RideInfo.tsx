"use client";
import React from "react";
import Image from "next/image";
import { HandleNullImage, checkNull } from "../../[lang]/utils/api-helpers";
import TertiaryCTA from "../../[lang]/atoms/TertiaryCTA/TertiaryCTA";

interface RideInfoProps {
  data: {
    threeItemsInRow?: boolean;
    classes?: string;
    url: string;
    ridesInfoItems: any;
    ctaText?: string;
    ctaLink?: string;
  };
}
export default function RideInfo({ data }: RideInfoProps) {
  return (
    <>
      <section
        id={checkNull(data.url)}
        className={`ride-info ${
          data.threeItemsInRow ? "ride-info__three-col" : ""
        }`}
      >
        <div className="container">
          <div className="ride-info__container">
            <div
              className={`ride-info-wrapper flex flex-wrap gap-10 lg:gap-12 ${
                data.threeItemsInRow
                  ? " ride-info-wrapper__col-3 "
                  : " ride-info-wrapper__col-2 "
              }`}
            >
              {checkNull(data.ridesInfoItems) &&
                data.ridesInfoItems?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="ride-info__item flex flex-col text-center items-center gap-4 lg:gap-6"
                  >
                    <div className="ride-info__icon">
                      <Image
                        alt=""
                        width="80"
                        height="80"
                        src={HandleNullImage(item.ridesInfoImage) || ""}
                      />
                    </div>
                    <div className="ride-info__data flex flex-col gap-2">
                      <h5 className="h5 ride-info__title">{item.title}</h5>
                      <div className="ride-info__detail body-normal">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="ride-info__link">
              {data?.ctaText && (
                <TertiaryCTA
                  tag="a"
                  onClick={() => {}}
                  target="_self"
                  href={checkNull(data.ctaLink)}
                  children={checkNull(data.ctaText)}
                  iconRight="chevron_right"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
