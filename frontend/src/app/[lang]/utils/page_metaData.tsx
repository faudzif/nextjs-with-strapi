"use client";

import { pushDataLayer } from "./api-helpers";
import React, { useEffect } from "react";
export const Page_level_Data = (name: any, lang: any) => {
  //console.log(name);
  useEffect(() => {
    var dataLayer = window.dataLayer || [];
    dataLayer.push({
      page_type: name,
      language_cd: lang,
    });
  }, []);
  return <></>;
};
