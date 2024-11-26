import { getPageBySlug } from "./utils/get-page-by-slug";
import {sectionRenderer} from "./utils/section-renderer";

export default async function notFound() {
    let page = await getPageBySlug("error","en");
    let contentSections = page.data[0].attributes.contentSections;
    return contentSections.map((section:any, index:number) => sectionRenderer(page,section, index,"en","",undefined,true,"/error"));
}
