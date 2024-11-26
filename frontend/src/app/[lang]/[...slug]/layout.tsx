import { headers } from "next/headers";
import { FALLBACK_SEO } from "../utils/constants";
import { getPageBySlug } from "../utils/get-page-by-slug";
import getPage from "../utils/getPage";
import getGlobal from "../utils/getGlobal";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { lang: string ,slug:string };
}): Promise<Metadata> {
  const pageData = await getPageBySlug(params.slug, params.lang);
  if (!pageData?.data?.at(0)?.attributes?.seo) return FALLBACK_SEO;
  const metadata = pageData.data[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    alternates: {
      canonical: `${pageData.data[0].attributes.frontendUrl}`,
    },
    openGraph: {
      title: metadata.OG_Title,
      description: metadata.OG_Description,
      images: [
        {
          url: metadata?.OG_Image?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: 'Og Image Alt',
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    }
  };
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const global = await getGlobal(params.lang);
  const slug = headers().get("Referer");

  let split: any = slug?.split("/").at(4);

  if (split === undefined || split === null) {
    split = "home";
  }
  const page1 = await getPage(params.lang, split);
  let signupFlag = true;
  page1.data.map((items: any) => {
    signupFlag = items.attributes.isSignup;
  });
  let page: any;
  page = await getPageBySlug(params.slug, params.lang);
  if (!page || page.data === null || page.data.length === 0)
    page = await getPageBySlug("error", params.lang);
  

  if (!page?.data?.at(0)?.attributes?.seo) return FALLBACK_SEO;
  const { seo, pageType } = page.data.at(0).attributes;
  return (
    <>
      {children}
      {signupFlag}
    </>
  );
}
