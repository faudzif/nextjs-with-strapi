import React, { useEffect, useRef } from "react";

import Heading from "../../atoms/Heading/Heading";
export interface AccordionProps {
  classes?: string;
  title: string;
  id: number;
  expanded?: boolean;
  closeHandler?: () => void;
  children?: string | JSX.Element | JSX.Element[];
  showPlus?: boolean;
}

const Accordion = ({
  classes = "",
  expanded,
  children,
  showPlus,
  title,
  id,
  closeHandler,
}: AccordionProps) => {
  const slideContainer = useRef<HTMLDivElement | null>(null);
  const toggleHandler = () => {
    const container: HTMLDivElement | null = slideContainer.current;

    if (container !== null) {
      if (closeHandler) {
        closeHandler();
      }

      if (!container.classList?.contains("active")) {
        container.classList?.add("active");
        container.parentElement?.classList?.add("active-parent");
        container.style.transitionDuration = "0.5s";
        container.style.height = "auto";
        const height = container.clientHeight + "px";
        container.style.height = "0px";
        setTimeout(function () {
          container.style.height = height;
        }, 0);
      } else {
        // container.style.height = "0px";
        // container.parentElement?.classList?.remove("active-parent");
        // container.addEventListener(
        //   "transitionend",
        //   function () {
        //     container.classList?.remove("active");
        //   },
        //   {
        //     once: true,
        //   }
        // );
      }
      const prevActivePoint = document.querySelector(
        ".modal-land__swiper .swiper-slide-active .modal-land__accordion--map-points .active"
      );
      prevActivePoint?.classList?.remove("active");
      const activeAccordionIndexEl = document.querySelector(
        ".modal-land__swiper .swiper-slide-active .modal-land__accordion .accordion.active-parent"
      );
      const activeAccordionIndex: any =
        activeAccordionIndexEl?.getAttribute("data-index");
      const allMapPoints = document.querySelectorAll(
        ".modal-land__swiper .swiper-slide-active .modal-land__accordion--map-points li"
      );
      allMapPoints[activeAccordionIndex].classList?.add("active");
    }
  };
  useEffect(() => {
    const container: HTMLDivElement | null = slideContainer.current;

    if (expanded && container !== null) {
      container.classList?.add("active");
      container.parentElement?.classList?.add("active-parent");
      container.style.transitionDuration = "0.5s";
      container.style.height = "auto";
      const height = container.clientHeight + "px";
      container.style.height = "0px";
      setTimeout(function () {
        container.style.height = height;
      }, 0);
    }
  }, []);

  return (
    <div className={`accordion ${classes}`} data-index={id - 1}>
      <div className="accordion__head" onClick={toggleHandler}>
        {id && showPlus && (
          <span className="body-normal body-normal--bold me-2 md:me-4 ">
            {id}
          </span>
        )}
        {/* <Heading tag="h5">{title}</Heading> */}
        <h5 dangerouslySetInnerHTML={{ __html:title }}></h5>
        {showPlus && (
          <div className="flex">
            <span className="material-symbols-outlined icon-size-24 active">
              remove
            </span>
            <span className="material-symbols-outlined icon-size-24 in-active">
              add
            </span>
          </div>
        )}
      </div>
      <div className="accordion__body" ref={slideContainer}>
        {children}
      </div>
    </div>
  );
};
export default Accordion;
