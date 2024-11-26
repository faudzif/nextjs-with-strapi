import React from "react";
import ReactDOM from "react-dom";
import GoogleCaptchaWrapper from "../../google-captcha-wrapper";
import Contact from "../ContactUsModal/Contact";

export interface ModalContactUsFooterProps {
  onClickClose?: () => void;
  data?: any;
  title?: string;
  desc?: string;
  cta_text?: string;
  cta_Link?: string;
  Google_reCaptcha_Site_key: string;
  lang: string;
  api:string;
}

const Backdrop = (props: ModalContactUsFooterProps) => {
  return <div className="backdrop" onClick={props.onClickClose} />;
};

const ModalOverlay = ({
  onClickClose,
  data,
  Google_reCaptcha_Site_key,
  lang,
  api
}: ModalContactUsFooterProps) => {
  return (
    <div className="modal-terms min-h-screen flex justify-center items-center contact-modal-form">
      <div className="modal-terms__inner-wrap custom-scrollbar">
        <span className="modal-terms__btn-close" onClick={onClickClose}>
          <span
            className="material-symbols-outlined icon-size-24"
            aria-hidden="true"
          >
            close
          </span>
        </span>
        <div className="modal-terms__content-wrap">
          <div className="modal-terms__scroll-wrap custom-scrollbar">
            <div className="modal-terms__scroll-wrap-inner">
              {
                data !== null &&
                <GoogleCaptchaWrapper
                  Google_reCaptcha_Site_key={Google_reCaptcha_Site_key}
                >
                  <Contact data={data} lang={lang} api={api}/>
                </GoogleCaptchaWrapper>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const ModalContactUsFooter = ({
  onClickClose,
  data,
  Google_reCaptcha_Site_key,
  lang,
  api
}: ModalContactUsFooterProps) => {
  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");

  return (
    <>
      {backdropRoot &&
        ReactDOM.createPortal(
          (
            <Backdrop
              onClickClose={onClickClose}
              Google_reCaptcha_Site_key={Google_reCaptcha_Site_key}
              lang={lang}
              api={api}
            />
          ) as any, // Explicitly cast to ReactNode
          backdropRoot
        )}
      {overlayRoot &&
        ReactDOM.createPortal(
          (
            <ModalOverlay
              onClickClose={onClickClose}
              data={data}
              Google_reCaptcha_Site_key={Google_reCaptcha_Site_key}
              lang={lang}
              api={api}
            />
          ) as any,
          overlayRoot
        )}
    </>
  );
};

export default ModalContactUsFooter;
