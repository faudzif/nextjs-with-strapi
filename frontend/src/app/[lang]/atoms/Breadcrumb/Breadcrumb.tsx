import React, { Fragment, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getPageBySlug } from "../../utils/get-page-by-slug";
import axios from "axios";

interface BreadcrumbProps {
  classes?: string;
  links?: any;
  landingPageLink: string;
  lang: string;
  ridesDetail?: string;
}

export default function Breadcrumb({
  links,
  landingPageLink,
  lang,
  ridesDetail,
}: BreadcrumbProps) {
  const [dataNews, setData] = useState<any>([]);
  const [currentDomain, setCurrentDomain] = useState("");
  const [fullURL, setFullURL] = useState<any>();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setCurrentDomain(window?.location?.origin);
    setFullURL(window?.location?.href?.split("/"));
  }, []);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
        const res = await axios.get(`${currentDomain}/${lang}/api/breadcrumb`,
          {
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            }
          }).then(response => {
            if (response.status === 200) {
              setData(response?.data?.data?.attributes?.navbar?.links);
              // Handle the response
            }
            else {
              console.error("Error fetching breadcumb:", response.statusText);
              // Handle specific error based on response status
            }
          })
          .catch(error => {
            // Handle errors
          });
          return res;
          
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // console.log(fullURL);
  // console.log(dataNews,"test");
  // fullURL.map((item:any)=>{
  //   if()
  // })
  return (
    <>
      {links?.length > 0 ? (
        <div className="breadcrumbs flex flex-wrap">
          {links?.map((item: any, index: number) => {
            return (
              <Fragment key={index}>
                  <div className="breadcrumbs__links">
                    <Link
                      href={`/${lang}`}
                      className="label-small--regular"
                      key={index}
                    >
                      {dataNews[0]?.text}
                    </Link>
                    {dataNews[0]?.text &&
                    <span className="breadcrumbs__separator" key={index}>
                      /
                    </span>
          }
                  </div>
                {dataNews[0]?.text && item?.landingPageName !== null && (
                  <div className="breadcrumbs__links">
                    <Link
                      href={`/${lang}/${landingPageLink}`}
                      className="label-small--regular"
                      key={index}
                    >
                      {item?.landingPageName}
                    </Link>
                  {item?.landingPageName && (
                      <span className="breadcrumbs__separator" key={index}>
                        /
                      </span>
                    ) }
                    </div>
                )}
                {dataNews[0]?.text && ridesDetail !== null && (
                  <div className="breadcrumbs__links" key={index}>
                    <Link
                      href={`../explore/rides`}
                      className="label-small--regular"
                    >
                      {ridesDetail}
                    </Link>
                    {ridesDetail && (
                      <span className="breadcrumbs__separator">/</span>
                    )}
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

// export default Breadcrumb;
