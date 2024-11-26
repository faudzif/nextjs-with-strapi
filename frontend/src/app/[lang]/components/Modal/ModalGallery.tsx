import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import _ReactPlayer, { ReactPlayerProps } from "react-player";
import { useScreenType } from "../../utils/use-screenType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import { HandleNullImage, getStrapiMedia, pushDataLayer } from "../../utils/api-helpers";
import Image from "next/image";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";

export interface ModalGalleryProps {
  onClickClose?: () => void;
  gallerySliderIndex?: any;
  data?: any;
}

const Backdrop = (props: ModalGalleryProps) => {
  return <div className="backdrop" onClick={props.onClickClose} />;
};
const ModalOverlay = (props: any) => {

  const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

  const [firstSwiper, setFirstSwiper] = useState<any>();
  const [secondSwiper, setSecondSwiper] = useState<any>();
  const [isVideo, setIsVideo] = useState<any>(null);
  const [isplaying, setIsplaying] = useState<any>(false);
  const [videoUrl, setVideoUrl] = useState<any>(null);
  const reactPlayerRef = useRef<any>(null);
  const gallerySwiperRef = useRef<any>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [instanceOfThumbSlider, setInstanceOfThumbSLider] = useState<any>("");

  const loadChangeVideo = () => {
    const activeSlideVideo = gallerySwiperRef.current
      .querySelector(".swiper-slide-active")
      .getAttribute("data-is-video");
    const activeSlideVideoUrl = gallerySwiperRef.current
      .querySelector(".swiper-slide-active")
      .getAttribute("data-video-src");
    setIsVideo(activeSlideVideo);
    if (activeSlideVideo === "true") {
      setVideoUrl(`https://youtu.be/${activeSlideVideoUrl}`);
      if (activeSlideVideoUrl) {
        pushDataLayer({
          event: 'eventTracker',
          custom_event_name: 'video_engagement',
          title: props.data.title,
          eventCallback: function () {
            window.dataLayer.push({
              title: undefined,
              duration: undefined, type: undefined,
              percentage: undefined, time: undefined
            })
          }
        });
      }
    }
  };

  let isMobile = useScreenType(599);
  return (
    <div className="modal-gallery">
      <span className="modal-gallery__btn-close" onClick={props.onClickClose}>
        <span
          className="material-symbols-outlined icon-size-24"
          aria-hidden="true"
        >
          close
        </span>
      </span>
      <div className="modal-gallery__content-wrapper custom-scrollbar">
        <div className="modal-gallery__swiper-wrapper">
          <Swiper
            ref={gallerySwiperRef}
            className="modal-gallery__swiper-big"
            modules={[Thumbs, Navigation]}
            thumbs={{ swiper: thumbsSwiper }}
            navigation={true}
            initialSlide={props.gallerySliderIndex}
            simulateTouch={false}
            allowTouchMove={false}
            loop={false}
            slidesPerView={1}
            breakpoints={{
              600: {
                loop: false,
                slidesPerView: 1.525,
                centeredSlides: true,
                spaceBetween: 24,
              },
            }}
            onAfterInit={() => {
              setTimeout(() => {
                loadChangeVideo();
              }, 50);
            }}
            onSlideChange={() => {
              document
                .querySelectorAll(".modal-gallery__swiper-small .swiper-slide")
                .forEach((e, i) => {
                  if (e?.classList?.contains("swiper-slide-thumb-active")) {
                    instanceOfThumbSlider?.slideTo(i);
                  }
                });
            }}
            onSlideChangeTransitionStart={() => {
              setIsVideo("false");
              const activeSlideBigImage =
                gallerySwiperRef.current.querySelectorAll(
                  ".swiper-slide .modal-gallery__swiper-big--media"
                );
              activeSlideBigImage.forEach((bigImage: any) => {
                bigImage.classList?.remove("active");
              });
            }}
            onSlideChangeTransitionEnd={() => {
              setTimeout(() => {
                loadChangeVideo();
              }, 50);
            }}
          >
            {props.data.map((dataCard: any, index: number) => {


              return (
                <SwiperSlide
                  key={index}
                  data-is-video={dataCard.is_video}
                  data-video-src={dataCard.video_src}
                >
                  <div className="modal-gallery__swiper-big--content">
                    <div className="modal-gallery__swiper-big--media-wrapper">
                      <Image
                        className="modal-gallery__swiper-big--media"
                        src={isMobile ? HandleNullImage(dataCard.large_picture_Mobile) : HandleNullImage(dataCard?.large_picture)}
                        width={936}
                        height={624}
                        alt={
                          ""
                        }
                      />
                    </div>
                    <p className="mt-6 body-small">{dataCard.title}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {isMobile && (
            <Swiper
              className="modal-gallery__swiper-small"
              spaceBetween={8}
              slidesPerView={"auto"}
              modules={[Thumbs]}
              watchSlidesProgress={true}
              onSwiper={setThumbsSwiper}
              loop={false}
              centeredSlides={true}
              // centeredSlidesBounds={true}
              // slideToClickedSlide={true}
              initialSlide={props.gallerySliderIndex}
              onInit={(swiper: any) => {
                setInstanceOfThumbSLider(swiper);
              }}
            >
              {props.data.map((dataCard: any, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="modal-gallery__swiper-small--media-wrapper">
                      <Image
                        className="modal-gallery__swiper-small--media"
                        src={HandleNullImage(dataCard.large_picture_Mobile)}
                        width={86}
                        height={64}
                        alt={
                          ""
                        }
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          {isVideo === "true" && (
            <div className="modal-gallery__player-wrapper">
              <ReactPlayer
                ref={reactPlayerRef}
                url={videoUrl}
                width="100%"
                height="100%"
                playing={isplaying}
                muted={true}
                controls={true}
                onReady={() => {
                  gallerySwiperRef.current
                    .querySelector(
                      ".swiper-slide-active .modal-gallery__swiper-big--media"
                    )
                    .classList?.add("active");
                  // setIsplaying(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const ModalGallery = ({
  onClickClose,
  gallerySliderIndex,
  data,
}: ModalGalleryProps) => {
  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");
  return (
    <>
      {backdropRoot &&
        ReactDOM.createPortal(
          (<Backdrop onClickClose={onClickClose} />) as any,
          backdropRoot
        )}
      {overlayRoot &&
        ReactDOM.createPortal(
          (
            <ModalOverlay
              onClickClose={onClickClose}
              gallerySliderIndex={gallerySliderIndex}
              data={data}
            />
          ) as any,
          overlayRoot
        )}
    </>
  );
};

export default ModalGallery;
