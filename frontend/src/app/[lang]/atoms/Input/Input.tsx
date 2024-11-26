"use client";
import { useState } from "react";

interface InputProps {
  id: string;
  placeholderText?: string;
  name?:string;
  type?: string;
  label?: string;
  errorText?: string;
  helpText?: string;
  wordLimit?: string;
  required?: true | false;
  error?: true | false;
  help?: true | false;
  disabled?: true | false;
  onChangeHandler?: any;
  allvalue?:string;
}

const Input = ({
  id,
  placeholderText,
  type,
  name,
  label,
  errorText,
  helpText,
  wordLimit,
  required,
  error,
  help,
  disabled,
  onChangeHandler,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div
      className={`form-group ${error ? "error" : ""} ${
        help && !error ? "help" : ""
      }`}
    >
      <div className="form-input-wrap">
        {label && (
          <label className="label-small">
            {label}
            {required && <span className="form-input-required">*</span>}
          </label>
        )}
        <input
          id={id}
          className={`form-control`}
          placeholder={placeholderText ? placeholderText : ""}
          type={type || "text"}
          onFocus={handleOnFocus}
          onBlur={handleBlur}
          onChange={onChangeHandler}
        />
      </div>

      {/* {error && ( */}
        <div className="form-text-wrap">
        {error && (
          errorText && (
            <small className="body-small error-text">{errorText}</small>
          )
          )}
        </div>
      {/* )} */}
      {help && !error && (
        <div className="form-text-wrap">
          
          {helpText && isFocused && (
            <small className="body-small help-text">{helpText}</small>
          )
          }
        </div>
     )} 
    </div>
  );
};

export default Input;
