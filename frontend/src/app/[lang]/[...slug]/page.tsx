import { sectionRenderer } from "../utils/section-renderer";
import { getPageBySlug } from "../utils/get-page-by-slug";
import getGlobal from "../utils/getGlobal";
import Custom404 from "./404";
import { GA4Provider } from "../utils/GA4Provider";
import getConfigs from "../utils/getConfigs";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export default async function RootRoute({
  params,
}: {
  params: { lang: string, slug: string };
}) {
  const global = await getGlobal(params.lang);
  const { Signup } = global?.data?.attributes;
  const contactFooter = global?.data?.attributes?.footer?.contactUsFooter
  const configs = await getConfigs(params.lang, 'google_recaptcha_site_key');
  // const Google_reCaptcha_Site_key =
  // global?.data?.attributes?.Google_reCaptcha_Site_key;
  const Google_reCaptcha_Site_key = configs.data.find((o: { attributes: { Key: string; }; }) => o.attributes.Key === 'google_recaptcha_site_key').attributes.Value;
  let page = await getPageBySlug(params.slug, params.lang);
  const conditional = page?.data[0]?.attributes;
  if (page != null && page.data != null && page.data.length > 0) {
    const contentSections = page.data[0]?.attributes?.contentSections; //return Custom404()
    const page_type = page?.data[0]?.attributes;
    const page_name = page?.data[0]?.attributes?.shortName;
    let api: string = "../en/api/overlayContactUs";
    let linkText: string = `${"../../" + params.lang + "/" + conditional?.partnerFooter?.ctaLink}`;
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
            ""
          )
        )}
      </>
    );
  } else {
    return Custom404();
  }
}
