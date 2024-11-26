"use client"
import React from "react";
import ReactDOM from "react-dom";
import GoogleCaptchaWrapper from "../../google-captcha-wrapper";
import {SignUpModal}from "../../utils/model"
export interface ModalSignupProps {
  onClickClose?: () => void;
  data: SignUpModal;
  lang:string;
  Google_reCaptcha_Site_key:string;
}
const Backdrop = (props: ModalSignupProps,) => {
  return <div className="backdrop" onClick={props.onClickClose} />;
};
const ModalOverlay = ({data,onClickClose,lang,Google_reCaptcha_Site_key}: ModalSignupProps) => {
  return (
    <div className="modal-signup">
      <span className="modal-signup__btn-close" onClick={onClickClose}>
        <span
          className="material-symbols-outlined icon-size-24"
          aria-hidden="true"
        >
          close
        </span>
      </span>
      <div className="modal-signup__content-wrapper custom-scrollbar">
      <GoogleCaptchaWrapper Google_reCaptcha_Site_key={Google_reCaptcha_Site_key}>
        </GoogleCaptchaWrapper>
      </div>
    </div>
  );
};
  const ModalSignup = ({ data, onClickClose ,lang,Google_reCaptcha_Site_key }: ModalSignupProps) => {
  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");

  return (
    <>
      {backdropRoot &&
        ReactDOM.createPortal(
          (<Backdrop data={data} onClickClose={onClickClose} lang = {lang} Google_reCaptcha_Site_key={Google_reCaptcha_Site_key}  />) as any,
          backdropRoot
        )}
      {overlayRoot &&
        ReactDOM.createPortal(
          (<ModalOverlay data={data} onClickClose={onClickClose} lang = {lang} Google_reCaptcha_Site_key={Google_reCaptcha_Site_key}  />) as any,
          overlayRoot
        )}
    </>
  );
};

export default ModalSignup;
function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
