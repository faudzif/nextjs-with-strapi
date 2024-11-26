import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import _ReactPlayer, { ReactPlayerProps } from "react-player";
import { pushDataLayer } from "../../utils/api-helpers";

export interface ModalOnlyVideoProps {
  onClickClose?: () => void;
  videoId?: string;
}

const Backdrop = (props: ModalOnlyVideoProps) => {
  return <div className="backdrop" onClick={props.onClickClose} />;
};

const ModalOverlay = (props: ModalOnlyVideoProps) => {
  const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

  const [isplaying, setIsplaying] = useState<any>(false);
  const [videoUrl, setVideoUrl] = useState<any>(null);
  const reactPlayerRef = useRef<any>(null);
  useEffect(() => {
    setVideoUrl(`https://youtu.be/${props.videoId}`);
  }, []);

  // Function to convert seconds like 00:30
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  // Function to track video engagement
  const trackVideoEngagement = (title: string, eventType: string, currentTime: string, duration: string, percentage: string) => {
    pushDataLayer({
      'event': 'eventTracker',
      'custom_event_name': 'video_engagement',
      'title': title.toLowerCase(),
      'duration': duration,
      'type': eventType,
      'percentage': percentage,
      'time': currentTime,
      eventCallback: function () {
        // Reset values after pushing to GTM
        window.dataLayer.push({
          title: undefined,
          duration: undefined,
          type: undefined,
          percentage: undefined,
          time: undefined
        });
      }
    });
  };

  const handlePlay = () => {
    const videoTitle = reactPlayerRef.current.getInternalPlayer().videoTitle;
    const time = reactPlayerRef.current.getCurrentTime();
    const duration = reactPlayerRef.current.getDuration();
    const percentage = time / duration * 100;
    trackVideoEngagement(
      videoTitle,
      "played",
      formatTime(time),
      formatTime(duration),
      Math.round(percentage).toString() + '%'
    )
  }
  const handlePause = () => {
    const videoTitle = reactPlayerRef.current.getInternalPlayer().videoTitle;
    const time = reactPlayerRef.current.getCurrentTime();
    const duration = reactPlayerRef.current.getDuration();
    const percentage = time / duration * 100;
    trackVideoEngagement(
      videoTitle,
      "paused",
      formatTime(time),
      formatTime(duration),
      Math.round(percentage).toString() + '%'
    )
  }

  return (
    <div className="modal-only-video">
      <span
        className="modal-only-video__btn-close"
        onClick={props.onClickClose}
      >
        <span
          className="material-symbols-outlined icon-size-24"
          aria-hidden="true"
        >
          close
        </span>
      </span>
      <div className="modal-only-video__content-wrapper custom-scrollbar">
        <div className="modal-only-video__player-wrapper">
          <ReactPlayer
            ref={reactPlayerRef}
            url={videoUrl}
            width="100%"
            height="100%"
            playing={isplaying}
            muted={true}
            controls={true}
            onReady={() => {
              setIsplaying(true);
            }}
            //for gtm
            onPlay={handlePlay}
            onPause={handlePause}
          />
        </div>
      </div>
    </div>
  );
};

const ModalOnlyVideo = ({ onClickClose, videoId }: ModalOnlyVideoProps) => {
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
          (
            <ModalOverlay onClickClose={onClickClose} videoId={videoId} />
          ) as any,
          overlayRoot
        )}
    </>
  );
};

export default ModalOnlyVideo;
