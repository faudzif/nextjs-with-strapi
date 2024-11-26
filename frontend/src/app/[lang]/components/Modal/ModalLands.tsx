"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Heading from "../../atoms/Heading/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ModalLandAccordion from "../Lands/ModalLandAccordion";
import Button from "../../atoms/Button/Button";
import { HandleNullImage, pushDataLayer } from "../../utils/api-helpers";
import { useScreenType } from "../../utils/use-screenType";

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

interface Stat {
  statTitle: string;
  statDescription: string;
  markerPosition: string;
  icon: Picture;
}

interface Prop {
  propName: string;
  icon: Picture;
}

interface Accordian {
  rideName: string;
  desc: string;
  top: Number;
  left: Number;
  stat: Stat[];
  ctaText: string;
  ctaLink: string;
  selectRide:img;
}
interface img{
  data:{
    attributes:{
      rideImage:Picture
    }
  }
}

interface Overlay {
  id: number;
  overlayTitle: string;
  overlayDescription: string;
  mapImgDesktop: Picture;
  mapImgMobile: Picture;
  ExploreRide:string;
  accordian: Accordian[];
  prop: Prop[]
}

interface Land {
  mainTitle: string;
  landName: string;
  logoDesktop: Picture;
  logoMobile: Picture;
  bgMobile: Picture;
  bgDesktop: Picture;
  overlay: Overlay;
  posterDesktop: Picture
  posterMobile: Picture
}
interface Obj {
  land: Land[];
  backHome: string;
  url: string;
}
export interface ModalLandsProps {
  onClickClose?: () => void;
  landSliderIndex?: any;
  landSlideProps?: any;
  data: Obj;
  lang:string
}
type landSlideProps = {
  mainTitle: string;
  landName: string;
  logoDesktop: Picture;
  logoMobile: Picture;
  bgMobile: Picture;
  bgDesktop: Picture;
  overlay: Overlay;
  posterDesktop: Picture
  posterMobile: Picture
  text?: string;
}

type externalClickHandle = {
  clickEvent: (e: any) => void;
};
let landClassPrev: any = "";

