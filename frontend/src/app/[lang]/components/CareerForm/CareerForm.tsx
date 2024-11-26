"use client";
import { useState,ChangeEvent, useEffect, SetStateAction, useRef } from "react";
import Image from "next/image";
import Heading from "../../atoms/Heading/Heading";
import SignupBtn from "../../atoms/SignupBtn/SignupBtn";
import { getStrapiURL, pushDataLayer } from "../../utils/api-helpers";
import ModalTerms from "../Modal/ModalTerms";
import { IMask, useIMask } from "react-imask";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { NextResponse } from "next/server";

interface contactusform {
  category: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  code: string;
  phoneNumber: string;
  files:any;
  message: string;
  classes?: string;
  recaptcha:string;
  lang:string;
}
let emptybool : boolean = false;
let emptyError : string = "";
let typebool : boolean = false;
let typeError : string = "";
let sizebool : boolean = false;
let sizeError : string = "";
interface Interest {
  text: string;
}
interface Modal {
  title: string;
  desc: string;
  cta_text: string;
  cta_Link: string;
}
interface ContactUs {
  isCareer?:boolean;
  overline: string;
  formTitle: string;
  Select_category: string;
  interestLblFirstHalf: string;
  interestError: string;
  interest: Interest[];
  policyPreText: string;
  policyMidText: string;
  policyPostText: string;
  submitText: string;
  firstNameLable: string;
  firstNameError: string;
  lastNameLable: string;
  lastNameError: string;
  phoneNumberLable: string;
  phoneNumberError: string;
  messageLable: string;
  messageError: string;
  emailLable: string;
  emailError: string;
  generalError: string;
  thankyouText: string;
  code: string;
  modal: Modal;
  url: string;
  Class: string;
  CVplaceholder:string;
  CVhelptxt:string;
  CVextensionError:string;
  CVemptyError:string;
  CVsizeError:string;
}
let filer : any;
interface ContactUsProps {
  data: ContactUs;
  lang:string;

}
let cat : boolean = false;
let fname : boolean = false;
let lname :boolean = false;
let email : boolean = false;
let phone : boolean = false;
let msg : boolean = false;
let file : boolean = false;
let msgEmptyBool: boolean = false;
let invalidMsg : boolean= false;

  const Career = ({ data, lang }: ContactUsProps) => { 
  const initialTextCategory = data.Select_category ?? "select a category ";

  const [phoneFocus, setPhoneFocus] = useState(false);
  const [phoneLabel, setPhoneLabel] = useState("");

  const contactUsRef = useRef<any>(null);

  const [allValuesValidation, setAllValuesValidation] = useState({
    category: false,
    fName: false,
    lName: false,
    code: false,
    phone: false,
    message: false,
    filing:false,
    email: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(true);
  const [dropdownSelected, setDropdownSelected] = useState(false);
  const [validation, setValidation] = useState({
    firstName: "",
    firstNameClass:"",
    lastName: "",
    lastNameClass:"",
    emailAddress: "",
    emailAddressClass:"",
    phoneNumber: "",
    phoneNumberClass:"",
    message: "",
    messageClass:"",
    cv:"",
    category: "",
    code: "",
  });

  const [files, setFile] = useState<File>();
  const [formData, setFormData] = useState<contactusform>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    message: "",
    files : "",
    category: initialTextCategory,
    code: data.code || "+966",
    recaptcha:"",
    lang:"",
  });
  
  const [showOverlay, setShowOverlay] = useState(false);
  const [overline] = useState(data.overline);
  const [formTitle] = useState(data.formTitle);
  const [interestLable] = useState(data.interestLblFirstHalf);
  const [interestError] = useState(
    data.interestError
  );
  const [firstNameLable] = useState(data.firstNameLable);
  const [firstNameError] = useState(
    data.firstNameError
  );
  const [lastNameLable] = useState(data.lastNameLable);
  const [lastNameError] = useState(
    data.lastNameError
  );
  const [emailLable] = useState(data.emailLable);
  const [emailError] = useState(
    data.emailError
  );
  const [phoneNumberLable] = useState(data.phoneNumberLable);
  const [phoneNumberError] = useState(
    data.phoneNumberError
  );
  const [phoneCode] = useState(data.code);
  const [messageLable] = useState(data.messageLable);
  const [messageError] = useState(
    data.messageError
  );
  const [policyPreText] = useState(
    data.policyPreText
  );
  const [policyMidText] = useState(
    data.policyMidText
  );
  const [policyPostText] = useState(
    data.policyPostText
  );
  const [generalError, setGeneralError] = useState(
    data.generalError
  );
  const [thankyouText] = useState(
    data.thankyouText
  );

  const handleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  function getCharFrequency(str: any) {
    let frequency: any = {};

    // Loop through each character in the string
    for (let char of str) {
      // If the character is already in the frequency object, increment its count
      // Otherwise, initialize its count to 1
      frequency[char] = (frequency[char] || 0) + 1;
    }

    return frequency;
  }

  const [messageLength, setMessageLength] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const phoneRef = useRef<any>(null);
  // const isEmpty = (value: any) => value == null || value?.trim() === '';
  const handleCVUpload = (event: any) => {
    filer = event.target.files[0];
    //formData.files=event.target.files[0];
    setFile(event.target.files?.[0])
    if (filer) {
      if (!['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(filer.type)) {
        typebool = true;
        emptybool = false;
        sizebool = false;
        typeError = data.CVextensionError;
        setAllValuesValidation((prevData) => ({ ...prevData, filing: true }));
        setValidation((prevData) => ({ ...prevData, cv: "border-red" }));
      } else if (filer.size > 100 * 1024 * 1024 ) { // 100MB limit
        sizebool = true;
        emptybool = false;
        typebool = false
        sizeError = data.CVsizeError;
        setAllValuesValidation((prevData) => ({ ...prevData, filing: true }));
        setValidation((prevData) => ({ ...prevData, cv: "border-red" }));
      }
      else{
        setSelectedName(filer.name);
        setSelectedFile(filer);
        sizebool = false;
        typebool = false;
        setAllValuesValidation((prevData) => ({ ...prevData, filing: false }));
        setValidation((prevData) => ({ ...prevData, cv: "" }));
      }
  };
  
  }
  const handleCVDelete = () => {
    setSelectedFile(null);
    setSelectedName("");
    filer = ''
    setAllValuesValidation((prevData) => ({ ...prevData, filing: false }));
        setValidation((prevData) => ({ ...prevData, cv: "" }));
  };
  function checkValidation(){
    if (formData.category.trim() === initialTextCategory.trim()) {
      cat = true;
      setIsFormValid(true);
      setAllValuesValidation((prevData) => ({ ...prevData, category: false }));
      setValidation((prevData) => ({
        ...prevData,
        category: "border-red",
      }));
    } else {
      cat = false;
      setValidation((prevData) => ({ ...prevData, category: "" }));
      setAllValuesValidation((prevData) => ({ ...prevData, category: true }));
    }
    let nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
    if (formData.firstName.trim().length === 0) {
      fname = true
      setAllValuesValidation((prevData) => ({ ...prevData, fName: false }));
      setIsFormValid(true);
      setValidation((prevData) => ({
        ...prevData,
        firstName: "border-red",
        firstNameClass:"error-color-red",
      }));
    }
    else if (!nameRegex.test(formData.firstName.trim())) {
      fname = true;
      setAllValuesValidation((prevData) => ({ ...prevData, fName: false }));
      setIsFormValid(true);
      setValidation((prevData) => ({
        ...prevData,
        firstName: "border-red",
        firstNameClass:"error-color-red",
      }));
    }
    else {
      fname = false;
      setAllValuesValidation((prevData) => ({ ...prevData, fName: true }));
      setValidation((prevData) => ({ ...prevData, firstName: "" }));
    }
    if (formData.lastName.trim().length === 0) {
      lname = true;
      setAllValuesValidation((prevData) => ({ ...prevData, lName: false }));
      setIsFormValid(true);
      setValidation((prevData) => ({
        ...prevData,
        lastName: "border-red",
        lastNameClass: "error-color-red"
      }));
    }
    else if (!nameRegex.test(formData.lastName.trim())) {
      lname = true;
      setAllValuesValidation((prevData) => ({ ...prevData, lName: false }));
      setIsFormValid(true);
      setValidation((prevData) => ({
        ...prevData,
        lastName: "border-red",
        lastNameClass: "error-color-red"
      }));
    } else {
      lname = false;
      setAllValuesValidation((prevData) => ({ ...prevData, lName: true }));
      setValidation((prevData) => ({ ...prevData, lastName: "" }));
    }
    if (formData.emailAddress.trim().length === 0) {
      email = true
      setAllValuesValidation((prevData) => ({ ...prevData, email: false }));
      setIsFormValid(true);
      setValidation((prevData) => ({
        ...prevData,
        emailAddress: "border-red",
        emailAddressClass:"error-color-red"
      }));
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const emailTest = emailRegex.test(formData.emailAddress);
      if (emailTest) {
        email = false
        setAllValuesValidation((prevData) => ({ ...prevData, email: true }));
        setValidation((prevData) => ({ ...prevData, emailAddress: "" }));
      } else {
        email = true
        setAllValuesValidation((prevData) => ({ ...prevData, email: false }));
        setIsFormValid(true);
        setValidation((prevData) => ({
          ...prevData,
          emailAddress: "border-red",
          emailAddressClass:"error-color-red"
        }));
      }
    }
    let msgRegax = /^[\$\u0600-\u06FFa-zA-Z0-9\s""'@,.!?_-]+$/;
    if (formData.message.trim().length === 0) {
      msgEmptyBool= true;
      invalidMsg=false;
      setAllValuesValidation((prevData) => ({ ...prevData, message: false }));
      setValidation((prevData) => ({
        ...prevData,
        message: "border-red",
        messageClass:"error-color-red"
      }));
      setIsFormValid(true);
    } else if(!msgRegax.test(formData.message.trim())){
      msgEmptyBool= false;
      invalidMsg=true;
      setAllValuesValidation((prevData) => ({ ...prevData, message: false }));
      setValidation((prevData) => ({
        ...prevData,
        message: "border-red",
        messageClass:"error-color-red"
      }));
    }
    else {
      msgEmptyBool= false;
      invalidMsg=false;
      setAllValuesValidation((prevData) => ({ ...prevData, message: true }));
      setValidation((prevData) => ({ ...prevData, message: "" }));
    }

    if (formData.phoneNumber.trim().length < 7) {
      phone = true;
      setAllValuesValidation((prevData) => ({ ...prevData, phone: false }));
      setValidation((prevData) => ({
        ...prevData,
        phoneNumber: "border-red",
        phoneNumberClass:"error-color-red"
      }));
      setIsFormValid(true);
    } else {
      phone = false
      setAllValuesValidation((prevData) => ({ ...prevData, phone: true }));
      setValidation((prevData) => ({ ...prevData, phoneNumber: "" }));
    }
    if (formData.code.trim().length === 0 || formData.code.trim().length <= 2) {
      setAllValuesValidation((prevData) => ({ ...prevData, code: false }));
      setValidation((prevData) => ({
        ...prevData,
        code: "border-red error-color-red",
      }));
      setIsFormValid(true);
    } else {
      setAllValuesValidation((prevData) => ({ ...prevData, code: true }));
      setValidation((prevData) => ({ ...prevData, code: "" }));
    }
    if(!filer){
      emptyError = data.CVemptyError;
      file = true;
      sizebool = false;
      typebool = false;
      emptybool = true;
      setIsFormValid(true);
      setAllValuesValidation((prevData) => ({ ...prevData, filing: false }));
      setValidation((prevData) => ({
        ...prevData,
        cv: "border-red",
      }));
    }else if (!['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(filer.type)) {
      typebool = true;
      file = true;
      emptybool = false;
      sizebool = false;
      typeError = data.CVextensionError;
      setAllValuesValidation((prevData) => ({ ...prevData, filing: false }));
      setValidation((prevData) => ({ ...prevData, cv: "border-red" }));
    } else if (filer.size >100* 1024 * 1024 ) { // 100MB limit
      sizebool = true;
      file = true;
      emptybool = false;
      typebool = false
      sizeError = data.CVsizeError;
      setAllValuesValidation((prevData) => ({ ...prevData, filing: false }));
      setValidation((prevData) => ({ ...prevData, cv: "border-red" }));
    }
    
    else {
      file = false;
      setValidation((prevData) => ({ ...prevData, cv: "" }));
      setAllValuesValidation((prevData) => ({ ...prevData, filing: true }));
    }
    return !fname && !lname && !email && !phone && !invalidMsg && !msgEmptyBool && !cat && !file;
  }
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;
    if (name === "firstName") {
      if (nameRegex.test(e.target.value.trim())) {
        setAllValuesValidation((prevData) => ({ ...prevData, fName: true }));
        setValidation((prevData) => ({ ...prevData, firstName: "" }));
      }
    }
    if (name === "lastName") {
      if (nameRegex.test(e.target.value.trim())) {
        setAllValuesValidation((prevData) => ({ ...prevData, lName: true }));
        setValidation((prevData) => ({ ...prevData, lastName: "" }));
      }
    }
    if (name === "emailAddress") {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const emailTest = emailRegex.test(e.target.value);
      if (emailTest) {
        setAllValuesValidation((prevData) => ({ ...prevData, email: true }));
        setValidation((prevData) => ({ ...prevData, emailAddress: "" }));
      }
    }

  if (name === "phoneNumber") {
      if (e.target.value.trim().length >= 7 && e.target.value.replace(/\D/g, "")) {
        setAllValuesValidation((prevData) => ({ ...prevData, phone: true }));
        setValidation((prevData) => ({ ...prevData, phoneNumber: "" }));
      }
      const result = e.target.value.replace(/\D/g, "");
      setFormData((prevData) => ({ ...prevData, [name]: result }));
      if (phoneRef.current.value !== "") {
        setPhoneLabel(phoneFieldActiveText);
      }
      
    }
    if (name === "code") {
      let regex = /^\+[^+]*$/;
      if (e.target.value.length === 0 || e.target.value.length <= 2) {
        setAllValuesValidation((prevData) => ({ ...prevData, code: true }));
        setValidation((prevData) => ({ ...prevData, code: "" }));
      }
      let result = e.target.value.replace(/[^\d+]/g, "");
      result = result.replace(/00/g, "+");
      const temp = result.replace(/\+/g, "");
      if (temp.length < 5 && result.includes('')) {
        if (getCharFrequency(result)["+"] < 2) {
          setFormData((prevData) => ({ ...prevData, [name]: result }));
        }
      }
      return;
    }

    if (name === "message") {
      if (e.target.value.trim().length != 0) {
        setAllValuesValidation((prevData) => ({ ...prevData, message: true }));
        setValidation((prevData) => ({ ...prevData, message: "" }));
      }

    }
    
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
  
  const overlayOpenHandler = () => {
    setShowOverlay(true);
    document.body.classList?.add(`no-scroll`);
    document.documentElement.classList?.add(`no-scroll`);
  };

  const overlayCloseHandler = () => {
    setShowOverlay(false);
    document.body.classList?.remove(`no-scroll`);
    document.documentElement.classList?.remove(`no-scroll`);
  };

  const handleChangeSelect = (category: string) => {
    // Update form data with the selected category
    if (category.trim() != initialTextCategory.trim()) {
    //   setAllValuesValidation((prevData) => ({ ...prevData, category: false }));
    //   setValidation((prevData) => ({
    //     ...prevData,
    //     category: "border-red",
    //   }));
    // } else {
      setValidation((prevData) => ({ ...prevData, category: "" }));
      setAllValuesValidation((prevData) => ({ ...prevData, category: true }));
    }
      // setValidation((prevData) => ({ ...prevData, category: "" }));
      setAllValuesValidation((prevData) => ({ ...prevData, category: true }));

    setFormData((prevData) => ({ ...prevData, category: category }));

    setDropdownSelected(true);
    setDropdownOpen(false);

    // Get all the options in the select dropdown
    const options = document.querySelectorAll(
      ".contactusform__select-option-list .contactusform__select-option-text"
    );
    // Loop through each option and add/remove the 'active' class based on the selected category
    options.forEach((option) => {
      const optionCategory = option.getAttribute("data-value");
      if (optionCategory === category) {
        option.classList?.add("active"); // Add 'active' class to the selected option
      } else {
        option.classList?.remove("active"); // Remove 'active' class from other options
      }
    });
  };
  const scrollIntoViewHandler = () => {
    setTimeout(function () {
      const target: any = document.querySelector(".contactusform");
      const elemOffsetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: elemOffsetTop - 80,
        behavior: "smooth",
      });
    }, 200);
  };
  let recaptcha:string = ""
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleSubmit = async (
    e: 
    | React.ChangeEvent<HTMLFormElement> 
    | React.FormEvent<HTMLFormElement> 
    ) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");
      return;
    }
    executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
      formData.recaptcha = gReCaptchaToken
    if (checkValidation()) {
      setIsFormSubmitted(false);
      SaveMessage(gReCaptchaToken);
      scrollIntoViewHandler()
      if (data.submitText) {
        pushDataLayer({
          event: 'eventTracker',
          custom_event_name: 'form_submit',
          form_name: 'contact us',
          click_text: data.submitText.toLowerCase(),
          eventCallback: function () {
            window.dataLayer.push({
              form_name: undefined,
              click_text: undefined
            })
          }
        });
      }
      
    }
  });
  
  };

  const phoneFieldActiveText = phoneNumberLable;
  const phoneFieldDeactiveText = "5XXXXXXXX*";

  useEffect(() => {
    setPhoneLabel(phoneFocus ? phoneFieldActiveText : phoneFieldDeactiveText);
  }, [phoneFocus]);

  const imaskOptions: any = {
    mask: "00 000 0000",
    lazy: true,
    placeholderChar: "0",
  };
  async function SaveMessage(gReCaptchaToken : string) {
    async function goAsync() {
      const uniFormID = generateUniqueFormId();
      const formData1 = new FormData();
      formData1.append("file", filer,filer.name);
      formData1.append('firstName', formData.firstName);
      formData1.append('lastName', formData.lastName);
      formData1.append('message', formData.message);
      formData1.append('phoneNumber', formData.phoneNumber);
      formData1.append('emailAddress', formData.emailAddress);
      formData1.append('category', formData.category);
      //formData1.append('recaptcha', formData.recaptcha);
      formData1.append('lang', lang);
      formData1.append('FormID', uniFormID);
      formData1.append('Filename', filer.name);

      try{
        const response = await fetch("/api/careerForm", {
          method:"post",
          body: formData1,
          headers: {
            Accept: "text/plain, */*",
            "captchaToken": gReCaptchaToken
          },
        });
        return response;
      }catch(error:any)
      {
        return NextResponse.json({ success: false, score: 0, msg: "failed to send data in server." }, { status: 200 });
      }

    }
      goAsync().then(() => {});
    }
  const { ref } = useIMask(imaskOptions, {
    onAccept: (value, mask) => {
    },
  });
  function classchangeFname (){
    setValidation((prevData) => ({
      ...prevData,
      firstNameClass: "",
    }));
   }
   function classchangeLname (){
    setValidation((prevData) => ({
      ...prevData,
      lastNameClass:""
    }));
   }
   function classchangeEmail (){
    setValidation((prevData) => ({
      ...prevData,
      emailAddressClass:""
    }));
   }
   function classchangePhone (){
    setPhoneFocus(true);
    setValidation((prevData) => ({
      ...prevData,
      phoneNumberClass:""
    }));
   }
   function classchangeMessage (){
    setValidation((prevData) => ({
      ...prevData,
      messageClass:""
    }));
   }
  return (
    <>
      <section className={`contactusform news-clip ${data.Class}`} id={data.url}>
        <div className="container">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {overline && (
            <div className="col-start-1 col-span-12 md:col-start-2 md:col-span-10 text-center">
              <h3 className="overline mb-6 md:mb-8 block">{overline}</h3>
              <Heading tag={"h2"}>{formTitle}</Heading>
            </div>
)}
            <div className="col-start-1 col-span-12 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6">
              {isFormSubmitted ? (
                <form onSubmit={handleSubmit} className="contactusform__form mt-0" autoComplete="off">
                  <div>
                    <div className="contactusform__select">
                      <div
                        className={`contactusform__select-inner ${validation.category}`}
                      >
                        <Heading tag={"h5"} classes="contactusform__select-text">{interestLable}</Heading>
                        <div
                          className="contactusform__select-dropdown h5"
                          onClick={handleDropDown}
                        >
                          <button
                            id="dropdownDividerButton"
                            data-dropdown-toggle="dropdownDivider"
                            className={`contactusform__select-dropdown-text ${dropdownSelected ? "" : "opacity"
                              }`}
                            type="button"
                          >
                            {formData.category}
                          </button>
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`contactusform__select-dropdown-arrow cursor-pointer ${dropdownOpen ? "rotate" : ""
                              }`}
                          >
                            <mask
                              id="mask0_5395_9416"
                              style={{ maskType: "alpha" }}
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="24"
                              height="25"
                            >
                              <rect
                                y="0.5"
                                width="24"
                                height="24"
                                fill="#D9D9D9"
                              />
                            </mask>
                            <g mask="url(#mask0_5395_9416)">
                              <path
                                d="M12 15.5538L6.34619 9.90002L7.40002 8.84619L12 13.4462L16.6 8.84619L17.6538 9.90002L12 15.5538Z"
                                fill="white"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>

                      {validation.category &&
                        validation.category !== "" && (
                          <p className="contactusform__error">{interestError}</p>
                        )}
                      <div
                        id="dropdownDivider"
                        className={`contactusform__select-option ${dropdownOpen ? "show" : ""
                          }`}
                      >
                        <ul
                          className="contactusform__select-option-list"
                          aria-labelledby="dropdownDividerButton"
                        >
                          {data.interest.map((value, i) => {
                            // if (i === 0) {
                            //   return;
                            // }
                            return (
                              <>
                                <li
                                  data-value={value.text}
                                  className="contactusform__select-option-text h5 cursor-pointer"
                                  onClick={() => {
                                    handleChangeSelect(value.text);
                                  }}
                                >
                                  {value.text}
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className="contactusform__input">
                      <input type="hidden" name="recaptcha" value={recaptcha}/>
                      <input type="hidden" name="culture" value={lang}/>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className={`h5 contactusform__input-field focus:outline-none peer ${validation.firstName} ${validation.firstNameClass}`}
                        placeholder="firstName"
                        onChange={handleChange}
                        onFocus={classchangeFname}
                        maxLength={35}
                        value={formData.firstName} autoComplete="off"
                      />
                      <label
                        htmlFor="firstName"
                        className={`h5 contactusform__input-label duration-300 transform -translate-y-6 peer-focus peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ${formData.firstName.trim().length > 0
                          ? "contactusform__input-label--small"
                          : ""
                          }`}
                      >
                        {firstNameLable}
                      </label>

                      {validation.firstName &&
                        validation.firstName !== "" && (
                          <p className="contactusform__error">{firstNameError}</p>
                        )}
                    </div>
                    <div className="contactusform__input">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className={`h5 contactusform__input-field focus:outline-none peer ${validation.lastName} ${validation.lastNameClass}`}
                        placeholder="lastName"
                        onChange={handleChange}
                        onFocus={classchangeLname}
                        maxLength={35}
                        value={formData.lastName}
                        autoComplete="off"
                      />
                      <label
                        htmlFor="lastName"
                        className={`h5 contactusform__input-label duration-300 transform -translate-y-6 peer-focus peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ${formData.lastName.trim().length > 0
                          ? "contactusform__input-label--small"
                          : ""
                          }`}
                      >
                        {lastNameLable}
                      </label>
                      {validation.lastName &&
                        validation.lastName !== "" && (
                          <p className="contactusform__error">{lastNameError}</p>
                        )}
                    </div>
                    <div className="contactusform__input">
                      <input
                        type="text"
                        name="emailAddress"
                        id="emailAddress"
                        className={`h5 contactusform__input-field focus:outline-none peer ${validation.emailAddress} ${validation.emailAddressClass}`}
                        placeholder="emailAddress"
                        onChange={handleChange}
                        onFocus={classchangeEmail}
                        maxLength={35}
                        value={formData.emailAddress}
                        autoComplete="off"
                      />
                      <label
                        htmlFor="emailAddress"
                        className={`h5 contactusform__input-label duration-300 transform -translate-y-6 peer-focus peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ${formData.emailAddress.trim().length > 0
                          ? "contactusform__input-label--small"
                          : ""
                          }`}
                      >
                        {emailLable}
                      </label>
                      {validation.emailAddress &&
                        validation.emailAddress !== "" && (
                          <p className="contactusform__error">{emailError}</p>
                        )}
                    </div>
                    <div className="contactusform__input">
                      <div ref={contactUsRef} className={`contactusform__input-number ${phoneFocus ? 'label' : 'no-label'} `}>
                        <input
                          type="text"
                          name="code"
                          id="code"
                          className={`h5 contactusform__input-field contactusform__input-number-code focus:outline-none focus:ring-0 peer ${validation.code}`}
                          placeholder=""
                          onChange={handleChange}
                          onFocus={(e: { target: HTMLInputElement }) => {
                            contactUsRef.current?.classList?.remove("no-label");
                            e.target.value = formData.code;
                          }}
                          onBlur={(e: { target: HTMLInputElement }) => {
                            contactUsRef.current?.classList?.add("no-label");
                            if (e.target.value === "") {
                              e.target.value = formData.code;
                            }
                          }}
                          value={formData.code}
                        />
                        <div className="w-full">
                          <input
                            type="number"
                            name="phoneNumber"
                            ref={phoneRef} 
                            id="phoneNumber"
                            className={`h5 contactusform__input-field focus:outline-none peer ${validation.phoneNumber} ${validation.phoneNumberClass}`}
                            placeholder="phoneNumber"
                            onChange={handleChange}
                            onFocus={classchangePhone}
                            onBlur={(e) => {
                              if (e.target.value.length === 0) {
                                setPhoneFocus(false);
                              }
                              // phoneFunction()
                            }}
                            // ref={(inputRef) => {
                            //   if (inputRef) {
                            //     ref.current = inputRef;
                            //   }
                            // }}
                            // value={formData.phoneNumber}
                            // maxLength={20}
                            autoComplete="off"
                          />
                          <label
                            htmlFor="phoneNumber"
                            className={`h5 contactusform__input-label contactusform__phone-number duration-300 transform -translate-y-6 peer-focus peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ${formData.phoneNumber.trim().length > 0
                              ? "contactusform__input-label--small"
                              : ""
                              }`}
                          >
                            {phoneLabel}
                          </label>
                        </div>
                      </div>

                      {validation.phoneNumber !== "" && (
                        <p className="contactusform__error">
                          {phoneNumberError}
                        </p>
                      )}
                    </div>
                    <div className="contactusform__input">
                      <textarea
                        value={formData.message}
                        onChange={handleChange}
                        placeholder=" "
                        maxLength={105}
                        name="message"
                        onFocus={classchangeMessage}
                        id="message"
                        className={`h5 contactusform__input-field contactusform__textarea focus:outline-none focus:ring-0 peer custom-scrollbar ${validation.message
                          } ${validation.messageClass} ${messageLength && "increase-height"}`}
                      />
                      <label
                        htmlFor="message"
                        className={`h5 contactusform__input-label duration-300 transform -translate-y-6 peer-focus peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ${formData.message.trim().length > 0
                          ? "contactusform__input-label--small"
                          : ""
                          }`}
                      >
                        {messageLable}
                      </label>
                      {validation.message !== "" && (
                        <p className="contactusform__error">
                          {msgEmptyBool ? data.messageError:""}
                          {invalidMsg ? "Special character are not allowed":""}
                          </p>
                      )}
                    </div>
                    {/* {data.isCareer && ( */}
                      <div className="contactusform__input">
                        <div
                          className={`file-upload ${selectedFile && "file-upload__selected"} ${
                            validation.cv !== ""
                              ? "file-upload__selected--error"
                              : ""
                          }`}
                        >
                          {selectedFile ? (
                            <>
                              {validation.cv !== "" ? (
                                <>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.39998 14.6538L9.99998 11.0538L13.6 14.6538L14.6538 13.6L11.0538 9.99998L14.6538 6.39998L13.6 5.34615L9.99998 8.94615L6.39998 5.34615L5.34615 6.39998L8.94615 9.99998L5.34615 13.6L6.39998 14.6538ZM10.0016 19.5C8.68772 19.5 7.45268 19.2506 6.29655 18.752C5.1404 18.2533 4.13472 17.5765 3.2795 16.7217C2.42427 15.8669 1.74721 14.8616 1.24833 13.706C0.749442 12.5504 0.5 11.3156 0.5 10.0017C0.5 8.68772 0.749334 7.45268 1.248 6.29655C1.74667 5.1404 2.42342 4.13472 3.27825 3.2795C4.1331 2.42427 5.13834 1.74721 6.29398 1.24833C7.44959 0.749443 8.68437 0.5 9.9983 0.5C11.3122 0.5 12.5473 0.749334 13.7034 1.248C14.8596 1.74667 15.8652 2.42342 16.7205 3.27825C17.5757 4.1331 18.2527 5.13834 18.7516 6.29398C19.2505 7.44959 19.5 8.68437 19.5 9.9983C19.5 11.3122 19.2506 12.5473 18.752 13.7034C18.2533 14.8596 17.5765 15.8652 16.7217 16.7205C15.8669 17.5757 14.8616 18.2527 13.706 18.7516C12.5504 19.2505 11.3156 19.5 10.0016 19.5Z"
                                      fill="#ED1C24"
                                    />
                                  </svg>
                                  <p className="body-normal mx-4">
                                    {selectedName}
                                  </p>
                                  <span
                                    className="material-symbols-outlined icon-size-24 file-upload__delete"
                                    onClick={handleCVDelete}
                                  >
                                    delete
                                  </span>
                                </>
                              ) : (
                                <>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.58075 14.2538L15.3038 7.53075L14.25 6.47693L8.58075 12.1462L5.73075 9.29615L4.67693 10.35L8.58075 14.2538ZM10.0016 19.5C8.68772 19.5 7.45268 19.2506 6.29655 18.752C5.1404 18.2533 4.13472 17.5765 3.2795 16.7217C2.42427 15.8669 1.74721 14.8616 1.24833 13.706C0.749442 12.5504 0.5 11.3156 0.5 10.0017C0.5 8.68772 0.749334 7.45268 1.248 6.29655C1.74667 5.1404 2.42342 4.13472 3.27825 3.2795C4.1331 2.42427 5.13834 1.74721 6.29398 1.24833C7.44959 0.749443 8.68437 0.5 9.9983 0.5C11.3122 0.5 12.5473 0.749334 13.7034 1.248C14.8596 1.74667 15.8652 2.42342 16.7205 3.27825C17.5757 4.1331 18.2527 5.13834 18.7516 6.29398C19.2505 7.44959 19.5 8.68437 19.5 9.9983C19.5 11.3122 19.2506 12.5473 18.752 13.7034C18.2533 14.8596 17.5765 15.8652 16.7217 16.7205C15.8669 17.5757 14.8616 18.2527 13.706 18.7516C12.5504 19.2505 11.3156 19.5 10.0016 19.5Z"
                                      fill="#69BD45"
                                    />
                                  </svg>
                                  <p className="body-normal mx-4">
                                    {selectedName}
                                  </p>
                                  <span
                                    className="material-symbols-outlined icon-size-24 file-upload__delete"
                                    onClick={handleCVDelete}
                                  >
                                    delete
                                  </span>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined icon-size-24">
                                upload
                              </span>
                              <p className="body-normal">
                                {data.CVplaceholder}
                              </p>
                              {/* handleCVUpload */}
                              <input id='file'  name="file" type="file" onChange={handleCVUpload} />
                            </>
                          )}
                        </div>
                        {!selectedFile && validation.cv === "" &&
                        <p className="body-small pt-2">
                        {data.CVhelptxt}
                      </p>
                        }
                        
                        {validation.cv !== "" && (
                          <p className="contactusform__error">
                            {emptybool && data.CVemptyError}
                            {sizebool && data.CVsizeError}
                            {typebool && data.CVextensionError}
                          </p>
                        )}
                      </div>
                    {/* )} */}
                  </div>
                  {/* <input
                        name="file"
                        placeholder="please enter CV"
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                    // value={formData.file}
                    //   onChange={handleChange}
                    /> */}
                  <div className="w-full inline-block text-center mt-12 md:mt-12 xl:mt-16">
                    <p className="body-small">
                      {policyPreText}
                      <span className="body-small--bold">
                        <span className="cursor-pointer underline pl-0.5" onClick={overlayOpenHandler}>
                          {policyMidText}
                        </span>
                      </span>
                      {policyPostText}
                    </p>
                    <SignupBtn
                     onClick={() => {

                     }}
                      classes="signup-btn large contact-form-btn mt-4 lg:mt-6"
                      children={data.submitText ?? "Send message"}
                      tag="button"
                      iconRight="east"
                    />

                    {/* {isFormValid && (
                      <div className="contactusform__invalid-msg mt-6">
                        <p className="body-small color-red">{generalError}</p>
                      </div>
                    )} */}
                  </div>



                </form>
              ) : (
                <Heading classes="text-center mt-6" tag={"h4"}>{thankyouText}</Heading>

              )}
            </div>
          </div>
        </div>
      </section >
      {showOverlay && (
        <ModalTerms data={data.modal} onClickClose={overlayCloseHandler} />
      )}
    </>
  );
};

function generateUniqueFormId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `form_${timestamp}_${random}`;
}

export default Career;
