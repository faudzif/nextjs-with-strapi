import { useState } from "react";
import ModalTerms from "../../components/Modal/ModalTerms";

interface CheckBoxProps {
  checkBoxLabel?: string;
  classes?: string;
  posttext?: string;
  ariaLabel?: string;
  checkBoxID: string;
  disabled?: boolean;
  checked?: boolean;
  modal: Modal;
  error?: boolean;
  errorCheck?: boolean;
  checkBoxLink?: string;
  defaultChecked?: boolean;
  onChange?: (e: any) => void;
}

interface Modal {
  title: string;
  desc: string;
  cta_text: string;
  cta_Link: string;
}
const CheckBox = ({
  checkBoxLabel,
  classes = "",
  ariaLabel,
  checkBoxID,
  disabled,
  checkBoxLink,
  posttext,
  checked,
  modal,
  defaultChecked,
  error,
  errorCheck,
  onChange,
}: CheckBoxProps) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayOpenHandler = () => {
    setShowOverlay(true);
    document.body.classList?.add(`no-scroll`);
    document.documentElement.classList?.add(`no-scroll`);
    // sessionStorage?.setItem("isLandOpen", JSON.stringify(true));
  };

  const overlayCloseHandler = () => {
    setShowOverlay(false);
    document.body.classList?.remove(`no-scroll`);
    document.documentElement.classList?.remove(`no-scroll`);
    // sessionStorage?.setItem("isLandOpen", JSON.stringify(false))
    // sessionStorage?.removeItem("isLandOpen");
  };
  return (
    <>
      <div className="form-group">
        <div className="form-check">
          <input
            className={`form-check-input ${classes} ${error ? "error" : null} `}
            type="checkbox"
            value=""
            id={checkBoxID}
            checked={checked}
            disabled={disabled}
            defaultChecked={defaultChecked}
            aria-label={checkBoxLabel ? "" : ariaLabel}
            onChange={onChange}
          />

          <label
            className="form-check-label "
            htmlFor={`${checkBoxID}`}
          ></label>
          <span
            className={`signup-form__lable body-small ${
              errorCheck ? "error" : ""
            }`}
          >
            {checkBoxLabel}
            <span
              onClick={overlayOpenHandler}
              className="underline underline-offset-4 color-red"
            >
              {checkBoxLink ?? ""}
            </span>
            {posttext ?? ""}
          </span>
        </div>
      </div>
      {showOverlay && (
        <ModalTerms data={modal} onClickClose={overlayCloseHandler} />
      )}
    </>
  );
};
export default CheckBox;