const Backdrop = (props: any) => {
  return <div className="backdrop" onClick={props.onClickClose} />;
};
const ModalOverlay = (props: ModalLandsProps,) => {
  const [firstSwiper, setFirstSwiper] = useState<any>();
  const [secondSwiper, setSecondSwiper] = useState<any>();

  const childRef = useRef<externalClickHandle>(null);
  const pointClickHandler = (e: any) => {
    const prevActivePoint = document.querySelector(
      ".modal-land__swiper .swiper-slide-active .modal-land__accordion--map-points .active"
    );
    prevActivePoint?.classList?.remove("active");
    e.target.classList?.add("active");

    setTimeout(() => {
      firstSwiper.updateAutoHeight(500);
    }, 500);
    if (childRef.current) {
      childRef.current?.clickEvent(e);
    }
  };

  let isMobile = useScreenType(905);
  const landSwiperRef = useRef<any>(null);
  const landContentWrapperRef = useRef<any>(null);

  useEffect(() => {
    function fnBrowserDetect() {
      let userAgent = navigator.userAgent;
      let browserName;
      if (userAgent.match(/chrome|chromium|crios/i)) {
        browserName = "chrome";
      } else if (userAgent.match(/firefox|fxios/i)) {
        browserName = "firefox";
      } else if (userAgent.match(/safari/i)) {
        browserName = "safari";
        document.body.classList?.add(`safari_only`);
      } else {
        browserName = "No browser detection";
      }
    }
    fnBrowserDetect();
  }, []);
  const swiperNextHandle = (title: any) => {
    //GTM
    pushDataLayer({
      event: "eventTracker",
      custom_event_name: "cta_click",
      click_text: "carousel next arrow",
      title: title?.toLowerCase(),
      eventCallback: function () {
        window.dataLayer.push({
          click_text: undefined,
          title: undefined,
        });
      },
    });
  };
  const swiperPrevHandle = (title: any) => {
    //GTM
    pushDataLayer({
      event: "eventTracker",
      custom_event_name: "cta_click",
      click_text: "carousel previous arrow",
      title: title?.toLowerCase(),
      eventCallback: function () {
        window.dataLayer.push({
          click_text: undefined,
          title: undefined,
        });
      },
    });
  };
  return (
    <div className="modal-land">
      <Button
        tag="span"
        children={props.data.backHome}
        classes="modal-land__btn-close"
        iconLeft="reply"
        btnBg="white"
        onClick={props.onClickClose}
      />
      {/* <span className="modal-land__btn-close" onClick={props.onClickClose}>
        <span
          className="material-symbols-outlined icon-size-24"
          aria-hidden="true"
        >
          close
        </span>
      </span> */}
      <div
        className="modal-land__content-wrapper custom-scrollbar"
        ref={landContentWrapperRef}
      >
        <div className="modal-land__swiper--wrapper">
          <Swiper
            ref={landSwiperRef}
            className="modal-land__swiper"
            speed={500}
            onSwiper={setFirstSwiper}
            controller={{ control: secondSwiper }}
            modules={[Controller]}
            loop={true}
            // allowTouchMove={false}
            simulateTouch={false}
            centeredSlides={true}
            slidesPerView={1}
            initialSlide={props.landSliderIndex}
            autoHeight={true}
            watchSlidesProgress={true}
            onNavigationNext={(swiper: any) => {
              // const activeSlide = document.querySelector('.swiper-slide-active');
              // const activeSlideIndex = activeSlide?.getAttribute('data-land-slide-index');
              // console.log('activeSlideIndex: ',activeSlideIndex)

              swiperNextHandle(props?.data?.land[swiper.realIndex === 0 ? swiper.slides.length - 1 : swiper.realIndex-1]?.landName);
            }}
            onNavigationPrev={(swiper: any) => {
              // const activeSlide = document.querySelector('.swiper-slide-active');
              // const activeSlideIndex = activeSlide?.getAttribute('data-land-slide-index');
              // console.log('activeSlideIndex: ',activeSlideIndex)
              swiperPrevHandle(props?.data?.land[swiper.realIndex === (swiper.slides.length-1) ? 0 : swiper.realIndex+1]?.landName);
            }}
            onInit={(swiper: any) => {
              setTimeout(() => {
                swiper.updateAutoHeight(500);
                const landClassCur = props.data.land[props.landSliderIndex].landName;
                landContentWrapperRef.current?.classList?.add(landClassCur);
                landClassPrev = landClassCur;
              }, 500);
            }}
            onSlideChange={() => {
              setTimeout(() => {
                landSwiperRef.current
                  ?.querySelectorAll(".swiper-slide")
                  .forEach((e: any, i: any) => {
                    if (e?.classList?.contains("swiper-slide-active")) {
                      const landClassCur = e.getAttribute("data-land-name");
                      if (landClassPrev !== "") {
                        landContentWrapperRef.current?.classList?.remove(
                          landClassPrev
                        );
                      }
                      landContentWrapperRef.current?.classList?.add(
                        landClassCur
                      );
                      landClassPrev = landClassCur;
                    }
                  });
              }, 500);
            }}
            onAfterInit={(swiper: any) => {
              setTimeout(() => {
                swiper.updateAutoHeight(500);
                const landClassCur = props.data.land[props.landSliderIndex].landName;
                landContentWrapperRef.current?.classList?.add(landClassCur);
                landClassPrev = landClassCur;
              }, 500)
            }}
          // onInit={() => {
          //   setTimeout(() => {
          //     const activeSlideHeight: any =
          //       landSwiperRef.current?.querySelector(
          //         ".swiper-slide-active"
          //       )?.clientHeight;
          //     const activeSlideHeightEl: any =
          //       landSwiperRef.current?.querySelector(".swiper-wrapper");
          //     activeSlideHeightEl.style.height = `${activeSlideHeight}px`;
          //   }, 800);
          // }}
          // onSlideChangeTransitionStart={() => {
          //   const activeSlideHeightEl: any =
          //     landSwiperRef.current?.querySelector(".swiper-wrapper");
          //   activeSlideHeightEl.style.height = `auto`;
          // }}
          // onSlideChangeTransitionEnd={() => {
          //   setTimeout(() => {
          //     const activeSlideHeight: any =
          //       landSwiperRef.current?.querySelector(
          //         ".swiper-slide-active"
          //       )?.clientHeight;
          //     const activeSlideHeightEl: any =
          //       landSwiperRef.current?.querySelector(".swiper-wrapper");
          //     activeSlideHeightEl.style.height = `${activeSlideHeight}px`;
          //   }, 800);
          // }}
          // breakpoints={{
          //   905: {
          //     slidesPerView: 1.0001,
          //     loop: true,
          //   },
          // }}
          >
            {props.data.land.map((land: Land, slidIndex: number) => {
              return (
                <SwiperSlide key={slidIndex} data-land-name={land.landName}>
                  <div className="modal-land__swiper--img-wrapper">
                    <img
                      className="modal-land__swiper--bg-image"
                      src={isMobile ? HandleNullImage(land.posterMobile) : HandleNullImage(land.posterDesktop)}
                    />
                  </div>
                  <div className={`modal-land__swiper--inner ${land.landName}`}>
                    <div className="container">
                      <div className="grid grid-cols-12 gap-4 lg:gap-6">
                        <div className="col-span-12">
                          <div className="modal-land__swiper--content">
                            <div className="modal-land__swiper">
                              {land.overlay.prop && (
                                <ul className="modal-land__top-features">
                                  {land.overlay.prop.map(
                                    (prop, index: number) => {
                                      return (
                                        <li className="label-small" key={index}>
                                          <img
                                            className="modal-land__swiper--bg-image md:me-4 me-2"
                                            src={HandleNullImage(prop.icon)}
                                          />
                                          <p>{prop.propName}</p>
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              )}
                              <div className="grid grid-cols-12 gap-4 lg:gap-6 gap-y-0 lg:gap-y-0">
                                <div className="lg:col-span-7 col-span-12 order-1 relative z-10">
                                  <Heading tag="h3" classes="relative z-10">
                                    {land.overlay.overlayTitle}
                                  </Heading>
                                  <div className="grid grid-cols-7 gap-4 lg:gap-6">
                                    <div className="lg:col-span-6 col-span-7">
                                      <div
                                        className="body-normal md:mt-8 mt-4 relative z-10"
                                        dangerouslySetInnerHTML={{
                                          __html: land.overlay.overlayDescription,
                                        }}
                                      ></div>
                                      {
                                        land.overlay.ExploreRide &&
                                        <p className="overline lg:mt-20 mt-10">
                                          {land.overlay.ExploreRide}
                                        </p>
                                      }
                                    </div>
                                  </div>
                                </div>
                                <div className="lg:col-span-6 col-span-12 relative lg:order-2 order-3 z-10">
                                  <div className="modal-land__accordion--holder">
                                    {land.overlay.accordian && (
                                      <ModalLandAccordion
                                        overlay={land.overlay}
                                        ref={childRef}
                                        lang={props.lang}
                                      />
                                    )}
                                  </div>

                                </div>
                                <div className="lg:col-span-6 col-span-12 relative lg:order-3 order-2 modal-land__accordion--map-wrapper">
                                  {land.overlay.mapImgDesktop.data && (
                                    <>
                                      <div className="modal-land__accordion--map-img">
                                        <div className="modal-land__accordion--map-img-wrapper">
                                          <img src={isMobile ? HandleNullImage(land.overlay.mapImgMobile) : HandleNullImage(land.overlay.mapImgDesktop)} />
                                          <ul className="modal-land__accordion--map-points">
                                            {land.overlay.accordian.map(
                                              (accordian, index: number) => {
                                                return (
                                                  <li
                                                    key={index}
                                                    className={`h5 ${index === 0 ? "active" : ""
                                                      }`}
                                                    data-index={index}
                                                    onClick={pointClickHandler}
                                                    style={{
                                                      top: `${accordian.top}%`,
                                                      left: `${accordian.left}%`,
                                                    }}
                                                  >
                                                    {index + 1}
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </div>
                                      </div>
                                      <img
                                        className="modal-land__accordion--map-logo"
                                        src={HandleNullImage(land.logoDesktop)}
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Swiper
            className="modal-land__thmb-swiper"
            speed={500}
            modules={[Navigation, Controller]}
            onSwiper={setSecondSwiper}
            controller={{ control: firstSwiper }}
            loop={true}
            allowTouchMove={false}
            simulateTouch={false}
            slidesPerView={1}
            navigation={true}
            centeredSlides={true}
            initialSlide={props.landSliderIndex}
          // breakpoints={{
          //   905: {
          //     slidesPerView: 1.45,
          //     loop: true,
          //   },
          // }}
          >
            {props.data.land.map((land, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div className="modal-land__thmb-swiper--content">
                    <img
                      className="modal-land__thmb-swiper--logo"
                      src={isMobile ? HandleNullImage(land.logoMobile) : HandleNullImage(land.logoDesktop)}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
const ModalLands = ({ onClickClose, landSliderIndex, data ,lang}: ModalLandsProps) => {
  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   ScrollTrigger.normalizeScroll({
  //     allowNestedScroll: true,
  //     lockAxis: true,
  //     type: "touch,wheel,pointer",
  //   });
  //   return () => {
  //     gsap.registerPlugin(ScrollTrigger);
  //     ScrollTrigger.normalizeScroll({
  //       allowNestedScroll: false,
  //       lockAxis: true,
  //       type: "touch,wheel,pointer",
  //     });
  //   };
  // }, []);

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
              landSliderIndex={landSliderIndex}
              data={data}
              lang={lang}
            />
          ) as any,
          overlayRoot
        )}
    </>
  );
};

export default ModalLands;
