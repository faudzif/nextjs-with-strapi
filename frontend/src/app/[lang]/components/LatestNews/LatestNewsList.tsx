'use client'
import Link from "next/link";
import { checkNull, formatDate } from "../../utils/api-helpers";
interface NewsList {
    id: number;
    attributes: {
        title: string;
        description: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        Date: string;
        category: {
            data: {
                id: string;
                attributes: {
                    createdAt: string;
                    updatedAt: string;
                    name: string;
                    slug: string;
                    description: string;
                };
            };
        };
    };
    lang: string;
    hasNewsLanding: boolean;
}
const LatestNewsList = ({ data: news, children, lang, hasNewsLanding }: {
    data: NewsList[]; children?: React.ReactNode; lang: string; hasNewsLanding: boolean;
}) => {

    return (
        <>
            {news?.slice(0, 5).map((newslist, id: number) => {
                const category = newslist?.attributes?.category?.data?.attributes;
                return (
                    <Link href={`${hasNewsLanding ? "articles/" + newslist.attributes.slug : lang + "/articles/" + newslist.attributes.slug}`} key={id} >
                        <div className={`news-list flex local-page`} >
                            <div key={newslist.id} className="w-full" >
                                <div className={` grid grid-cols-4 lg:grid-cols-8 xl:grid-cols-12 gap-y-2 md:gap-y-0 xl:gap-y-6`}>
                                    <div className="col-span-3">
                                        <div className="flex gap-2 items-center">
                                            <div className={`news-date font-light label-small--regular`}>{formatDate(newslist.attributes.publishedAt)}</div>
                                            <div className={`news-pointer`}>•</div>
                                            <div className="news-category font-normal uppercase label-small--regular">{checkNull(newslist.attributes.category?.data.attributes.name)}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-4 lg:col-span-8 xl:col-span-6 flex justify-between items-end gap-2">
                                        <h5 className="news-list-title body-large">{checkNull(newslist.attributes.title)}</h5>
                                        <span className={`news-mobile-link flex xl:hidden`} >
                                            <span className="material-symbols-outlined">
                                                east
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })
            }
            {children && children}
        </>
    )
}


export default LatestNewsList