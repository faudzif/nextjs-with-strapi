import { fetchAPI } from "./fetch-api";

export async function getPageBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/pages`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    return await fetchAPI(path, urlParamsObject, options);
}
export async function getExploreBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/explores`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    return await fetchAPI(path, urlParamsObject, options);
}
export async function getRidesBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/rides-and-attractions`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    return await fetchAPI(path, urlParamsObject, options);
}
export async function getRides() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/qr-codes`;
    const urlParamsObject = {
        "pagination[start]": 0,
        "pagination[limit]": 100
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    return await fetchAPI(path, urlParamsObject, options);
}
export async function getArticleBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/articles`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    return await fetchAPI(path, urlParamsObject, options);
}
export async function getListArticle(lang: string) {
    const slug = "all";
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const res = await fetchAPI(path, urlParamsObject, options);
    return res
}
export async function fetchPostsByCategory(filter: string, lang: string) {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/articles`;
        // const urlParamsObject = {
        //     sort: { createdAt: 'desc' },
        //     filters: {
        //         category: {
        //             slug: filter,
        //         },
        //     },
        //     populate: {
        //         cover: { fields: ['url'] },
        //         category: {
        //             populate: '*',
        //         },
        //         authorsBio: {
        //             populate: '*',
        //         },
        //     },
        // };
        const urlParamsObject = { filters: { filter }, locale: lang };
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const responseData = await fetchAPI(path, urlParamsObject, options);
        return responseData;
    } catch (error) {
        //console.error(error);
    }
}
// export async function fetchNews(filter: string,lang:string) {
//     try {
//         const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
//         const path = `/articles/`;
//         const urlParamsObject = {
//             sort: { createdAt: 'desc' },
//             // filters: {
//             //     category: {
//             //         slug: filter,
//             //     },
//             // },
//             populate: {
//                 cover: { fields: ['url'] },
//                 category: {
//                     populate: '*',
//                 },
//                 authorsBio: {
//                     populate: '*',
//                 },
//             },
//         };
//         // const urlParamsObject = {filters: {filter}, locale: lang};
//         const options = { headers: { Authorization: `Bearer ${token}` } };
//         //console.log(path)
//         const responseData = await fetchAPI(path, urlParamsObject, options);
//         return responseData;
//     } catch (error) {
//         //console.error(error);
//     }
// }
export async function fetchNews(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    return await fetchAPI(path, urlParamsObject, options);
}
export async function fetchPartners(slug: string, lang: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/partners`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    return await fetchAPI(path, urlParamsObject, options);
}