import React, { createRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo({ 
  src,
  children,
  currentCulture
}: {
  src: string | null;
  children?: React.ReactNode;
  currentCulture : string
}) {
  // const logoContainer: any = createRef();
  let animationRef = useRef<any>(null);
  async function getLottie() {
    const lot = await import("lottie-web");
    lot.default.loadAnimation({
      //         container:animationRef.current,
      //         renderer: "svg",
      //         loop: true,
      //         autoplay: true,
      //         path:`${currentCulture === 'en'? "/sf-logo.json": "animations/sf-logo-ar.json"}`,
      //     })
      // }
      autoplay: true,
      loop: true,
      renderer: "svg",
      path: `${
        currentCulture === "en"
          ? "/sf-logo.json"
          : "/animations/sfq-logo-ar.json"
      }`,
      container: animationRef.current,
    });
  }
  useEffect(() => {
    
    // const anim = lottie.loadAnimation({
    //   container: logoContainer.current,
    //   renderer: "svg",
    //   loop: true,
    //   autoplay: true,
    //   path:`${currentCulture === 'en'? "/sf-logo.json": "/sf-logo-ar.json"}`,
    // });

    // return () => anim.destroy();
    getLottie();
  }, []);
  return (
    <Link href={`/${currentCulture}`} aria-label="Back to homepage" className="main-menu__logo">
    {src && (
      <Image
        alt=""
        src={src}
        width={"116"}
        height={"64"}
        className="sticky-logo"
      ></Image>
    )}
    <div className="main-menu__logo--video" style={{ width: "281px" }} ref={animationRef}></div>
    <div className="ms-2">{children}</div>
  </Link>
  );
}
