import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Heading from "../../atoms/Heading/Heading";
import Image from "next/image";
import { HandleNullImage, getStrapiMedia } from "../../utils/api-helpers";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScreenType } from "../../utils/use-screenType";

export interface ModalBioProps {
  onClickClose?: () => void;
  data?: any;
}
type bioPorps = {
  img_src: string;
  title: string;
  desc: string;
  cta: string;
  cardVersion: string;
};

const Backdrop = (props: ModalBioProps) => {
  return <div className="backdrop" onClick={props.onClickClose} />;
};

const ModalOverlay = ({ onClickClose, onData }: any) => {
  const imgSmallUrl = HandleNullImage(
    onData.bio_image_large
  );
  const imgLargeUrl = HandleNullImage(
    onData.bio_image_small
  );
  const colorTheme = `var(--dark-purple)`;
  const imageBg: React.CSSProperties = {
    background: `var(--dark-purple)`,
  };

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   ScrollTrigger.normalizeScroll({
  //     allowNestedScroll: true,
  //     lockAxis: true,
  //     type: "touch,wheel,pointer",
  //   });
  //   return () => {
  //     gsap.registerPlugin(ScrollTrigger);
  //     ScrollTrigger.normalizeScroll({
  //       allowNestedScroll: false,
  //       lockAxis: true,
  //       type: "touch,wheel,pointer",
  //     });
  //   };
  // }, []);
  let isMobile = useScreenType(599);
  return (
    <div className="modal-bio">
      <span className="modal-bio__btn-close" onClick={onClickClose}>
        <span
          className="material-symbols-outlined icon-size-24"
          aria-hidden="true"
        >
          close
        </span>
      </span>
      <div className="modal-bio__wrapper custom-scrollbar">
        <div className="modal-bio__content-wrap flex flex-col lg:flex-row justify-between w-full items-center custom-scrollbar lg:gap-10 xl:gap-24">
          <div className="modal-bio__image" style={imageBg}>
            <Image
              src={imgLargeUrl || ""}
              width={"668"}
              height={"804"}
              alt={onData.bio_image_large?.data.attributes.alternativeText}
            ></Image>
          </div>
          <div className="modal-bio__content custom-scrollbar ">
            <div className="modal-bio__content--inner">
              <Heading tag="h2" classes="mb-2">
                {onData.bio_name}
              </Heading>
              <Heading tag="h5">{onData.bio_designation}</Heading>
              <div className="modal-bio__keys mt-8 lg:mt-10 ">
                {onData.info !== null && (
                  onData.info.map((test:any) => {
                    return (
                      <div className="flex items-center gap-2 mb-4">
                        <img src={isMobile ? HandleNullImage(test.Icon_Mobile) : HandleNullImage(test.icon)} />
                        <p className="body-normal--bold">{test.text}</p>
                      </div>
                    )
                  
                  })
                )}
              </div>
              <div
                className="rte-component mt-8 lg:mt-10"
                dangerouslySetInnerHTML={{ __html: onData.bio_info }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const ModalBio = ({ onClickClose, data }: ModalBioProps) => {
  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");

  return (
    <>
      {backdropRoot &&
        ReactDOM.createPortal(
          (<Backdrop onClickClose={onClickClose} />) as any, // Explicitly cast to ReactNode
          backdropRoot
        )}
      {overlayRoot &&
        ReactDOM.createPortal(
          (<ModalOverlay onClickClose={onClickClose} onData={data} />) as any,
          overlayRoot
        )}
    </>
  );
};

export default ModalBio;
