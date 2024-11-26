"use client";

import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Button from "../../atoms/Button/Button";
import { useScreenType } from "../../utils/use-screenType";
import {
  HandleNullImage,
  checkNull,
  getStrapiURL,
  pushDataLayer,
} from "../../utils/api-helpers";

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

interface SignUpModal {
  mainHeading: string;
  mobileImage: Picture;
  mainHeadingSubmited: string;
  whatLable: string;
  whenLable: string;
  whereLable: string;
  thankyouTitle: string;
  thankyouDesc: string;
  what: string;
  when: string;
  where: string;
  View_details: string;
  description: string;
  placeholderFiveErr: string;
  formTitle: string;
  placeholderOne: string;
  placeholderTwo: string;
  placeholderThree: string;
  placeholderOneErr: string;
  placeholderTwoErr: string;
  placeholderThreeErr: string;
  placeholderFour: string;
  placeholderFourErr: string;
  termsErrMsg: string;
  generalErrMsg: string;
  checkbox: Checkbox[];
  modal: Modal;
  submit: Submit;
  image: Picture;
  Class: string;
  keepBrowsing: string;
  DOBhelptext: string;
}

interface ChildLink {
  parent: string;
  url: string;
  newTab: boolean;
  text: string;
  css_class: string;
  isPageUrl: boolean;
}

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  css_class: string;
  childLink: ChildLink[];
  currentlanguge: string;
}

interface NavbarLogo {
  id: number;
  logoText: string;
  logoImg: Picture;
  AnimatedlogoJson: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  LogoUrl: string;
}

interface Aquarabia {
  cta_text: string;
  innerText: string;
  linkText: string;
  AquaLink: string;
  mobileCta: string;
}

interface SocialLink {
  media: Picture;
  text: string;
  link: string;
}
interface QuickLinks {
  linkUrl: string;
  linkTxt: string;
  icon: Picture;
}
interface Navbar {
  id: number;
  navbarLogo: NavbarLogo;
  links: NavLink[];
  signUpModal: SignUpModal;
  button: Submit;
  aquarabia: Aquarabia;
  gtm: GTM;
  additionalMenuLink: string;
  Language: string;
  menuBtnTxt: string;
  additionalMenu: string;
  socialLink: SocialLink[];
  signUpCTA: string;
  quickLinks: QuickLinks[];
}

interface NavbarProps {
  data: Navbar;
  daytimeStart_am: string;
  daytimeEnd_pm: string;
  location: string;
  currentlanguge: string;
  Google_reCaptcha_Site_key: string;
  // Google_reCaptcha_Secret_key: string;
  Signup: SignUpModal;
}

interface GTM {
  login_status: string;
  user_id: string;
  page_name: string;
  page_type: string;
  country_cd: string;
  language_cd: string;
}

let urlOrigin: string;

interface TimeContextType {
  timeStart: string;
  timeEnd: string;
  location: string;
  setTimeStart: Dispatch<SetStateAction<string>>;
  setTimeEnd: Dispatch<SetStateAction<string>>;
  setLocation: Dispatch<SetStateAction<string>>;
}
let timerVar;
let startTimeTemp = "";
let endTimeTemp = "";
let locationTemp = "";
let culture: any;
let urls: any;
let isMobile: any;
interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url !== null ? url : ""}
        className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {checkNull(text)}
      </Link>
    </li>
  );
}

