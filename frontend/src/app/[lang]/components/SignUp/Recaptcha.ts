"use server"
import { NextResponse } from "next/server";
import { getStrapiURL } from "../../utils/api-helpers";
import { fetchAPI } from "../../utils/fetch-api";



export const recatcha = async ({ firstNameVal, lastNameVal, emailVal, updates, uniFormID,DOBval, encrypted ,lang,gReCaptchaToken}: any) => {
    try {
        console.log(firstNameVal, lastNameVal, emailVal, updates, uniFormID,DOBval ,lang,gReCaptchaToken)
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN; 
        if (!token)
          throw new Error("The Strapi API Token environment variable is not set.");
        const path = `/global`;
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const urlParamsObject = {
          populate: "*",
          locale: 'en',
        };
        let global = await fetchAPI(path, urlParamsObject, options);
        const Google_reCaptcha_Secret_key = global.data.attributes.Google_reCaptcha_Secret_key;
        let res: any;
        const formData = `secret=${Google_reCaptcha_Secret_key}&response=${gReCaptchaToken}`;
        try {
          res = await fetch("https://www.google.com/recaptcha/api/siteverify",
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: formData
            }
          );
        } catch (e) {
        }
        if (res && res.data?.success && res.data?.score > 0.5) {
          // Save data to the database from here
          const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;
          const response = await fetch(getStrapiURL() + "/api/sign-up-form-submissions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              data: {
                FirstName: firstNameVal,
                LastName: lastNameVal,
                Email: emailVal,
                ReceiveEmails: updates,
                FormID: uniFormID,
                DOB: DOBval,
                locale: lang,
                //ReCAPTCHA:gRecaptchaToken
              },
            }),
          });
          if (response.ok) {
          } else {
          }
          return NextResponse.json({
            success: true,
            score: res.data?.score,
          });
        } else {
          return NextResponse.json({ success: false, score: 0 }, { status: 200 });
        }
      }
      catch (error) {
        return NextResponse.json({ success: false, score: 0 }, { status: 200 });
      }
    }