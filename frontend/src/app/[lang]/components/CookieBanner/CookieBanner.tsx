"use client"
import React, { useEffect, useState } from "react";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../atoms/Button/Button";
import Cookies from 'js-cookie';
import { checkNull } from "../../utils/api-helpers";
export default function CookieBanner ({
  cookieExpiration,
  cookieTitle,
  cookieText,
  cta_text
}:{
  cookieExpiration: number;
  cookieTitle: string;
  cookieText: string;
  cta_text:string;

}) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasConsent = Cookies.get('cookieConsent') === 'true';
    setShowBanner(!hasConsent);
  }, []);

  const closeCookieHandle = () => {
    Cookies.set('cookieConsent', 'true', { expires: cookieExpiration !== null ? cookieExpiration : 90 });
    setShowBanner(!showBanner);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      {showBanner && (
        <section className="cookie-banner">
          <div className="container">
            <div className="cookie-banner__wrapper">
              <div className="cookie-banner__inner">
                <div className="cookie-banner__text">
                  <Heading tag={"h5"}>{checkNull(cookieTitle)}</Heading>
                  <div
                    className="body-normal"
                    dangerouslySetInnerHTML={{ __html: checkNull(cookieText) }}
                  ></div>
                </div>
             
                <div className="cookie-banner__buttons">
                  <Button
                    tag="span"
                    btnBg="white"
                    children={checkNull(cta_text)}
                    onClick={closeCookieHandle}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};