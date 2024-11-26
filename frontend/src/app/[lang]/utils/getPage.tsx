import { fetchAPI } from "./fetch-api";

async function getPage(lang: any, split: any): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");
  const path = `/pages?_locale=${lang}&filters[slug]=${split}&populate=*`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: "*",
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export default getPage;
