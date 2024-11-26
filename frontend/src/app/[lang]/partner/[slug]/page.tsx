import React from "react";
import { fetchPartners } from "../../utils/get-page-by-slug";
import { sectionRenderer } from "../../utils/section-renderer";
import LangRedirect from "../../components/LangRedirect";
import { getGlobal } from "../../layout";
import getConfigs from "../../utils/getConfigs";
type Props = {
  params: {
    lang: string;
    slug: string;
  };
};
export default async function PageRoute({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const global = await getGlobal(params.lang);
  const { Signup } = global?.data?.attributes;
  const contactFooter = global?.data?.attributes?.footer?.contactUsFooter
  const configs = await getConfigs(params.lang, 'google_recaptcha_site_key');
    // const Google_reCaptcha_Site_key =
    // global?.data?.attributes?.Google_reCaptcha_Site_key;
    const Google_reCaptcha_Site_key = configs.data.find((o: { attributes: { Key: string; }; }) => o.attributes.Key === 'google_recaptcha_site_key').attributes.Value;
  const page = await fetchPartners(params.slug, params.lang);
  if (page?.data?.length === 0) return null;
  if (page?.data?.length == 0 && params.lang !== "en")
    return <LangRedirect />;
  const contentSections = page?.data[0]?.attributes?.blocks;
  const conditional = page?.data[0]?.attributes;
  let api : string = "../../en/api/overlayContactUs";
  let linkText : string = `${"../../"+params.lang + "/" + conditional?.partnerFooter?.ctaLink}`;
  return (
    <>
      {contentSections?.map((section: any, index: number) =>
        sectionRenderer( 
          page,
          section,
          index,
          params.lang,
          Google_reCaptcha_Site_key,Signup,
          false,
          "/partner"
        )
      )}
    </>
  );
}
