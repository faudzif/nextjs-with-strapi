interface SignupBtnProps {
  tag?: "a" | "button";
  href?: string;
  tooltip?: string;
  target?: string;
  ariaLabel?: string;
  role?: string;
  classes?: string;
  iconRight?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  isLoading?: boolean;
}

const SignupBtn = ({
  tag = "a",
  href = `#`,
  tooltip,
  ariaLabel,
  role,
  target,
  children,
  iconRight,
  classes = "",
  disabled,
  onClick,
  isLoading,
}: SignupBtnProps) => {
  if (tag === "a") {
    return (
      <a
        href={href}
        target={target}
        title={tooltip}
        aria-label={ariaLabel}
        role={role || "button"}
        className={`signup-btn ${disabled ? "disabled" : ""} ${classes} `}
        onClick={onClick}
      >
        {children}
        {iconRight && (
          <span className={`signup-btn-arrow`}>
            <span className={`material-symbols-outlined icon-size-12`}>
              {iconRight}
            </span>
          </span>
        )}
      </a>
    );
  } else {
    return (
      <button
        title={tooltip}
        aria-label={ariaLabel}
        role={role || "button"}
        className={`link-cta ${disabled ? "disabled" : ""} ${classes} ${
          isLoading ? "loading" : ""
        }`}
        onClick={onClick}
      >
        <h2 className="signup-btn-text h4">{children}</h2>

        {iconRight && (
          <span className={`signup-btn-arrow`}>
            <span className={`material-symbols-outlined icon-size-12`}>
              {iconRight}
            </span>
          </span>
        )}
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className="path"
              cx="50"
              cy="50"
              r="12"
              fill="none"
              strokeWidth="2"
              strokeMiterlimit="5"
            ></circle>
          </svg>
        </div>
      </button>
    );
  }
};

export default SignupBtn;
