import { formatDate, getStrapiMedia } from '@/app/[lang]/utils/api-helpers';
import { postRenderer } from '@/app/[lang]/utils/post-renderer';
import Image from 'next/image';
import InnerHero from '../components/InnerHero/InnerHero';

interface Article {
    id: number;
    attributes: {
        title: string;
        description: string;
        slug: string;
        cover: {
            data: {
                attributes: {
                    url: string;
                    alternativeText: string;
                    name: string;
                };
            };
        };
        authorsBio: {
            data: {
                attributes: {
                    name: string;
                    avatar: {
                        data: {
                            attributes: {
                                url: string;
                            };
                        };
                    };
                };
            };
        };
        blocks: any[];
        publishedAt: string;
        category: {
            data: {
                attributes: {
                    name: string;
                }
            }
        }
    };
}

export default function Post({ data }: { data: Article }) {
    const { title, description, publishedAt, cover, authorsBio, category } = data.attributes;
    const author = authorsBio.data?.attributes;
    const imageUrl = getStrapiMedia(cover.data?.attributes.url);
    const authorImgUrl = getStrapiMedia(authorsBio.data?.attributes.avatar.data.attributes.url);
    const categoryData = category.data.attributes.name;

    return (

        <>
            <InnerHero
                data={{
                    title: title,
                    description: "",
                    picture: {
                        data: {
                            id: "1",
                            attributes: {
                                url: imageUrl || "",
                                name: cover.data?.attributes.name,
                                alternativeText: cover.data?.attributes.alternativeText,
                            },
                        },
                    },
                    type: "overlay",
                    date: formatDate(publishedAt),
                    category: categoryData,
                }}
            ></InnerHero>


            <div>
                {data.attributes.blocks.map((section: any, index: number) => postRenderer(section, index))}
            </div>
        </>
    );
}
