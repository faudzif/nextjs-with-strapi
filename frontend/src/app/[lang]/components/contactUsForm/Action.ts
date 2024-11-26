"use server"
import { revalidatePath } from "next/cache";
import { getStrapiURL } from "../../utils/api-helpers";
export const createTodo = async ({ 
    cat,
    fstnme,
    lstname,
    mail,
    num,
    msg,
    uniFormID,
    encrypted,
    lang,
    captchaValue
  }: any) => {
  try {
    console.log(captchaValue,"recap")
      // const { recaptchaResponse } = req.body;
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaValue}`,
      );
      const data = await response.json()
    const AesEncryption = require('aes-encryption')
    const aes = new AesEncryption()
    aes.setSecretKey(process.env.NEXT_PUBLIC_KEY)
    const decrypted = aes.decrypt(encrypted)
    let splittedToken = decrypted.split('|');
    if(splittedToken[0]===process.env.NEXT_PUBLIC_PlainText){
      const d = new Date()
      const tokenTime = new Date(parseInt(splittedToken[1]));
      const date = tokenTime.getDate()
      const time = tokenTime.getMinutes()
      if(date ===d.getDate()&& time < time+10 && data.success){
        const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;
         const res = await fetch(getStrapiURL() + "/api/contact-us-form-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          Category:cat,
          FirstName: fstnme,
          LastName: lstname,
          Email: mail,
          PhoneNumber: num,
          Message:  msg,
          FormID: uniFormID,
          locale:lang,
          ReCAPTCHA:captchaValue
        },
      }),
    });
    alert("recaptchaResponse passed")
        if (res.ok) {
          // Handle success, if needed
          console.log("Form submission successful");
        } else {
          return 
          console.error("Form submission failed:", res.status, await res.text());
        }
      }
      
      }
      else{
        console.log("recaptchaResponse failed")
        alert("Failed")
        return
      }
      
    }
    
  // }

  // }


  catch (error) {
    // Handle any other errors
    //console.error("Server error:", error);
    return "server error";
  }
}

function getTime(): string | number | Date {
  throw new Error("Function not implemented.");
}

