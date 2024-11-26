"use client";
import { useEffect } from "react";
import { pushDataLayer } from "./api-helpers";
import { usePathname } from "next/navigation";


interface GA4ProviderModel {
  page_type: any;
  lang: string;
  page_name:string;
}

export const GA4Provider = ({ page_type, lang ,page_name}: any) => {
  const pathName = usePathname();
  useEffect(() => {
    if (page_type && lang) {
      pushDataLayer({
        user_id:"",
        country_cd:"",
        page_name: page_name?.toLowerCase() || "",
        page_type: (page_name === 'Rides & Attraction' || page_name === 'Dining' || page_name === 'Shopping'|| page_name === 'Explore')? 'plp':page_type === 'Home' ? page_name?.toLowerCase()+" "+"page" : "pdp" ,
        language_cd: lang
      });
    }
  }, [page_type, lang, pathName])

  return null;
};
