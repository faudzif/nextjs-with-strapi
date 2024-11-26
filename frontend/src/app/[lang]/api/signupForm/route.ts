import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getStrapiURL } from "../../utils/api-helpers";
import { fetchAPI } from "../../utils/fetch-api";
import getConfigs from "../../utils/getConfigs";

export async function POST(request: NextRequest, response: NextResponse) {

  const postData = await request.json();
  const { firstName,
    lastName,
    email,
    receiveEmails,
    formID,
    dob,
    locale,
    gRecaptchaToken
  } =
    postData;
  try {
    const decodedCaptcha = Buffer.from(gRecaptchaToken, 'base64').toString('utf-8');
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
    const configs = await getConfigs('en','google_recaptcha_secret_key');
    // const Google_reCaptcha_Secret_key = global.data.attributes.Google_reCaptcha_Secret_key;
    const Google_reCaptcha_Secret_key = configs.data.find((o: { attributes: { Key: string; }; }) => o.attributes.Key === 'google_recaptcha_secret_key').attributes.Value;
    let res: any;
    const formData = `secret=${Google_reCaptcha_Secret_key}&response=${decodedCaptcha}`;
    let firstNameError: boolean = false;
    let lastNameError: boolean = false;
    let emailError: boolean = false;
    let DOBerr: boolean = false;
    const isEmpty = (value: any) => value == null || value?.trim() === '';
    let nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
    const hasScriptingCharacters = (value: any) => /<[^>]*script/i.test(value);
    const isValidEmail = (value: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const dobRegax = (value: any) => /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/.test(value);
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
      if (dob === "") {
        DOBerr = true;
      } else if (!dobRegax(dob)) {
        DOBerr = true;
      }
      else {
        DOBerr = false;
      }
      res = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

    if (res && res.data?.success && res.data?.score > 0.5) {
      // Save data to the database from here
      const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;
      if(!firstNameError && !lastNameError && !emailError && !DOBerr){
        const res1 = await fetch(getStrapiURL() + "/api/sign-up-form-submissions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              FirstName: firstName,
              LastName: lastName,
              Email: email,
              ReceiveEmails: receiveEmails,
              FormID: formID,
              DOB: dob,
              locale: locale,
            },
          }),
        });
        if (res1.ok) {
        } else {
        }
      }else{
        return  NextResponse.json({ success: false, score: 0 , errorMsg:true }, { status: 200 });
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