
"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import LatestNewsList from "./LatestNewsList";
import Button from "../../atoms/Button/Button";
import { checkNull } from "../../utils/api-helpers";
import axios from "axios";

interface LatestNewsProps {
  data: {
    hasNewsLanding: boolean;
    title: string;
    slug:string;
    link: {
      url: string;
      text: string;
    };
  };
  lang:string;
}
let check : any = "";
  const LatestNews = ({ data ,lang}: LatestNewsProps) => {
  const [dataNews, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  check = data.hasNewsLanding?"api/articles": lang + "/api/articles"
  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
        const res = await axios.get(`${check}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
          }).then(response => {
          if (response.status === 200) {
          setData(response.data.data);
          // Handle the response
          }
          else {
            console.error("Error fetching articles:", response.statusText);
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
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

const Element = data.hasNewsLanding ? "h4" : "h2";

  return (
    <>
      <section
        className={`latest-news ${
          data.hasNewsLanding
            ? "news-landing breaker breaker__bg-white breaker__top-ltr"
            : ""
        }`}
      >
        <div className="container">
          <Element className={`latest-news-title`}>{data.title}</Element>
          <div className={`latest-news-listing`}>
            <Suspense>
            <LatestNewsList data={dataNews} lang={lang} hasNewsLanding={data.hasNewsLanding}/>
            </Suspense>
            <hr className="news__divider" />
          </div>
          {data.hasNewsLanding && (
            <>
              {dataNews?.length > 10 ? (
                <Button
                  tag="a"
                  href={checkNull(data.link.url)}
                  secondary={true}
                  btnBg=""
                  classes=""
                  children={"load more"}
                  iconRight="add"
                />
              ) : null}
            </>
          )}
          {!data.hasNewsLanding && (
            <>
              {dataNews?.length > 4 ? (
                <Button
                  tag="a"
                  href={checkNull(data.link.url)}
                  secondary={true}
                  btnBg=""
                  classes=""
                  children={data.link.text}
                />
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default LatestNews;
