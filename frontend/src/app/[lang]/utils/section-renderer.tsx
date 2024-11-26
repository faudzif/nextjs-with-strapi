import dynamic from "next/dynamic";
import LeaderShip from "../components/LeaderShip/LeaderShip";
import Hero from "../components/Hero/Hero";
import LatestNews from "../components/LatestNews/LatestNews";
import Typography from "../components/Typography/Typography";
import RTE from "../components/RTE/RTE";
import ContactUsForm from "../components/contactUsForm/ContactUsForm";
import RTEnews from "../components/RTE/RTEnews";
import Career from "../components/CareerForm/CareerForm";
import GoogleCaptchaWrapper from "../google-captcha-wrapper";

export function sectionRenderer(
  page: any,
  section: any,
  index: number,
  lang: string,
  Google_reCaptcha_Site_key: string,
  Signup: any,
  isError = false,
  landingPageLink: string
) {
  switch (section.__component) {
    
    case "sections.hero":
      return (
        <>
          <Hero
            key={index}
            data={section}
            lang={lang}
            Google_reCaptcha_Site_key={Google_reCaptcha_Site_key}
            Signup={Signup}
          />
        </>
      );
    case "sections.latest-news":
      return (
        <>
          <LatestNews key={index} data={section} lang={lang} />
        </>
      );
    case "elements.typo":
      return (
        <>
          <Typography key={index} data={section} />
        </>
      );
    case "sections.leader-ship":
      return (
        <>
          <LeaderShip key={index} data={section} />
        </>
      );
    case "sections.rich-text":
      return (
        <>
          <RTE key={index} data={section} />
        </>
      );
    case "sections.contact-us-form":
      return (
        <>
          <GoogleCaptchaWrapper
            Google_reCaptcha_Site_key={Google_reCaptcha_Site_key}
          >
            <ContactUsForm key={index} data={section} lang={lang} />
          </GoogleCaptchaWrapper>
        </>
      );
    case "sections.careers-form":
      return (
        <>
          <GoogleCaptchaWrapper
            Google_reCaptcha_Site_key={Google_reCaptcha_Site_key}
          >
            <Career key={index} data={section} lang={lang} />
          </GoogleCaptchaWrapper>
        </>
      );
    default:
      return null;
  }
}
