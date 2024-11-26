"use client"
import React from "react";
import Image from "next/image";
import { useScreenType } from "../../utils/use-screenType";
import { checkNull, HandleNullImage } from "../../utils/api-helpers";
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
interface LocationCardProps {
  data : {
    classes?: string;
    img_src: Picture;
    desc?: string;
    url:string;
  }
}

export default function LocationCard({
  data
}: LocationCardProps) {
 let windowWidth = 904
  let isMobile = useScreenType(windowWidth);
  return (
    <>
      <section className={`location-card ${checkNull(data.classes)}`} id={checkNull(data.url)}>
        <div className="container">
          <div className="location-card__inner">
            <div className="grid grid-cols-12 lg:gap-10 items-center w-full">
              <div className="col-span-12 lg:col-span-6 h-full">
                <div className="location-card__image ">
                  {!isMobile ? (
                    <>
                      <svg
                        width="455"
                        height="399"
                        viewBox="0 0 455 399"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.548314 32.9454C-0.292321 23.7933 6.7322 15.8159 15.9171 15.4918L437.763 0.608169C447.066 0.279925 454.684 7.93257 454.314 17.2344L439.758 383.052C439.408 391.866 431.989 398.734 423.174 398.405L46.8278 384.355C38.792 384.055 32.2273 377.837 31.4918 369.83L0.548314 32.9454Z"
                          fill="white"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        width="295"
                        height="264"
                        viewBox="0 0 295 264"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.329921 18.0501C0.14809 13.6134 3.61433 9.87748 8.05218 9.72705L286.409 0.291208C291.051 0.13387 294.85 3.94863 294.675 8.58943L285.302 256.018C285.135 260.428 281.428 263.87 277.017 263.71L17.3994 254.269C13.2235 254.117 9.86791 250.777 9.6968 246.602L0.329921 18.0501Z"
                          fill="white"
                        />
                      </svg>
                    </>
                  )}

                  <Image
                    alt="card"
                    width="456"
                    height="399"
                    src={HandleNullImage(data?.img_src)}
                  />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 h-full">
                <div className="location-card__text">
                  {data?.desc && (
                    <div dangerouslySetInnerHTML={{ __html: checkNull(data.desc) }}></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