const toggleHandler = (e: any) => {
  const container2: any = e.target;
  if (container2 !== null) {
    if (
      !container2
        .closest("li")
        .querySelector("ul")
        .classList?.contains("active")
    ) {
      const previvousActiveParents = document.querySelectorAll(
        ".main-menu__open-state > ul li.active-parent"
      );
      if (previvousActiveParents.length > 0) {
        const previvousActiveParent = previvousActiveParents[0];
        previvousActiveParent.classList?.remove("active-parent");
        const previvousActive: any = previvousActiveParent.children[1];
        previvousActive.style.height = "0px";
        previvousActive.style.margin = "0px";
        previvousActive.parentElement.classList?.remove("active-parent");
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

      container2.closest("li").querySelector("ul").classList?.add("active");
      container2.closest("li").classList?.add("active-parent");
      container2.closest("li").querySelector("ul").style.transitionDuration =
        "0.5s";
      container2.closest("li").querySelector("ul").style.height = "auto";
      const height =
        container2.closest("li").querySelector("ul").clientHeight + "px";
      container2.closest("li").querySelector("ul").style.height = "0px";
      setTimeout(function () {
        const marginStr = isMobile ? "4px 0 12px" : "8px 0 16px";
        container2.closest("li").querySelector("ul").style.height = height;
        container2.closest("li").querySelector("ul").style.margin = marginStr;
      }, 0);
    } else {
      const previvousActiveParents = document.querySelectorAll(
        ".main-menu__open-state > ul li.active-parent"
      );
      if (previvousActiveParents.length > 0) {
        const previvousActiveParent = previvousActiveParents[0];
        previvousActiveParent.classList?.remove("active-parent");
        const previvousActive: any = previvousActiveParent.children[1];
        previvousActive.style.height = "0px";
        previvousActive.style.margin = "0px";
        previvousActive.parentElement.classList?.remove("active-parent");
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
function MobileNavLink({
  id,
  url,
  text,
  newTab,
  childLink,
  closeMenu,
  currentlanguge,
}: MobileNavLink) {
  const handleClick = () => {
    closeMenu();
  };

  //@ts-ignore
  const _sectionScrolling = (
    checkHash: any,
    currentId: any,
    menu: any,
    menuElHi: any,
    STOValue: any,
    index: number
  ) => {
    const sectionId = document.getElementById(currentId);
    let hasMinusNav = sectionId?.classList?.contains("nav-height-minus");
    if (checkHash === "#" && sectionId && menu && menuElHi) {
      setTimeout(() => {
        let sectionIdOf: any = sectionId.classList?.contains("nav-height-minus")
          ? sectionId.offsetTop
          : sectionId.offsetTop - menuElHi;
        const hasSwiper: any = sectionId.closest(".swiper");
        const hasGsap =
          sectionId?.getAttribute("style")?.indexOf("translate:") !== -1;

        if (hasSwiper && sectionId.offsetTop === 0) {
          sectionIdOf = hasMinusNav
            ? hasSwiper?.offsetTop
            : hasSwiper && hasSwiper?.offsetTop - menuElHi;
        } else if (hasGsap && sectionId.offsetTop === 0) {
          sectionIdOf = hasMinusNav
            ? sectionId?.parentElement?.offsetTop
            : sectionId?.parentElement &&
              sectionId?.parentElement?.offsetTop - menuElHi;
        }

        const FAQStickyBar = document?.querySelector(".faq-accordion-landing");
        let hasFAQStickyBar;

        if (FAQStickyBar) {
          hasFAQStickyBar = FAQStickyBar?.classList?.contains("bar-sticky");
        }

        /* index for first element of offset fix */
        if (hasFAQStickyBar) {
          sectionIdOf = isMobile ? sectionIdOf - 61 : sectionIdOf - 50;
        } else {
          sectionIdOf =
            index === 0
              ? isMobile
                ? sectionIdOf - 135
                : sectionIdOf - 100
              : isMobile
              ? sectionIdOf - 61
              : sectionIdOf;
        }

        window.scroll({
          top: sectionIdOf || 0,
          left: 0,
          behavior: "smooth",
        });
      }, STOValue);
    }
  };

  const sectionScrollHandler = (event: any, index: number) => {
    const menu: Element | null = document.querySelector(".main-menu");
    const menuElHi: number | undefined = menu?.clientHeight;

    const urlFragments = new URL(event.target.href),
      targetId = urlFragments.hash,
      checkHash = targetId.charAt(0);

    setTimeout(() => {
      if (urlFragments.pathname === window.location.pathname) {
        event.preventDefault();
        //@ts-ignore
        _sectionScrolling(
          checkHash,
          targetId.substring(1),
          menu,
          menuElHi,
          800,
          index
        );
      } else {
        const timer = setInterval(() => {
          if (urlFragments.pathname === window.location.pathname) {
            //@ts-ignore
            setTimeout(() => {
              _sectionScrolling(
                checkHash,
                targetId.substring(1),
                menu,
                menuElHi,
                0,
                index
              );
            }, 600);
            clearInterval(timer);
          }
        }, 200);
      }
    }, 500);
  };
  const [currentDomain, setCurrentDomain] = useState("");
  const [currentChildDomain, setCurrentChildDomain] = useState("");

  const [splitted, setSplitted] = useState<any>();
  const [currentpage, setCurrentpage] = useState("/");
  useEffect(() => {
    setCurrentDomain(window?.location?.origin);
    setCurrentChildDomain(window.location.origin);
    setSplitted(window.location.href.split("/"));
    setCurrentpage(window.location.href.split("/").at(4) ?? "/");
  }, []);

  let classes = "";

  if (
    (splitted && splitted?.length === 4 && currentpage === url) ||
    (splitted && splitted?.length === 4 && currentpage === url + "#.") ||
    (splitted?.length === 5 && currentpage === url) ||
    (splitted?.length === 5 && currentpage === url + "#.") ||
    (splitted?.length === 5 && currentpage.includes(url))
  ) {
    classes = "current-page";
  } else {
    classes = "";
  }

  useEffect(() => {
    culture = window.location.href.split("/").at(3)?.slice(0, 2);
    urlOrigin = document.location.origin.toString();
  }, []);
  if (culture?.includes("#.")) {
    culture = culture.replace("#.", "");
  }
  let urls: any;
  if (urlOrigin && culture && url) {
    if (url === "/") {
      urls = new URL(`${culture}`, urlOrigin);
    } else {
      urls = new URL(`${culture}/${url}`, urlOrigin);
    }
  }
  return (
    <li className={classes}>
      <div className="flex items-center">
        <Link
          href={urls ? urls : ""}
          onClick={() => {
            if (text) {
              pushDataLayer({
                event: "eventTracker",
                custom_event_name: "navigation_header_click",
                click_text: text.toLowerCase(),
                eventCallback: function () {
                  window.dataLayer.push({
                    click_text: undefined,
                  });
                },
              });
            }
            handleClick();
          }}
          className={`block text-white h4 main-menu__open-state--hover md:py-4 py-3`}
        >
          {checkNull(text)}
        </Link>
        {childLink.length > 1 && (
          <div className="main-menu__open-state--arrow">
            <span
              className="material-symbols-outlined icon-size-24"
              onClick={toggleHandler}
            >
              arrow_back_ios_new
            </span>
          </div>
        )}
      </div>
      <ul>
        {childLink?.map((child, index: number) => {
          child.parent = url;
          if (child?.isPageUrl === true) {
            return (
              <li key={index}>
                <Link
                  href={`${
                    currentDomain + "/" + currentlanguge + "/" + child.url
                  }`}
                  onClick={(key) => {
                    if (child.text) {
                      pushDataLayer({
                        event: "eventTracker",
                        custom_event_name: "navigation_header_click",
                        click_text: child.text.toLowerCase(),
                        eventCallback: function () {
                          window.dataLayer.push({
                            click_text: undefined,
                          });
                        },
                      });
                    }
                    handleClick();
                    sectionScrollHandler(key, index);
                  }}
                  className={`block text-white h5 main-menu__open-state--hover`}
                  target={child.newTab ? "_blank" : "_self"}
                >
                  {checkNull(child.text)}
                </Link>
              </li>
            );
          } else {
            if (urlOrigin.includes(child.parent)) {
              return (
                <li key={index}>
                  <Link
                    href={
                      child?.url.includes("/")
                        ? `/${culture}#${child?.url}`
                        : `/${culture}#${child?.url}`
                    }
                    onClick={(key) => {
                      handleClick();
                      sectionScrollHandler(key, index);
                      if (child.text) {
                        pushDataLayer({
                          event: "eventTracker",
                          custom_event_name: "navigation_header_click",
                          click_text: child.text.toLowerCase(),
                          eventCallback: function () {
                            window.dataLayer.push({
                              click_text: undefined,
                            });
                          },
                        });
                      }
                    }}
                    className={`block text-white h5 main-menu__open-state--hover`}
                    target={child.newTab ? "_blank" : "_self"}
                  >
                    {checkNull(child.text)}
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <Link
                    // href={`${currentChildDomain+"/"+ currentlanguge +"/"+ child.url  }`}
                    href={
                      child?.url.includes("/")
                        ? `/${culture}#${child?.url}`
                        : `/${culture}/${child?.url}`
                    }
                    onClick={(key) => {
                      if (child.text) {
                        pushDataLayer({
                          event: "eventTracker",
                          custom_event_name: "navigation_header_click",
                          click_text: child.text.toLowerCase(),
                          eventCallback: function () {
                            window.dataLayer.push({
                              click_text: undefined,
                            });
                          },
                        });
                      }
                      handleClick();
                      sectionScrollHandler(key, index);
                    }}
                    className={`block text-white h5 main-menu__open-state--hover test`}
                    target={child.newTab ? "_blank" : "_self"}
                  >
                    {checkNull(child.text)}
                  </Link>
                </li>
              );
            }
          }
        })}
      </ul>
    </li>
  );
}

const TimeContext = createContext<TimeContextType | null>(null);

export const TimeProvider = ({ children }: any) => {
  const [timeStart, setTimeStart] = useState(startTimeTemp);
  const [timeEnd, setTimeEnd] = useState(endTimeTemp);
  const [location, setLocation] = useState(locationTemp);

  const contextValue: TimeContextType = {
    timeStart,
    timeEnd,
    location,
    setTimeStart,
    setTimeEnd,
    setLocation,
  };

  return (
    <TimeContext.Provider value={contextValue}>{children}</TimeContext.Provider>
  );
};

export const useTimeContext = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTimeContext must be used within a TimeProvider");
  }
  return context;
};

export default function Navbar(props: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainMenuSection = useRef<any>(null);
  const mainMenuSectionDialog = useRef<any>(null);
  const mainMenuSectionDialogBG = useRef<any>(null);
  const closeMenu = () => {
    mainMenuSectionDialog.current?.classList?.add(
      `main-menu__open-state--revers`
    );
    mainMenuSectionDialogBG.current?.classList?.add(
      `main-menu__open-state--bg-color_revers-bg`
    );
    mainMenuSection.current?.classList?.remove(`main-menu__opacity-0`);
    setTimeout(() => {
      mainMenuSectionDialog.current?.classList?.remove(
        `main-menu__open-state--revers`
      );
      mainMenuSectionDialog.current?.classList?.remove(
        `main-menu__open-state--bg-color_revers-bg`
      );
      mainMenuSection.current?.classList?.remove(`main-menu__opened`);
      setMobileMenuOpen(false);
    }, 500);
  };
  useEffect(() => {
    culture = window.location.href.split("/").at(3)?.slice(0, 2);
    urlOrigin = document.location.origin.toString();
    if (window.scrollY > 200) {
      mainMenuSection.current?.classList?.add(`main-menu__sticky`);
    } else {
      mainMenuSection.current?.classList?.remove(`main-menu__sticky`);
    }
    const handleScroll = () => {
      if (window.scrollY > 200) {
        mainMenuSection.current?.classList?.remove(`main-menu__sticky--revers`);
        mainMenuSection.current?.classList?.remove(`main-menu__opacity-1`);
        mainMenuSection.current?.classList?.add(`main-menu__sticky`);
      } else {
        if (mainMenuSection.current?.classList?.contains(`main-menu__sticky`)) {
          timerVar = isMobile ? 500 : 200;
          mainMenuSection.current?.classList?.add(`main-menu__sticky--revers`);
          setTimeout(() => {
            mainMenuSection.current?.classList?.remove(`main-menu__sticky`);
            mainMenuSection.current?.classList?.add(`main-menu__opacity-1`);
          }, timerVar);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  isMobile = useScreenType(904);
  let isDesktop = useScreenType(1240);

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
        document.documentElement.classList?.add(`safari_only`);
      } else {
        browserName = "No browser detection";
      }
      if (navigator.platform.indexOf("Mac") === 0) {
        document.body.classList?.add(`mac`);
      } else if (navigator.platform === "iPhone") {
        document.body.classList?.add(`iphone`);
      }
    }
    fnBrowserDetect();
  }, []);

  const { timeStart, timeEnd, location } = useTimeContext();

  startTimeTemp = props.daytimeStart_am;
  endTimeTemp = props.daytimeEnd_pm;
  locationTemp = props.location;

  const currentCulture = props.currentlanguge;
  const [splitted, setSplitted] = useState<any>();
  const [currentpage, setCurrentpage] = useState("/");
  useEffect(() => {
    culture = window.location.href.split("/").at(3);
    urls = new URL(
      `${culture}/${props?.data?.additionalMenuLink}`,
      document.location.origin.toString()
    );
  }, []);
  let classes = "";
  if (
    (splitted &&
      splitted?.length === 4 &&
      currentpage === props?.data?.additionalMenu) ||
    (splitted &&
      splitted?.length === 4 &&
      currentpage === props?.data?.additionalMenu + "#.") ||
    (splitted?.length === 5 && currentpage === props?.data?.additionalMenu) ||
    (splitted?.length === 5 &&
      currentpage === props?.data?.additionalMenu + "#.") ||
    (splitted?.length === 5 &&
      currentpage.includes(props?.data?.additionalMenu))
  ) {
    classes = "current-page";
  } else {
    classes = "";
  }
  const [windowWidth, setWindowWidth] = useState<any>(null);

  useEffect(() => {
    let containerSize = document.querySelector("body")?.clientWidth;
    setWindowWidth(containerSize);
    const handleResize = () => {
      containerSize = document.querySelector("body")?.clientWidth;
      setWindowWidth(containerSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const path = usePathname();
  return (
    <>
      <div
        className="main-menu"
        ref={mainMenuSection}
        style={{ width: `${windowWidth}px` }}
      >
      </div>
    </>
  );
}
