"use client";
import { useState, useEffect, useRef } from "react";
import Heading from "../../atoms/Heading/Heading";
import SignupBtn from "../../atoms/SignupBtn/SignupBtn";
import { checkNull, pushDataLayer } from "../../utils/api-helpers";
import ModalTerms from "../Modal/ModalTerms";
import { useIMask } from "react-imask";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
interface contactusform {
  category: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  code: string;
  phoneNumber: string;
  file: any;
  cv: string;
  message: string;
  classes?: string;
}

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
  isCareer?: boolean;
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
  specialCharacterMessageError:string;
  emailLable: string;
  emailError: string;
  generalError: string;
  thankyouText: string;
  code: string;
  modal: Modal;
  url: string;
  Class: string;
}
interface ContactUsProps {
  data: ContactUs;
  lang: string;
}
let cat: boolean = false;
let fname: boolean = false;
let lname: boolean = false;
let email: boolean = false;
let phone: boolean = false;
let msgEmptyBool: boolean = false;
let invalidMsg: boolean = false;
const ContactUsForm = ({ data, lang }: ContactUsProps) => {
  const initialTextCategory = data.Select_category ?? "select a category ";
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [phoneLabel, setPhoneLabel] = useState("");
  const contactUsRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const [allValuesValidation, setAllValuesValidation] = useState({
    category: false,
    fName: false,
    lName: false,
    code: false,
    phone: false,
    message: false,
    filing: false,
    email: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(true);
  const [dropdownSelected, setDropdownSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({
    firstName: "",
    firstNameClass: "",
    lastName: "",
    lastNameClass: "",
    emailAddress: "",
    emailAddressClass: "",
    phoneNumber: "",
    phoneNumberClass: "",
    message: "",
    messageClass: "",
    cv: "",
    category: "",
    code: "",
  });
  const [formData, setFormData] = useState<contactusform>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    message: "",
    file: "",
    cv: "",
    category: initialTextCategory,
    code: data.code || "+966",
  });
  function checkValidation() {
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
      fname = true;
      setAllValuesValidation((prevData) => ({ ...prevData, fName: false }));
      setIsFormValid(true);
      setValidation((prevData) => ({
        ...prevData,
        firstName: "border-red",
        firstNameClass: "error-color-red",
      }));
    } else if (!nameRegex.test(formData.firstName.trim())) {
      fname = true;
      setAllValuesValidation((prevData) => ({ ...prevData, fName: false }));
      setIsFormValid(true);
      setValidation((prevData) => ({
        ...prevData,
        firstName: "border-red",
        firstNameClass: "error-color-red",
      }));
    } else {
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
        lastNameClass: "error-color-red",
      }));
    } else if (!nameRegex.test(formData.lastName.trim())) {
      lname = true;
      setAllValuesValidation((prevData) => ({ ...prevData, lName: false }));
      setIsFormValid(true);
      setValidation((prevData) => ({
        ...prevData,
        lastName: "border-red",
        lastNameClass: "error-color-red",
      }));
    } else {
      lname = false;
      setAllValuesValidation((prevData) => ({ ...prevData, lName: true }));
      setValidation((prevData) => ({ ...prevData, lastName: "" }));
    }
    if (formData.emailAddress.trim().length === 0) {
      email = true;
      setAllValuesValidation((prevData) => ({ ...prevData, email: false }));
      setIsFormValid(true);
      setValidation((prevData) => ({
        ...prevData,
        emailAddress: "border-red",
        emailAddressClass: "error-color-red",
      }));
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const emailTest = emailRegex.test(formData.emailAddress);
      if (emailTest) {
        email = false;
        setAllValuesValidation((prevData) => ({ ...prevData, email: true }));
        setValidation((prevData) => ({ ...prevData, emailAddress: "" }));
      } else {
        email = true;
        setAllValuesValidation((prevData) => ({ ...prevData, email: false }));
        setIsFormValid(true);
        setValidation((prevData) => ({
          ...prevData,
          emailAddress: "border-red",
          emailAddressClass: "error-color-red",
        }));
      }
    }
    let msgRegax = /^[\$\u0600-\u06FFa-zA-Z0-9\s""'@,.!?_-]+$/;
    if (formData.message.trim().length === 0) {
      msgEmptyBool = true;
      invalidMsg = false;
      setAllValuesValidation((prevData) => ({ ...prevData, message: false }));
      setValidation((prevData) => ({
        ...prevData,
        message: "border-red",
        messageClass: "error-color-red",
      }));
      setIsFormValid(true);
    } else if (!msgRegax.test(formData.message.trim())) {
      msgEmptyBool = false;
      invalidMsg = true;
      setAllValuesValidation((prevData) => ({ ...prevData, message: false }));
      setValidation((prevData) => ({
        ...prevData,
        message: "border-red",
        messageClass: "error-color-red",
      }));
    } else {
      msgEmptyBool = false;
      invalidMsg = false;
      setAllValuesValidation((prevData) => ({ ...prevData, message: true }));
      setValidation((prevData) => ({ ...prevData, message: "" }));
    }

    if (formData.phoneNumber.trim().length < 7) {
      phone = true;
      setAllValuesValidation((prevData) => ({ ...prevData, phone: false }));
      setValidation((prevData) => ({
        ...prevData,
        phoneNumber: "border-red",
        phoneNumberClass: "error-color-red",
      }));
      setIsFormValid(true);
    } else {
      phone = false;
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
    return (
      !fname &&
      !lname &&
      !email &&
      !phone &&
      !invalidMsg &&
      !msgEmptyBool &&
      !cat
    );
  }
  const [showOverlay, setShowOverlay] = useState(false);
  const [overline] = useState(data.overline);
  const [formTitle] = useState(data.formTitle);
  const [interestLable] = useState(data.interestLblFirstHalf);
  const [interestError] = useState(data.interestError);
  const [firstNameLable] = useState(data.firstNameLable);
  const [firstNameError] = useState(data.firstNameError);
  const [lastNameLable] = useState(data.lastNameLable);
  const [lastNameError] = useState(data.lastNameError);
  const [emailLable] = useState(data.emailLable);
  const [emailError] = useState(data.emailError);
  const [phoneNumberLable] = useState(data.phoneNumberLable);
  const [phoneNumberError] = useState(data.phoneNumberError);
  const [messageLable] = useState(data.messageLable);
  const [policyPreText] = useState(data.policyPreText);
  const [policyMidText] = useState(data.policyMidText);
  const [policyPostText] = useState(data.policyPostText);
  const [thankyouText] = useState(data.thankyouText);

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
  const handlePhone = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value.replace(/\D/g, ""),
    }));
    if (e.target.value.trim().length > 7) {
      setAllValuesValidation((prevData) => ({ ...prevData, phone: true }));
      setValidation((prevData) => ({ ...prevData, phoneNumber: "" }));
    }
  };
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
      if (e.target.value.trim().length > 7) {
        setAllValuesValidation((prevData) => ({ ...prevData, phone: true }));
        setValidation((prevData) => ({ ...prevData, phoneNumber: "" }));
      }
      const result = e.target.value.replace(/\D/g, "");
      setFormData((prevData) => ({ ...prevData, [name]: result }));
      return;
    }
    if (phoneRef.current.value !== "") {
      setPhoneLabel(phoneFieldActiveText);
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
      if (temp.length < 5 && result.includes("")) {
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
        setFormData((prevData) => ({ ...prevData, [name]: e.target.value }));
      }
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

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
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      console.log("recaptcha not available yet");
      return;
    }
    executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
      if (checkValidation()) {
        SaveMessage(gReCaptchaToken);
        setLoading(true);
        if (data.submitText) {
          pushDataLayer({
            event: "eventTracker",
            custom_event_name: "form_submit",
            form_name: "contact us",
            click_text: data.submitText.toLowerCase(),
            eventCallback: function () {
              window.dataLayer.push({
                form_name: undefined,
                click_text: undefined,
              });
            },
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
    mask: "0000000000000000000000000000000000",
    lazy: true,
    placeholderChar: "0",
  };
  async function SaveMessage(gReCaptchaToken: string) {
    async function goAsync() {
      try {
        const captcha = Buffer.from(gReCaptchaToken).toString("base64");
        const uniFormID = generateUniqueFormId();
        const response = await axios({
          method: "post",
          url: "api/contactFormSubmit",
          data: {
            category: formData.category,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.emailAddress,
            phoneNumber: formData.code + " " + formData.phoneNumber,
            message: formData.message,
            formID: uniFormID,
            locale: lang,
            gRecaptchaToken: captcha,
          },
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            // "captchaToken": gReCaptchaToken
          },
        });
        if (response.data.errorMsg === true) {
          setIsFormValid(true);
        } else {
          setIsFormSubmitted(false);
          scrollIntoViewHandler();
        }
      } catch (error: any) {
        console.error("error form submission.");
      }
    }
    goAsync().then(() => {});
  }
  const { ref } = useIMask(imaskOptions, {
    onAccept: (value, mask) => {},
  });
  function classchangeFname() {
    setValidation((prevData) => ({
      ...prevData,
      firstNameClass: "",
    }));
  }
  function classchangeLname() {
    setValidation((prevData) => ({
      ...prevData,
      lastNameClass: "",
    }));
  }
  function classchangeEmail() {
    setValidation((prevData) => ({
      ...prevData,
      emailAddressClass: "",
    }));
  }
  function classchangePhone() {
    setPhoneFocus(true);
    setValidation((prevData) => ({
      ...prevData,
      phoneNumberClass: "",
    }));
  }
  function classchangeMessage() {
    setValidation((prevData) => ({
      ...prevData,
      messageClass: "",
    }));
  }
  return (
    <>
      <section
        className={`contactusform news-clip ${checkNull(data.Class)}`}
        id={checkNull(data.url)}
      >
        <div className="container">
          <div className="grid grid-cols-12">
            {!data?.isCareer && (
              <div className="col-start-1 col-span-12 md:col-start-2 md:col-span-10 text-center">
                <h3 className="overline mb-6 md:mb-8 block">
                  {checkNull(overline)}
                </h3>
                <Heading tag={"h2"}>{checkNull(formTitle)}</Heading>
              </div>
            )}
            <div className="col-start-1 col-span-12 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6">
              {isFormSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="contactusform__form"
                  autoComplete="off"
                >
                  <div>
                    <div className="contactusform__select">
                      <div
                        className={`contactusform__select-inner ${validation.category}`}
                      >
                        <Heading
                          tag={"h5"}
                          classes="contactusform__select-text"
                        >
                          {interestLable}
                        </Heading>
                        <div
                          className="contactusform__select-dropdown h5"
                          onClick={handleDropDown}
                        >
                          <button
                            id="dropdownDividerButton"
                            data-dropdown-toggle="dropdownDivider"
                            className={`contactusform__select-dropdown-text ${
                              dropdownSelected ? "" : "opacity"
                            }`}
                            type="button"
                          >
                            {checkNull(formData.category)}
                          </button>
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`contactusform__select-dropdown-arrow ${
                              dropdownOpen ? "rotate" : ""
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

                      {validation.category && validation.category !== "" && (
                        <p className="contactusform__error">{interestError}</p>
                      )}
                      <div
                        id="dropdownDivider"
                        className={`contactusform__select-option ${
                          dropdownOpen ? "show" : ""
                        }`}
                      >
                        <ul
                          className="contactusform__select-option-list"
                          aria-labelledby="dropdownDividerButton"
                        >
                          {data.interest.map((value, i) => {
                            return (
                              <>
                                <li
                                  data-value={value.text}
                                  className="contactusform__select-option-text h5"
                                  onClick={() => {
                                    handleChangeSelect(value.text);
                                  }}
                                >
                                  {checkNull(value.text)}
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className="contactusform__input">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className={`h5 contactusform__input-field focus:outline-none peer ${validation.firstName} ${validation.firstNameClass}`}
                        placeholder="firstName"
                        onChange={handleChange}
                        onFocus={classchangeFname}
                        maxLength={35}
                        value={formData.firstName}
                        autoComplete="off"
                      />
                      <label
                        htmlFor="firstName"
                        className={`h5 contactusform__input-label duration-300 transform -translate-y-6 peer-focus peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ${
                          formData.firstName.trim().length > 0
                            ? "contactusform__input-label--small"
                            : ""
                        }`}
                      >
                        {checkNull(firstNameLable)}
                      </label>

                      {validation.firstName && validation.firstName !== "" && (
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
                        className={`h5 contactusform__input-label duration-300 transform -translate-y-6 peer-focus peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ${
                          formData.lastName.trim().length > 0
                            ? "contactusform__input-label--small"
                            : ""
                        }`}
                      >
                        {checkNull(lastNameLable)}
                      </label>
                      {validation.lastName && validation.lastName !== "" && (
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
                        className={`h5 contactusform__input-label duration-300 transform -translate-y-6 peer-focus peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ${
                          formData.emailAddress.trim().length > 0
                            ? "contactusform__input-label--small"
                            : ""
                        }`}
                      >
                        {checkNull(emailLable)}
                      </label>
                      {validation.emailAddress &&
                        validation.emailAddress !== "" && (
                          <p className="contactusform__error">{emailError}</p>
                        )}
                    </div>
                    <div className="contactusform__input">
                      <div
                        ref={contactUsRef}
                        className={`contactusform__input-number ${
                          phoneFocus ? "label" : "no-label"
                        } `}
                      >
                        <input
                          type="text"
                          name="code"
                          id="code"
                          className={`h5 contactusform__input-field contactusform__input-number-code focus:outline-none focus:ring-0 peer ${validation.code}`}
                          placeholder=""
                          onChange={handleChange}
                          autoComplete="off"
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
                            type="tel"
                            ref={phoneRef}
                            name="phoneNumber"
                            id="phoneNumber"
                            className={`h5 contactusform__input-field focus:outline-none peer ${validation.phoneNumber} ${validation.phoneNumberClass}`}
                            placeholder="phoneNumber"
                            onFocus={classchangePhone}
                            onChange={handlePhone}
                            autoComplete="off"
                            // onKeyUp={check}
                            // onFocus={() => {
                            //   setPhoneFocus(true);
                            //   classchangePhone
                            // }}
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
                            value={formData.phoneNumber}
                            // maxLength={20}
                          />
                          <label
                            htmlFor="phoneNumber"
                            className={`h5 contactusform__input-label contactusform__phone-number duration-300 transform -translate-y-6 peer-focus peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ${
                              formData.phoneNumber.trim().length > 0
                                ? "contactusform__input-label--small"
                                : ""
                            }`}
                          >
                            {checkNull(phoneLabel)}
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
                        autoComplete="off"
                        className={`h5 contactusform__input-field contactusform__textarea focus:outline-none focus:ring-0 peer custom-scrollbar ${
                          validation.message
                        } ${validation.messageClass} ${
                          messageLength && "increase-height"
                        }`}
                      />
                      <label
                        htmlFor="message"
                        className={`h5 contactusform__input-label duration-300 transform -translate-y-6 peer-focus peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 ${
                          formData.message.trim().length > 0
                            ? "contactusform__input-label--small"
                            : ""
                        }`}
                      >
                        {checkNull(messageLable)}
                      </label>
                      {validation.message !== "" && (
                        <p className="contactusform__error">
                          {msgEmptyBool ? data?.messageError : ""}
                          {invalidMsg
                            ? "Special character are not allowed"
                            : ""}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full inline-block text-center mt-12 md:mt-12 xl:mt-16">
                    <p className="body-small">
                      {checkNull(policyPreText)}
                      <span className="body-small--bold">
                        <span
                          className="cursor-pointer underline pl-0.5"
                          onClick={overlayOpenHandler}
                        >
                          {checkNull(policyMidText)}
                        </span>
                      </span>
                      {checkNull(policyPostText)}
                    </p>
                    <SignupBtn
                      onClick={() => {}}
                      classes="signup-btn large contact-form-btn mt-4 lg:mt-6"
                      children={checkNull(data.submitText) ?? "Send message"}
                      tag="button"
                      iconRight="east"
                      isLoading={loading}
                    />

                    {/* {isFormValid && (
                      <div className="contactusform__invalid-msg mt-6">
                        <p className="body-small color-red">{generalError}</p>
                      </div>
                    )} */}
                  </div>
                </form>
              ) : (
                <Heading classes="text-center mt-6" tag={"h4"}>
                  {checkNull(thankyouText)}
                </Heading>
              )}
            </div>
          </div>
        </div>
      </section>
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

export default ContactUsForm;
