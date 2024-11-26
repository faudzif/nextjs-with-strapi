import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../atoms/Button/Button";
import Image from "next/image";
import { getStrapiMedia } from "../../utils/api-helpers";
import Link from "next/link"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export interface ModalTermsProps {
    onClickClose?: () => void;
    data?: any;
    title?: string;
    desc?: string;
    cta_text?: string;
    cta_Link?: string;
}

interface Modal {
    title: string;
    desc: string;
    cta: string;
}

const Backdrop = (props: ModalTermsProps) => {
  return <div className="backdrop" onClick={props.onClickClose} />;
};

const ModalOverlay = ({ onClickClose, data }: ModalTermsProps) => {

    return (
        <div className="modal-terms min-h-screen flex justify-center items-center">
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
                            <Heading tag="h3" classes="mb-6 theme-blue-to-white">{data?.title ?? ""}</Heading>
                            <div className="rte-component" dangerouslySetInnerHTML={{ __html: data?.desc ?? "" }}></div>  
                            { data?.cta_text && data?.cta_Link &&
                                <div className="modal-card__content--button">            
                                <Button tag="a" href={data?.cta_Link} children={data?.cta_text} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
          </div>
        
  );
};
const ModalTerms = ({ onClickClose, data }: ModalTermsProps) => {
  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");

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

  return (
    <>
      {backdropRoot &&
        ReactDOM.createPortal(
          (<Backdrop onClickClose={onClickClose} />) as any, // Explicitly cast to ReactNode
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

export default ModalTerms;
