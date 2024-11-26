"use client";
import React, { useState } from "react";
import Breaker from "../Breaker/Breaker";
import TertiaryCTA from "../../atoms/TertiaryCTA/TertiaryCTA";
import ModalContactUsFooter from "../Modal/ModalContactUsFooter";
import { checkNull, HandleNullImage } from "../../utils/api-helpers";
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
interface contactFooter {
  title: string;
  phoneTitle: string;
  phoneNumber: string;
  phoneIcon: Picture;
  msgTitle: string;
  writeToUs: string;
  msgIcon: Picture;
  contactUsModal: any;
}
interface ContactUsFooterProps {
  data: contactFooter;
  Google_reCaptcha_Site_key: string;
  lang: string;
  api:string;
}
export default function ContactUsFooter({
  data,
  Google_reCaptcha_Site_key,
  lang,
  api
}: ContactUsFooterProps) {
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayOpenHandler = () => {
    setShowOverlay(true);
    document.body.classList?.add(`no-scroll`);
    document.documentElement.classList?.add(`no-scroll`);
  };

  const overlayCloseHandler = () => {
    setShowOverlay(false);
    document.body.classList?.remove(`no-scroll`);
    document.documentElement.classList?.remove(`no-scroll`);
  };
  let isMobile = useScreenType(800);
  return (
    <>
      <div className={`contact-us-footer`}>
        {/* <Breaker
          data={{
            url: "",
            hasWhiteBg: true,
            headline: data?.title,
          }} Signup={undefined} Google_reCaptcha_Site_key={""} lang={""}        /> */}
        <div className="contact-us-footer__main">
          <div className="contact-us-footer__inner">
            <div className="contact-us-footer__inner--items">
              {
                data?.phoneIcon && 
              <img
                src={HandleNullImage(data?.phoneIcon)}
                className="material-symbols-outlined icon-size-40 contact-us-footer__inner--icon"
              ></img>
              }
              {data?.phoneTitle && 
              <h5>{checkNull(data.phoneTitle)}</h5>
              }
              {data?.phoneNumber && !isMobile && (
                <span className="btn mt-4">{checkNull(data.phoneNumber)}</span>
              )}
              {data?.phoneNumber && isMobile && (
                <a
                  href={`tel:${checkNull(data.phoneNumber)}`}
                  className="btn mt-4 contact-us-footer__phone-number"
                >
                  {checkNull(data.phoneNumber)}
                </a>
              )}
            </div>
            <div className="contact-us-footer__inner--items">
              {data?.msgIcon && 
              <img
                src={HandleNullImage(data?.msgIcon)}
                className="material-symbols-outlined icon-size-40 contact-us-footer__inner--icon"
              ></img>
              }
              {data?.msgTitle &&
                <h5>{checkNull(data?.msgTitle)}</h5>
              }
              {data?.writeToUs && (
                <TertiaryCTA
                  tag="span"
                  iconRight="keyboard_arrow_right"
                  classes="mt-2 lg:mt-4"
                  onClick={overlayOpenHandler}
                >
                  {checkNull(data.writeToUs)}
                </TertiaryCTA>
              )}
            </div>
          </div>
        </div>
      </div>
      {showOverlay && (
        <ModalContactUsFooter
          data={data.contactUsModal}
          onClickClose={overlayCloseHandler}
          Google_reCaptcha_Site_key={Google_reCaptcha_Site_key}
          lang={lang}
          api={api}
        />
      )}
    </>
  );
}
