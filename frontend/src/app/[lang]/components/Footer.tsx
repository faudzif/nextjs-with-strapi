"use client";
import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { HandleNullImage, pushDataLayer } from "../utils/api-helpers";
import ModalFooter from "./Modal/ModalFooter";
interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
  icon: Icon;
  css_class?: string;
  lengthClass?: number;
  index?: any;
  lang?: string;
  origin?: string;
}
interface Icon {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

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

export default function Footer({
  menuLinks,
  legalLinks,
  socialLinks,
  Class,
  CopyRight,
  firstFooterLogo,
  firstFooterLogoLink,
  secondFooterLogo,
  secondFooterLogoLink,
  currentlanguge,
}: {
  menuLinks: Array<FooterLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
  firstFooterLogo: Picture;
  secondFooterLogo: Picture;
  Class?: string;
  firstFooterLogoLink: string;
  secondFooterLogoLink: string;
  CopyRight: string;
  currentlanguge?: string;
}) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [menuLinksLength, setmenuLinksLength] = useState(0);
  const [urlOrigin, setUrlOrigin] = useState("");

  const overlayCloseHandler = () => {
    setShowOverlay(false);
    document.body.classList?.remove(`no-scroll`);
    document.documentElement.classList?.remove(`no-scroll`);
  };
  const overlayOpenHandler = () => {
    setShowOverlay(true);
    // setSelectedCard(dataCard);
    document.documentElement.classList?.add(`no-scroll`);
  };
  const handleClick = (event: any) => {
    // Check if the clicked element has the dynamically generated class
    if (event.target.classList?.contains("careers_overlay")) {
      // Your logic for handling the click event goes here

      document.body.classList?.add(`no-scroll`);
      document.documentElement.classList?.add(`no-scroll`);
      setShowOverlay(true);
    }
  };

  useEffect(() => {
    setUrlOrigin(window.location.origin);
    const parentContainer = document.querySelector(".footer");

    // Make sure the parent container exists before adding the event listener
    if (parentContainer) {
      parentContainer.addEventListener("click", handleClick);
    }

    // Remove the event listener on component unmount
    return () => {
      if (parentContainer) {
        parentContainer.removeEventListener("click", handleClick);
      }
    };
  }, []);

  const NavItem = ({ items, lang, origin }: any) => {
    return (
      <div
        className={`flex justify-center items-center flex-col lg:flex-row nav-item nav-item-${items.length}`}
      >
        {items &&
          items.length &&
          items?.map((item: any, index: number) => {
            let urls: any;

            if (origin && item.url && lang && !item.newTab) {
              urls = new URL(`${lang}/${item.url.replace("/", "")}`, origin);
            } else {
              urls = item.url;
            }
            return (
              <Fragment key={index}>
                <div className={`item flex items-center ${item.css_class}`}>
                  {item.url === "#" ? (
                    <span
                      className={`footer__flag text-center lg:text-left h4`}
                    >
                      {" "}
                      {item.text}
                    </span>
                  ) : (
                    <Link
                      onClick={() => {
                        if (item.text) {
                          pushDataLayer({
                            event: "eventTracker",
                            custom_event_name: "navigation_footer_click",
                            click_text: item.text.toLowerCase(),
                            eventCallback: function () {
                              window.dataLayer.push({
                                click_text: undefined,
                              });
                            },
                          });
                        }
                      }}
                      // scroll={true}
                      target={item.newTab ? "_blank" : "_self"}
                      href={urls ? urls : ""}
                      className={`footer__flag text-center lg:text-left h4`}
                    >
                      {item.text}
                    </Link>
                  )}
                </div>
                <div className="item flag flex items-center">
                  <Image
                    alt=""
                    width={"38"}
                    height={"24"}
                    src={HandleNullImage(item.item_img)}
                  />
                </div>
              </Fragment>
            );
          })}
      </div>
    );
  };

  const NavigationItems: any = () => {
    let set1: any = [];
    let set2: any = [];

    if (menuLinks.length > 3 && menuLinks.length !== 4) {
      {
        menuLinks.map((item: any, index: number) => {
          if (index < (menuLinks.length === 8 ? 4 : 3)) {
            set1.push(item);
          } else {
            set2.push(item);
          }
        });
      }
      return (
        <>
          <NavItem items={set1} lang={currentlanguge} origin={urlOrigin} />
          <NavItem items={set2} lang={currentlanguge} origin={urlOrigin} />
        </>
      );
    } else {
      return <NavItem items={menuLinks} />;
    }
  };

  return (
    <>
      <div
        className={`footer breaker breaker__bg-blue breaker__top-rtl ${Class}`}
      >
        <div className="container">
          <NavigationItems />
          <div className={`footer__inner`}>
            <Link
              href={firstFooterLogoLink ? firstFooterLogoLink : ""}
              target="blank"
              aria-label=""
              className=""
            >
              <Image
                alt=""
                src={HandleNullImage(firstFooterLogo)}
                width={120}
                height={72}
                className="footer__vision-logo"
              ></Image>
            </Link>
            <div className="footer__inner--bar"></div>
            <Link
              href={secondFooterLogoLink ? secondFooterLogoLink : ""}
              target="blank"
              aria-label=""
              className=""
            >
              <Image
                alt=""
                src={HandleNullImage(secondFooterLogo)}
                width={120}
                height={72}
                className="footer__vision-logo"
              ></Image>
            </Link>
          </div>
          <div className="footer__bottom__wrapper">
            <div className="grid grid-cols-12 justify-between">
              <div
                className={` ${
                  socialLinks.length > 0 ? "lg:col-span-9" : ""
                } col-span-12 footer__order__policy`}
              >
                <div
                  className={`flex footer__bottom__top justify-center ${
                    socialLinks.length > 0
                      ? "lg:justify-start"
                      : "lg:justify-center"
                  }`}
                >
                  <div className="flex footer__policies">
                    {legalLinks?.map((link: FooterLink) => {
                      let urls: any;
                      if (currentlanguge && link.url && urlOrigin) {
                        urls = new URL(
                          `${currentlanguge}/${link.url}`,
                          urlOrigin
                        );
                      }
                      return (
                        <Link
                          onClick={() => {
                            if (link.text) {
                              pushDataLayer({
                                event: "eventTracker",
                                custom_event_name: "navigation_footer_click",
                                click_text: link.text.toLowerCase(),
                                eventCallback: function () {
                                  window.dataLayer.push({
                                    click_text: undefined,
                                  });
                                },
                              });
                            }
                          }}
                          href={urls ? urls : ""}
                          className="footer__policies__text"
                          key={link.id}
                        >
                          {link.text}
                        </Link>
                      );
                    })}
                  </div>
                  <p className="footer__copyright__text">
                    ©{new Date().getFullYear()}&#160; {CopyRight}
                  </p>
                </div>
              </div>
              {socialLinks.length > 0 && (
                <div className="col-span-12 lg:col-span-3 footer__order__social">
                  <div className="footer__social flex flex-row  pb-58">
                    <ul className="flex">
                      {socialLinks?.map((link, index: number) => {
                        return (
                          <li key={index} className="md:ms-6 mr-6 md:mr-0">
                            <a
                              rel="noopener noreferrer"
                              href={link?.url}
                              className="flex items-center justify-center text-white"
                              target="_blank"
                            >
                              <Image
                                alt={link?.text}
                                src={link ? HandleNullImage(link.icon) : ""}
                                width="24"
                                height="24"
                              ></Image>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {showOverlay && (
        <ModalFooter onClickClose={overlayCloseHandler} data={card} />
      )} */}
    </>
  );
}
