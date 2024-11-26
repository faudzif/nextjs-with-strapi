import { MetadataRoute } from 'next'
import { headers } from "next/dist/client/components/headers";
import getGlobal from './utils/getGlobal';



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const _headers = headers();
  const currentUrl = _headers.get("x-url");
  const currentCulture =  currentUrl?.split('/').at(3)
  
  const global = await getGlobal(currentCulture as any);
 
  const pagesEntries  = global?.data?.attributes?.sitemap;
  const url  = global?.data?.attributes?.frontendUrl;
  if (pagesEntries === null && url) {
    return [];
  }

  return pagesEntries?.sitemapItems?.map((pageEntry : any) => (     
    
    {
    url: `${url+"/"}${currentCulture}${pageEntry.sitemapUrl === '/'?'': "/" + pageEntry.sitemapUrl}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: pageEntry.sitemapUrl === '/'? 1:0.9,
  }))

}