"use server"
import { getStrapiURL } from "../../utils/api-helpers";
let firstNameError : boolean = false;
let lastNameError :boolean = false;
let DOBerr :boolean = false;
let emailError :boolean = false;
let tcError : boolean =false;
let tcError1 : boolean = false;
export const createTodo = async ({ firstNameVal, lastNameVal, emailVal, updates, uniFormID,DOBval, encrypted ,lang}: any) => {
  const hasScriptingCharacters = (value: any) => /<[^>]*script/i.test(value);
  const isValidEmail = (value: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const dobRegax = (value: any) => /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/.test(value);
  function ValidateSignUp() {
    const isEmpty = (value: any) => value == null || value?.trim() === '';
    let nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
    const regex = /(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-([12]\d{3})/; // DD MM YY pattern
    if (firstNameVal==='') {
      firstNameError = true;
    } 
    else if (hasScriptingCharacters(firstNameVal) || !nameRegex.test(firstNameVal) ) {
      firstNameError = true;
      if (firstNameVal.trim().length === 0) {
        firstNameError = false
      }
    }
    else {
      firstNameError = false;
    }
    if (lastNameVal==='') {
      lastNameError = true;
    }
    else if (hasScriptingCharacters(lastNameVal) || !nameRegex.test(lastNameVal) || lastNameVal.length > 15) {
      lastNameError = true;
      if (lastNameVal.trim().length === 0) {
        lastNameError = false
      }
    }
    else {
      lastNameError = false;
    }
    if(DOBval===''){
      DOBerr = true;
    }
    else{
      DOBerr = false;
    }
    if (regex.test(DOBval)) {
      DOBerr = false;
    } else {
      DOBerr = true;
    }
    // Validate email
    if (isEmpty(emailVal) || hasScriptingCharacters(emailVal)) {
      emailError = true;
    } else if (!isValidEmail(emailVal)) {
      emailError = true;
    } else { emailError = false; }
    if(DOBval===""){
      DOBerr = true;
    }else if (!dobRegax(DOBval)){
      DOBerr = true;
    }
    else{
      DOBerr = false;
    }
    if (!updates) {
      tcError1 = true;
    } else { tcError1 = false;}
    return !firstNameError && !lastNameError && !emailError && !DOBerr  && updates;
  }
  try {
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
      if(date ===d.getDate()&& time < time+10 && ValidateSignUp()){
        const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;
        const res = await fetch(
          getStrapiURL() + "/api/sign-up-form-submissions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              locale : lang
            },
    
            body: JSON.stringify({
              data: {
                FirstName: firstNameVal,
                LastName: lastNameVal,
                Email: emailVal,
                ReceiveEmails: updates,
                FormID: uniFormID,
                DOB : DOBval,
                locale: lang
              }
            }),
          }
        );
        if (res.ok) {
          console.log("Form submission successful");
        } else {

          console.error("Form submission failed:", res.status, await res.text());
        }
        console.log("Form submited")
      }else{
        console.log("the input is not valid on server")
      }
      
      }
      else{

      }
      
    }
  catch (error) {
    // Handle any other errors
    console.error("Server error:", error);
    return "server error";
  }
}

function getTime(): string | number | Date {
  throw new Error("Function not implemented.");
}

