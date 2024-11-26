"use client";
import { useState } from "react";
import { IMask, useIMask } from "react-imask";

interface ImaskDOBProps {
  placeholderText?: string;
  label?: string;
  errorText?: string;
  helpText?: string;
  required?: true | false;
  error?: true | false;
  help?: true | false;
  disabled?: true | false;
  onChangeHandler?: any;
}

const ImaskDOB = ({
  placeholderText,
  label,
  errorText,
  helpText,
  required,
  error,
  help,
  disabled,
  onChangeHandler,
}: ImaskDOBProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleOnFocus = () => {
    setIsFocused(true);
  };
  const date = new Date();
  const handleBlur = () => {
    setIsFocused(false);
  };
  const pattern = "d{-}`m{-}`Y";
  const imaskOptions: any = {
    mask: Date,
    pattern: pattern,
    blocks: {
      d: {
        mask: IMask.MaskedRange,
        placeholderChar: "D",
        from: 1,
        to: 31,
        maxLength: 2,
      },
      m: {
        mask: IMask.MaskedRange,
        placeholderChar: "M",
        from: 1,
        to: 12,
        maxLength: 2,
      },
      Y: {
        mask: IMask.MaskedRange,
        placeholderChar: "Y",
        from: 1920,
        to: 2023,
      },
    },
    format: (date: Date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return [day, month, year].join("-");
    },
    parse: (str: string) => {
      const [day, month, year] = str.split("-");
      return new Date(Number(year), Number(month) - 1, Number(day));
    },
    autofix: false, // defaults to `false`
    lazy: true,
    overwrite: true,
  };

  const { ref } = useIMask(imaskOptions, {
    onAccept: (value, mask) => {
    },
  });
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
          className={`form-control`}
          placeholder={placeholderText ? placeholderText : ""}
          type="text"
          onFocus={handleOnFocus}
          onBlur={handleBlur}
          onChange={onChangeHandler}
          ref={(inputRef) => {
            if (inputRef) {
              ref.current = inputRef;
            }
          }}
        />
      </div>

      {error && (
        <div className="form-text-wrap">
          {errorText && <small className="body-small">{errorText}</small>}
        </div>
      )}
      {help && !error && (
        <div className="form-text-wrap">
          {helpText && isFocused && (
            <small className="body-small helper-text">{helpText}</small>
          )}
        </div>
      )}
    </div>
  );
};

export default ImaskDOB;
