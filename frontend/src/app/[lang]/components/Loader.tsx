
'use client'

import React, {  } from "react";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="loader-main absolute top-0 left-0 flex items-center justify-center z-50 w-full h-full ">
      <div role="status">
        <div className="sf-loader">
          <Image width={400} height={200} alt="" src={"/loader.gif"} priority={true} ></Image>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
