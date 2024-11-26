import { NextResponse } from "next/server";
import axios from "axios";
import { getStrapiURL } from "../../utils/api-helpers";
import { fetchAPI } from "../../utils/fetch-api";
import getConfigs from "../../utils/getConfigs";

export async function POST(request: Request, response: Response) {
  try {
    const postData = await request.json();
    const { category,
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
      formID,
      locale,
      gRecaptchaToken
    } =
      postData;
      const decodedCaptcha = Buffer.from(gRecaptchaToken, 'base64').toString('utf-8');
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (!token) {
      return NextResponse.json({ success: false, score: 0, msg: "cmToken failed." }, { status: 200 });
    }
    if (decodedCaptcha != null) {
      try {
        const path = `/global`;
        const options = { headers: { Authorization: `Bearer ${token}` } };

        const urlParamsObject = {
          populate: "*",
          locale: 'en',
        };
        let global = await fetchAPI(path, urlParamsObject, options);
        const configs = await getConfigs('en','google_recaptcha_secret_key');
        // const Google_reCaptcha_Secret_key = global.data.attributes.Google_reCaptcha_Secret_key;
        const Google_reCaptcha_Secret_key = configs.data.find((o: { attributes: { Key: string; }; }) => o.attributes.Key === 'google_recaptcha_secret_key').attributes.Value;
        if (Google_reCaptcha_Secret_key !== null) {
          let res: any;
          const formData = `secret=${Google_reCaptcha_Secret_key}&response=${decodedCaptcha}`;
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
          let firstNameError: boolean = false;
          let lastNameError: boolean = false;
          let emailError: boolean = false;
          let DOBerr: boolean = false;
          let cat : boolean = false;
          let msg:boolean = false;
          const isEmpty = (value: any) => value == null || value?.trim() === '';
          let nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
          const hasScriptingCharacters = (value: any) => /<[^>]*script/i.test(value);
          const isValidEmail = (value: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          if(category===''){
            cat=true;
          }else{
            cat=false;
          }
          if (firstName === '') {
            firstNameError = true;
          }
          else if (hasScriptingCharacters(firstName) || !nameRegex.test(firstName)) {
            firstNameError = true;
            if (firstName.trim().length === 0) {
              firstNameError = false
            }
          }
          else {
            firstNameError = false;
          }

          if (lastName === '') {
            lastNameError = true;
          }
          else if (hasScriptingCharacters(lastName) || !nameRegex.test(lastName) || lastName.length > 15) {
            lastNameError = true;
            if (lastName.trim().length === 0) {
              lastNameError = false
            }
          }
          else {
            lastNameError = false;
          }
          // Validate email
          if (isEmpty(email) || hasScriptingCharacters(email)) {
            emailError = true;
          } else if (!isValidEmail(email)) {
            emailError = true;
          } else { emailError = false; }
          if (phoneNumber === "") {
            DOBerr = true;
          }
          else {
            DOBerr = false;
          }
          if(message===""){
            msg = true
          }else{
            msg = false
          }
          if (res && res.data?.success && res.data?.score > 0.5) {
            const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;
            if(!firstNameError && !lastNameError && !emailError && !DOBerr && !msg && !cat){
            const response = await fetch(getStrapiURL() + "/api/contact-us-form-submissions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                data: {
                  Category: category,
                  FirstName: firstName,
                  LastName: lastName,
                  Email: email,
                  PhoneNumber: phoneNumber,
                  Message: message,
                  FormID: formID,
                  locale: locale,
                },
              }),
            });
            if (response.ok) {
              return NextResponse.json({
                success: true,
                score: res.data?.score,
              });
            } else {
              return NextResponse.json({ success: false, score: 0, msg: "failed to save." }, { status: 200 });
            }
          }else{
              return  NextResponse.json({ success: false, score: 0 , errorMsg:true }, { status: 200 });
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