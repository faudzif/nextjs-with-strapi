"use client";
import React, { useEffect, useState } from "react";
import { HandleNullImage } from "../../utils/api-helpers";
import HeroSlider from "./HeroSlider";
import { TimeProvider } from "../Navbar/Navbar";
import { useScreenType } from "../../utils/use-screenType";
import { useTheme } from "../../utils/context/ThemeContext";

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
interface Title {
  Title: string;
}
interface Button {
  id: string;
}
interface Links{
  linkUrl:string;
  linkTxt:string;
  icon:Picture;
}
interface HeroProps {
  data: {
    id: string;
    signup_show: boolean;
    ScrollArrow: string;
    description: string;
    desktopMedia_light: Picture;
    desktopMedia_dark: Picture;
    mobileMedia_light: Picture;
    mobileMedia_dark: Picture;
    fallBackImg_light: Picture;
    fallBackImg_Mobile_light: Picture;
    fallBackImg_dark: Picture;
    fallBackImg_Mobile_dark: Picture;
    buttons: Button[];
    title: string;
    Hero_Title: Title[];
    signup: SignUpBar;
    url: string;
    quickLinks : Links[];
    getEarlyAccessCTA:string;
    mobileQuickLinkCTA:string;
  };
  Google_reCaptcha_Site_key: string;
  lang: string;
  Signup:SignUpOverlay;
}

interface SignUpBar {
  textOne: string;
  textTwo: string;
  ctaText: string;
  signUpOverlay: SignUpOverlay;
}

interface Checkbox {
  pretext: string;
  linkText: string;
  postext: string;
}

interface Submit {
  text: string;
  type: string;
}

interface Modal {
  title: string;
  desc: string;
  cta_text: string;
  cta_Link: string;
}

interface SignUpOverlay {
  View_details: string;
  mobileImage: Picture;
  placeholderFourErr: string;
  mainHeading: string;
  mainHeadingSubmited: string;
  whatLable: string;
  whenLable: string;
  whereLable: string;
  what: string;
  thankyouTitle: string;
  placeholderFour: string;
  thankyouDesc: string;
  when: string;
  where: string;
  description: string;
  image: Picture;
  formTitle: string;
  placeholderOne: string;
  placeholderTwo: string;
  placeholderThree: string;
  placeholderFiveErr: string;
  checkbox: Checkbox[];
  submit: Submit;
  placeholderOneErr: string;
  placeholderTwoErr: string;
  placeholderThreeErr: string;
  termsErrMsg: string;
  generalErrMsg: string;
  modal: Modal;
  Class: string;
  keepBrowsing: string;
  DOBhelptext: string;
}

export default function Hero({
  data,
  lang,
  Google_reCaptcha_Site_key,
  Signup
}: HeroProps) {
  const Desktop_img_light = HandleNullImage(data.desktopMedia_light);
  const Mobile_img_light = HandleNullImage(data.mobileMedia_light);
  const Desktop_img_dark = HandleNullImage(data.desktopMedia_dark);
  const Mobile_img_dark = HandleNullImage(data.mobileMedia_dark);
  const Desktop_FallBackImg_light = HandleNullImage(data.fallBackImg_light);
  const Desktop_FallBackImg_dark = HandleNullImage(data.fallBackImg_dark);
  const mobile_FallBackImg_light = HandleNullImage(
    data.fallBackImg_Mobile_light
  );
  const Mobile_FallBackImg_dark = HandleNullImage(data.fallBackImg_Mobile_dark);
  const [currentPoster, setCurrentPoster] = useState<string>();
  const [currentVideo, setCurrentVideo] = useState<string>();
  let isNotDesktop = useScreenType(1239);
  let isMobile = useScreenType(599);

  useEffect(() => {
    document.body.classList?.remove(`quick-bg`);
  }, []);

  let showMobileQuickLink = useScreenType(904);
  const [isDark, setIsDark] = useState<boolean>();
  const { theme } = useTheme();

  useEffect(() => {
    document.body.classList?.remove(`hero-inner-navbar`);
    const isDark: any = theme === "night" ? true : false;

    setIsDark(isDark);
    // debugger
    setCurrentPoster(
      isMobile
        ? isDark
          ? Mobile_FallBackImg_dark
          : mobile_FallBackImg_light
        : isDark
        ? Desktop_FallBackImg_dark
        : Desktop_FallBackImg_light
    );
    setCurrentVideo(
      isMobile
        ? isDark
          ? Mobile_img_dark
          : Mobile_img_light
        : isDark
        ? Desktop_img_dark
        : Desktop_img_light
    );
  }, [isDark]);
  return (
    <>
      <section className="hero-banner" id={data.url}>
        <div className="hero-banner__image">
          <video
            poster={currentPoster}
            className="hero-banner__video object-cover w-[100vw]"
            autoPlay
            muted
            playsInline
            loop
            src={currentVideo}
          ></video>
        </div>
        <div className="hero-banner__content">
          <div className="container">
           
          </div>
        </div>
        <div className="hero-banner__bottom-overlay">
          
        </div>
      </section>
    </>
  );
}
