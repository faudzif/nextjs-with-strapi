import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Heading from "../../atoms/Heading/Heading";
import Button from "../../atoms/Button/Button";
import { HandleNullImage, getStrapiMedia, pushDataLayer } from "../../utils/api-helpers";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


interface benefit {
  id: string
  text: string;
  icon: Picture

}
interface Overlay {
onClickClose: () => void;
data:{
    title: string;
    description: string;
    subHeading: string;
    benefit: benefit;
    overlayImage: Picture;
    cta_text: string
    cta_Link: string
}
  
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



const Backdrop = (props: any) => {
  return <div className="backdrop" onClick={props.onClickClose} />;
};
const ModalOverlay = ({ onClickClose, data }: Overlay) => {
  const imgURL = HandleNullImage(data.overlayImage)
  const arr: any = data.benefit
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
          <div className="modal-card__content-wrap flex flex-col lg:flex-row justify-between w-full items-center custom-scrollbar lg:gap-10 xl:gap-24">
            <div className="modal-card__image">
              <img src={imgURL || ""}></img>
            </div>
            <div className="modal-card__content custom-scrollbar">
              <div className="modal-card__content--inner">
                <Heading tag="h2" classes="mb-4 lg:mb-6">
                  {data.title}
                </Heading>
                <div
                  className="rte-component mb-10"
                  dangerouslySetInnerHTML={{
                    __html: data.description,
                  }}
                ></div>
                {data.subHeading &&
                  <div className="modal-card__content--optional mt-10 mb-10">
                    <Heading
                      tag="h5"
                      classes="mb-4"
                      children={data.subHeading}
                    />
                    <div className="modal-card__callout">
                      {arr?.map((test: benefit,index:number) => {
                        return (
                          <div key={index} className="modal-card__callout--item">
                            <img src={HandleNullImage(test.icon)} />
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
                {data.cta_text && data.cta_Link !== "" && (
                  <div className="modal-card__content--button">
                    <Button
                      onClick={()=>{
                        //GTM
                        if (data.cta_text && data.title) {
                          pushDataLayer({
                            event: 'eventTracker',
                            custom_event_name: 'cta_click',
                            title: data.title.toLowerCase(),
                            click_text: data.cta_text.toLowerCase(),
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
                      href={data.cta_Link}
                      children={data.cta_text}
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
const ModalFooter = ({ onClickClose, data }: Overlay) => {
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

export default ModalFooter;
