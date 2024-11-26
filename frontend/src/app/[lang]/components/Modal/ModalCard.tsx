import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../atoms/Button/Button";
import { HandleNullImage, getStrapiMedia, pushDataLayer } from "../../utils/api-helpers";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScreenType } from "../../utils/use-screenType";

export interface ModalCardProps {
  onClickClose: () => void;
  data: {
    onClickClose: () => void;
    desktopImage: Picture;
    disableOverlay: boolean;
    description: string;
    optionalLinkUrl: string;
    title?: string;
    leftSwitch: boolean;
    mobileImage: Picture;
    ctaText: string;
    overlay: Overlay
    CardItems: card[];
    onClick: () => void;
  }
}
interface benefit {
  id: string
  text: string;
  icon: Picture
  Icon_Mobile: Picture;

}
interface Overlay {
  title: string;
  description: string;
  subHeading: string;
  benefit: benefit;
  overlayImage: Picture;
  overlayImage_Mobile: Picture;
  cta_text: string
  cta_link: string
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
interface card {
  desktopImage: Picture;
  onClickClose: () => void;
  disableOverlay: boolean;
  description: string;
  optionalLinkUrl: string;
  title?: string;
  leftSwitch: boolean;
  mobileImage: Picture;
  ctaText: string;
  overlay: Overlay
  CardItems: card[];
  onClick: () => void;
}

const Backdrop = (props: any) => {
  return <div className="backdrop" onClick={props.onClickClose} />;
};
const ModalOverlay = ({ onClickClose, data }: ModalCardProps) => {
  const Desktop_img = HandleNullImage(data.desktopImage)
  const Mobile_img = HandleNullImage(data.mobileImage)
  const arr: any = data.overlay.benefit
  let isMobile = useScreenType(599);
  return (
    <>
      <div className="modal-card">
        <span className="modal-card__btn-close" onClick={onClickClose}>
          <span
            className="material-symbols-outlined icon-size-24"
            aria-hidden="true"
          >
            close
          </span>
        </span>
        <div className="modal-card__wrapper">
          <div className="modal-card__content-wrap flex flex-col lg:flex-row w-full items-center custom-scrollbar lg:gap-10 xl:gap-24">
            <div className="modal-card__image">
            <Image alt="card" width="500" height="500" src={isMobile ? Mobile_img : Desktop_img}/>
            </div>
            <div className="modal-card__content custom-scrollbar">
              <div className="modal-card__content--inner">
                {
                  data.overlay.title &&
                  <Heading tag="h2" classes="mb-4 lg:mb-6">
                    {data.overlay.title}
                  </Heading>
                }
                {data.overlay.description &&
                  <div
                    className="rte-component mb-10"
                    dangerouslySetInnerHTML={{
                      __html: data.overlay.description,
                    }}
                  ></div>
                }
                {data.overlay.subHeading &&
                  <div className="modal-card__content--optional mt-10 mb-10">
                    <Heading
                      tag="h5"
                      classes="mb-4"
                      children={data.overlay.subHeading}
                    />
                    <div className="modal-card__callout">
                      {arr.map((test: benefit,index:number) => {
                        return (
                          <div key={index} className="modal-card__callout--item">
                            <img src={isMobile ? HandleNullImage(test.Icon_Mobile) : HandleNullImage(test.icon)} />
                            <label className="body-normal body-normal--bold ms-2">
                              {test.text}
                            </label>
                          </div>
                        )
                      })
                      }
                    </div>
                  </div>
                }
                {data.overlay.cta_text && data.overlay.cta_link !== "" && (
                  <div className="modal-card__content--button">
                    <Button
                      onClick={() => {
                        //GTM
                        if (data.overlay.cta_text && data.overlay.title) {
                          pushDataLayer({
                            event: 'eventTracker',
                            custom_event_name: 'cta_click',
                            title: data.overlay.title.toLowerCase(),
                            click_text: data.overlay.cta_text.toLowerCase(),
                            eventCallback: function () {
                              window.dataLayer.push({
                                title: undefined,
                                click_text: undefined
                              })
                            }
                          });
                        }
                      }}
                      tag="a"
                      href={data.overlay.cta_link}
                      children={data.overlay.cta_text}
                      iconRight="arrow_outward"
                    />
                  </div>

                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const ModalCard = ({ onClickClose, data }: ModalCardProps) => {
  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");

  return (
    <>
      {backdropRoot &&
        ReactDOM.createPortal(
          (<Backdrop onClickClose={onClickClose} />) as any,
          backdropRoot
        )}
      {overlayRoot &&
        ReactDOM.createPortal(
          (<ModalOverlay onClickClose={onClickClose} data={data} />) as any,
          overlayRoot
        )}
    </>
  );
};

export default ModalCard;
