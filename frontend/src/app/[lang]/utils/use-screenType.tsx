"use client"
import { useEffect, useState } from "react";

export const useScreenType = (windowWidth: number) => {
  const [mqlForScreenType, setMqlForScreenType] = useState<any>(null);

  useEffect(() => {
    setMqlForScreenType(
      window.matchMedia(`(max-width: ${windowWidth}px)`)?.matches
    );
    const handleOrientationChange = () => {
      setTimeout(() => {
        setMqlForScreenType(
          window.matchMedia(`(max-width: ${windowWidth}px)`)?.matches
        );
      }, 50);
    };
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return mqlForScreenType;
};
