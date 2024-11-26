import type { Metadata } from "next";
import "./assets/styles/style.scss";
import { headers } from "next/headers";
import { fetchAPI } from "./utils/fetch-api";
import Script from "next/script";
import { i18n } from "../../../i18n-config";
import Footer from "./components/Footer";
import Navbar, { TimeProvider } from "./components/Navbar/Navbar";
import { FALLBACK_SEO } from "./utils/constants";
import CookieBanner from "./components/CookieBanner/CookieBanner";
import { getPageBySlug } from "./utils/get-page-by-slug";
import { Suspense } from "react";
import { ThemeProvider } from "./utils/context/ThemeContext";

export async function getGlobal(lang: string): Promise<any> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (!token)
      throw new Error("The Strapi API Token environment variable is not set.");

    const path = `/global`;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const urlParamsObject = {
      populate: [
        "metadata.shareImage",
        "favicon",
        "notificationBanner.link",
        "navbar.links",
        "navbar.navbarLogo.logoImg",
        "footer.footerLogo.logoImg",
        "footer.menuLinks",
        "footer.legalLinks",
        "footer.socialLinks",
        "footer.categories",
        "cookieBanner",
        "sitemap",
        "forntendUrl",
      ],
      locale: lang,
    };
    return await fetchAPI(path, urlParamsObject, options);
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function getConfigs(lang: string, key: string): Promise<any> {
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

let page: any;
export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  try {
    const pageData = await getPageBySlug("home", params.lang);
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
            alt: "Og Image Alt",
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
      },
    };
  } catch (error: any) {
    console.error(error.message);
    return FALLBACK_SEO;
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  try {
    const langURL = headers().get("x-url");
    let lang: string = "";
    if (langURL !== null) lang = langURL.split("/")[3];
    const nonce: any = headers().get("x-nonce");
    const global = await getGlobal(params.lang);
    const configs = await getConfigs(params.lang, 'google_recaptcha_site_key');
    // TODO: CREATE A CUSTOM ERROR PAGE
    if (!global.data) return null;
    if (!configs.data) return null;

    const {
      navbar,
      footer,
      cookieBanner,
      daytimeStart_am,
      daytimeEnd_pm,
      location,
      amusementParkSchema,
      organizationSchema,
      // Google_reCaptcha_Site_key,
      // Google_reCaptcha_Secret_key,
      Signup,
    } = global.data.attributes;

    const Google_reCaptcha_Site_key = configs.data.find((o: { attributes: { Key: string; }; }) => o.attributes.Key === 'google_recaptcha_site_key').attributes.Value;
    return (
      <>
        <html lang={params.lang} dir={params.lang == "en" ? "ltr" : "rtl"}>
          <head>
            {/* Google Tag Manager */}
            <Script
              id="gtm"
              strategy="afterInteractive"
              defer={false}
              dangerouslySetInnerHTML={{
                __html: `(function(w, d, s, l, i) {
          w[l] = w[l] || []
          w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" })
          const f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : ""
          j.async = true
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl
          f.parentNode.insertBefore(j, f)
        })(window,document,'script','dataLayer','${navbar?.GTM?.at(0)?.gtmCode
                  }')`,
              }}
              nonce={nonce}
            />
            {organizationSchema && (
              <Script
                id="organizationSchema"
                strategy="afterInteractive"
                type="application/ld+json"
                defer={false}
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(organizationSchema),
                }}
              />
            )}

            {amusementParkSchema && (
              <Script
                id="amusementParkSchema"
                type="application/ld+json"
                strategy="afterInteractive"
                defer={false}
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(amusementParkSchema),
                }}
              ></Script>
            )}
            <Script
              id="imageObjectSchema"
              type="application/ld+json"
              strategy="afterInteractive"
              defer={false}
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ImageObject",
                  "url": "https://storage.googleapis.com/qiddiya-sixflags-uat-media-bucket/SFQ_Day_Hero_fda57bdfb1/SFQ_Day_Hero_fda57bdfb1.jpg",
                  "contentUrl": "https://storage.googleapis.com/qiddiya-sixflags-uat-media-bucket/SFQ_Day_Hero_fda57bdfb1/SFQ_Day_Hero_fda57bdfb1.jpg",
                  "width": "4216",
                  "height": "2370",
                  "caption": "Six Flags Qiddiya City Theme Park"
                }
                ),
              }}
            ></Script>
            {/* End Google Tag Manager */}
            
          </head>
          <link
            rel="icon"
            href={global.data.attributes.favicon.data.attributes.url}
          />
          <body className="custom-scrollbar">
            <Suspense fallback={<></>}>
              <TimeProvider>
                <ThemeProvider>
                  <Navbar
                    currentlanguge={params.lang}
                    data={navbar}
                    Google_reCaptcha_Site_key={Google_reCaptcha_Site_key}
                    // Google_reCaptcha_Secret_key={Google_reCaptcha_Secret_key}
                    daytimeStart_am={daytimeStart_am}
                    daytimeEnd_pm={daytimeEnd_pm}
                    location={location}
                    Signup={Signup}
                  />
                </ThemeProvider>
              </TimeProvider>
              <CookieBanner
                cookieExpiration={cookieBanner.cookieExpiration}
                cookieTitle={cookieBanner.cookieTitle}
                cookieText={cookieBanner.cookieText}
                cta_text={cookieBanner.cta_text}
              />
              <ThemeProvider>
                <main>{children}</main>
              </ThemeProvider>
              {children && (
                <Footer
                  menuLinks={footer.menuLinks}
                  legalLinks={footer.legalLinks}
                  socialLinks={footer.socialLinks}
                  CopyRight={footer.CopyRight}
                  Class={footer.Class}
                  firstFooterLogo={footer.firstFooterLogo}
                  firstFooterLogoLink={footer.firstFooterLogoLink}
                  secondFooterLogo={footer.secondFooterLogo}
                  secondFooterLogoLink={footer.secondFooterLogoLink}
                  currentlanguge={params.lang}
                />
              )}
              {/* <Script src="https://d30b1rrhayreyb.cloudfront.net/load-genstack.js"></Script> */}
              <Script src="/load-genstack.js"></Script>
              <div id="backdrop-root"></div>
              <div id="overlay-root"></div>           
            </Suspense>
          </body>
        </html>
      </>
    );
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function generateStaticParams() {
  try {
    return i18n.locales.map((locale) => ({ lang: locale }));
  } catch (error: any) {
    console.error(error.message);
  }
}
