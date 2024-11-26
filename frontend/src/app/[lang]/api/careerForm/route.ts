import { NextResponse } from "next/server";
import { getStrapiURL } from "../../utils/api-helpers";
import { fetchAPI } from "../../utils/fetch-api";
import axios from "axios";
import getConfigs from "../../utils/getConfigs";


export async function POST(request: Request, response: Response) {
  try {
    const formDataFlag = await request.formData();
    const headers = await request.headers;
    const gRecaptchaToken = headers.get('captchaToken');
    const file: any = formDataFlag.get('file');
    //console.log(file.name);
    let formDataToSend = new FormData();
    formDataToSend.append('files', file, file?.name);
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (!token) {
      return NextResponse.json({ success: false, score: 0, msg: "cmToken failed." }, { status: 200 });
    }
    if (gRecaptchaToken != null) {
      try {
        const path = `/global`;
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const urlParamsObject = {
          populate: "*",
          locale: 'en',
        };
        let global = await fetchAPI(path, urlParamsObject, options);


        const configs = await getConfigs('en', 'google_recaptcha_secret_key');
        // const Google_reCaptcha_Secret_key = global.data.attributes.Google_reCaptcha_Secret_key;
        const Google_reCaptcha_Secret_key = configs.data.find((o: { attributes: { Key: string; }; }) => o.attributes.Key === 'google_recaptcha_secret_key').attributes.Value;
        //console.log(Google_reCaptcha_Secret_key,"Google_reCaptcha_Secret_key")
        if (Google_reCaptcha_Secret_key !== null) {
          let res: any;
          const formData = `secret=${Google_reCaptcha_Secret_key}&response=${gRecaptchaToken}`;
          try {
            res = await axios.post(
              "https://www.google.com/recaptcha/api/siteverify",
              formData,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );
          } catch (e) {
            return NextResponse.json({ success: false, score: 0, msg: "captcha verification request error." }, { status: 200 });
          }
          if (res && res.data?.success && res.data?.score > 0.5) {
            // Save data to the database from here
            const token1 = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;
            //   const req = await fetch(getStrapiURL() + "/api/upload", {
            //     headers: {
            //       Authorization: `Bearer ${token1}`,
            //     },
            //     method: "POST",
            //     body: formDataToSend,
            //   })
            // const dataResponse = await req.json();
            const response = await fetch(getStrapiURL() + "/api/careers-form-submissions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token1}`,
              },
              body: JSON.stringify({
                data: {
                  Category: formDataFlag.get('category'),
                  FirstName: formDataFlag.get('firstName'),
                  LastName: formDataFlag.get('lastName'),
                  Email: formDataFlag.get('emailAddress'),
                  PhoneNumber: formDataFlag.get('phoneNumber'),
                  Message: formDataFlag.get('message'),
                  FormID: formDataFlag.get('FormID'),
                  locale: formDataFlag.get('lang'),
                  //ReCAPTCHA: formDataFlag.get('recaptcha'),
                  Filename: file.name
                },
              }),
            });
            if (response.ok) {
              return NextResponse.json({
                success: true,
                score: res.data?.score,
              });
            }
            else {
              //console.error("Form submission failed:", response.status, await response.text());
              return NextResponse.json({ success: false, score: 0, msg: "failed to save." }, { status: 200 });
            }
          } else {
            //console.log("fail: res.data?.score:", res.data?.score);
            return NextResponse.json({ success: false, score: 0, msg: "captcha verification failed." }, { status: 200 });
          }
        }
        else {
          return NextResponse.json({ success: false, score: 0, msg: "captcha key failed." }, { status: 200 });
        }
      } catch (e) {
        return NextResponse.json({ success: false, score: 0, msg: "global request failed." }, { status: 200 });
      }
    }
    else {
      return NextResponse.json({ success: false, score: 0, msg: "captcha token failed." }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, score: 0 }, { status: 200 });
  }
}