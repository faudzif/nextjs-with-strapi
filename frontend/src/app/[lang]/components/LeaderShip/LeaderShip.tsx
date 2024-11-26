"use client";
import React, { useState } from 'react';
import Heading from '../../atoms/Heading/Heading'
import ModalBio from '../Modal/ModalBio';
import LeaderShipCard from './LeaderShipCard';
import { Picture } from '../../utils/model';
import { pushDataLayer } from '../../utils/api-helpers';

interface LeaderShipProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    url:string;
    bio: any[];
  };
}

interface LeaderShipCardProps {
  theme: string;
  bio_name: string;
  bio_designation: string;
  bio_location: string;
  bio_joining: string;
  bio_info: string;
  bio_image_large: Picture;
  bio_image_small: Picture;
  bio_image_small_Mobile:Picture;
  onClick: () => void;
}

interface LeaderShipCardProps {
  theme: string;
  bio_name: string;
  bio_designation: string;
  bio_location: string;
  bio_joining: string;
  bio_info: string;
  bio_image_large: Picture;
  bio_image_small: Picture;
  bio_image_small_Mobile:Picture;
  onClick: () => void;
}



const LeaderShip = ({ data }: LeaderShipProps) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedCard, setSelectedCard] = useState<LeaderShipCardProps | null>(null);

  const overlayOpenHandler = (bioData: LeaderShipCardProps) => {
    setShowOverlay(true);
    setSelectedCard(bioData)
    document.documentElement.classList?.add('no-scroll');
    document.body.classList?.add(`no-scroll`);
    if (data.title && bioData.bio_name) {
      pushDataLayer({
        event: 'eventTracker',
        custom_event_name: 'cta_click',
        title: data.title.toLowerCase(),
        click_text: bioData.bio_name.toLowerCase(),
        eventCallback: function () {
          window.dataLayer.push({
            title: undefined,
            click_text: undefined
          })
        }
      });
    }
  };

  const overlayCloseHandler = () => {
    setShowOverlay(false);
    setSelectedCard(null);
    document.body.classList?.remove(`no-scroll`);
    document.documentElement.classList?.remove(`no-scroll`);
  };

  return (
    <>
      <section className='leader-ship color-white' id={data.url}>
        <div className="container">
          <div className="grid grid-cols-12 gap-6 mb-12 xl:pb-4">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
              {data.subtitle && <h3 className="overline mb-6 xl:mb-8 block">{data.subtitle}</h3>}
              {data.title && <Heading tag="h2" classes='mb-4 xl:mb-6'>{data.title}</Heading>}
              {data.description && <p className='body-normal'>{data.description}</p>}

            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-10 lg:col-start-2 ">
              <div className="leader-ship__grid">
                {data.bio.map((bioData, index: number) => {
                  return (
                    <LeaderShipCard
                      key={index}
                      {...bioData}
                      onClick={() => {
                        overlayOpenHandler(bioData);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showOverlay && (
        <ModalBio onClickClose={overlayCloseHandler} data={selectedCard} />
      )}
    </>
  );
};

export default LeaderShip;
