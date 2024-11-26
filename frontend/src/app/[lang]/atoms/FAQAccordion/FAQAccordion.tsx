"use client";
import React, { useState } from "react";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../atoms/Button/Button";
import { pushDataLayer } from "../../utils/api-helpers";

export interface FAQAccordionProps {
  data: {
    AccordionData: any;
    category?: any;
  };
}

export default function FAQAccordion({
  data: { AccordionData, category },
}: FAQAccordionProps) {
  const [ariaExpandStatus, setAriaExpandStatus] = useState<boolean>(false);
  const faqOpenHandler = (e: any, attributes: any) => {
    let select_cat: any = (category =
      attributes.faq_category?.data?.attributes?.name);
    const container2: any = e.target;
    if (container2 !== null) {
      if (
        !container2
          .closest(".faq-accordion__list")
          .querySelector(".faq-accordion__body")
          .classList?.contains("active")
      ) {
        pushDataLayer({
          event: "eventTracker",
          custom_event_name: "accordion_expand",
          click_text: attributes.question.toLowerCase(),
          section: select_cat.toLowerCase(),
          eventCallback: function () {
            window.dataLayer.push({
              click_text: undefined,
              section: undefined,
            });
          },
        });
        container2
          .closest(".faq-accordion__list")
          .querySelector(".faq-accordion__body")
          .classList?.add("active");
        container2
          .closest(".faq-accordion__list")
          .classList?.add("active-parent", "faq-accordion__list--active");
        container2
          .closest(".faq-accordion__list")
          .querySelector(".faq-accordion__body").style.transitionDuration =
          "0.5s";
        container2
          .closest(".faq-accordion__list")
          .querySelector(".faq-accordion__body").style.height = "auto";
        const height =
          container2
            .closest(".faq-accordion__list")
            .querySelector(".faq-accordion__body").clientHeight + "px";
        container2
          .closest(".faq-accordion__list")
          .querySelector(".faq-accordion__body").style.height = "0px";
        setTimeout(function () {
          container2
            .closest(".faq-accordion__list")
            .querySelector(".faq-accordion__body").style.height = height;
        }, 0);
      } else {
        const previvousActiveParents = container2.closest(
          ".faq-accordion__list"
        );
        pushDataLayer({
          event: "eventTracker",
          custom_event_name: "accordion_collapse",
          click_text: attributes.question.toLowerCase(),
          section: select_cat.toLowerCase(),
          eventCallback: function () {
            window.dataLayer.push({
              click_text: undefined,
              section: undefined,
            });
          },
        });
        if (previvousActiveParents) {
          const previvousActiveParent = previvousActiveParents;
          previvousActiveParent.classList?.remove(
            "active-parent",
            "faq-accordion__list--active"
          );
          const previvousActive: any = previvousActiveParent.querySelector(
            ".faq-accordion__body"
          );
          previvousActive.style.height = "0px";
          previvousActive.addEventListener(
            "transitionend",
            function () {
              previvousActive.classList?.remove("active");
            },
            {
              once: true,
            }
          );
        }
      }
    }
  };
  return (
    <>
      {AccordionData &&
        AccordionData?.map((item: any, index: number) => {
          const { attributes } = item;

          return (
            <div key={index} className={`faq-accordion__list`}>
              <div className="faq-accordion__title">
                <Heading tag="h4" tagClass="h5">
                  {attributes.question}
                </Heading>
                <div
                  className="faq-accordion__expand"
                  aria-expanded={ariaExpandStatus}
                  tabIndex={0}
                  role="button"
                  id={`faq-accordion__title_${index + 1}`}
                  aria-controls={`faq-accordion__body_${index + 1}`}
                  onClick={(e) => {
                    setAriaExpandStatus(!ariaExpandStatus);
                    faqOpenHandler(e, attributes);
                  }}
                >
                  <span className="faq-accordion__expand--icon"></span>
                </div>
              </div>
              <div
                className="faq-accordion__body"
                aria-labelledby={`faq-accordion__title_${index + 1}`}
                role="region"
                id={`faq-accordion__body_${index + 1}`}
              >
                <div className="accordion__block">
                  {attributes.answer && (
                    <div
                      className="faq-accordion__content body-normal"
                      dangerouslySetInnerHTML={{
                        __html: attributes.answer,
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
