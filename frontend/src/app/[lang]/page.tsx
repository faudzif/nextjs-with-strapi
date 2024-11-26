import LangRedirect from "./components/LangRedirect";
import { sectionRenderer } from "./utils/section-renderer";
import { getPageBySlug } from "./utils/get-page-by-slug";
import getGlobal from "./utils/getGlobal";
import getConfigs from "./utils/getConfigs";
import { Page_level_Data } from "./utils/page_metaData";
import Custom404 from "./[...slug]/404";
import { GA4Provider } from "./utils/GA4Provider";

type Props = {
  params: {
    id: string;
    lang: string;
    slug: string;
  };
};

export default async function PageRoute({ params }: Props) {
  try {
    const global = await getGlobal(params.lang);
    const contactFooter = global?.data?.attributes?.footer?.contactUsFooter;
    const configs = await getConfigs(params.lang, 'google_recaptcha_site_key');
    // const Google_reCaptcha_Site_key =
    // global?.data?.attributes?.Google_reCaptcha_Site_key;
    const Google_reCaptcha_Site_key = configs.data.find((o: { attributes: { Key: string; }; }) => o.attributes.Key === 'google_recaptcha_site_key').attributes.Value;
    let page = await getPageBySlug("home", params.lang);
    const conditional = page?.data[0]?.attributes;
    if (page != null && page?.data != null && page?.data?.length > 0) {
      const contentSections = page?.data[0]?.attributes?.contentSections; //return Custom404()
      const page_type = page?.data[0]?.attributes.shortName;
      const page_name = page?.data[0]?.attributes?.shortName;
      let api: string = "en/api/partner";
      const { Signup } = global?.data?.attributes;
      //let linkText : string = params.lang + "/" + conditional.partnerFooter.ctaLink;
      return (
        <>
          <GA4Provider page_type={page_type} lang={params.lang} page_name={page_name} />
          {contentSections.map((section: any, index: number) =>
            sectionRenderer(
              page,
              section,
              index,
              params.lang,
              Google_reCaptcha_Site_key,
              Signup,
              false,
              "null"
            )
          )}
        </>
      );
    } else {
      return Custom404();
    }
  } catch (error: any) {
    console.error(error.message);
  }
}
