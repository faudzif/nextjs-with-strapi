import { fetchAPI } from "./fetch-api";

async function getConfigs(lang: any, key: string): Promise<any> {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!token)
        throw new Error("The Strapi API Token environment variable is not set.");

    const path = `/configurations`;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const urlParamsObject = {
        filters: {
            Key: key
        },
        locale: lang,
    };
    return await fetchAPI(path, urlParamsObject, options);
}

export default getConfigs;