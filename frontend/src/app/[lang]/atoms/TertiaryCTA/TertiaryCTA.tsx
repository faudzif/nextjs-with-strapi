interface TertiaryCTAProps {
  tag?: "a" | "span";
  href?: string;
  tooltip?: string;
  target?: string;
  ariaLabel?: string;
  role?: string;
  secondary?: boolean;
  classes?: string;
  iconLeft?: string;
  iconRight?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const TertiaryCTA = ({
  tag = "a",
  href = `#`,
  tooltip,
  ariaLabel,
  role,
  secondary = false,
  target,
  children,
  disabled,
  iconLeft,
  iconRight,
  classes = "",
  onClick,
}: TertiaryCTAProps) => {
  if (tag === "a") {
    return (
      <a
        href={href}
        target={target}
        title={tooltip}
        aria-label={ariaLabel}
        role={role || "button"}
        className={`tertiary-cta ${
          secondary ? "tertiary-cta-secondary" : "tertiary-cta-primary"
        } ${
          !iconLeft && !iconRight
            ? "tertiary-cta-no-icon"
            : !iconLeft
            ? "tertiary-cta-icon-right"
            : "" + !iconRight
            ? "tertiary-cta-icon-left"
            : ""
        } ${iconLeft && iconRight ? "tertiary-cta-both-icon" : ""} ${
          disabled ? "disabled" : ""
        } ${classes}`}
        // disabled={disabled}
        onClick={onClick}
      >
        {iconLeft && (
          <span className={`material-symbols-outlined icon-left icon-size-24`}>
            {iconLeft}
          </span>
        )}
        {children}
        {iconRight && (
          <span className={`material-symbols-outlined icon-right icon-size-24`}>
            {iconRight}
          </span>
        )}
      </a>
    );
  } else {
    return (
      <span
        title={tooltip}
        aria-label={ariaLabel}
        role={role || "button"}
        className={`tertiary-cta ${
          secondary ? "tertiary-cta-secondary" : "tertiary-cta-primary"
        } ${
          !iconLeft && !iconRight
            ? "tertiary-cta-no-icon"
            : !iconLeft
            ? "tertiary-cta-icon-right"
            : "" + !iconRight
            ? "tertiary-cta-icon-left"
            : ""
        } ${iconLeft && iconRight ? "tertiary-cta-both-icon" : ""} ${
          disabled ? "disabled" : ""
        } ${classes}`}
        onClick={onClick}
      >
        {iconLeft && (
          <span
            className={` material-symbols-outlined icon-left icon-size-24`}
          >
            {iconLeft}
          </span>
        )}
        {children}
        {iconRight && (
          <span
            className={` material-symbols-outlined icon-right icon-size-24`}
          >
            {iconRight}
          </span>
        )}
      </span>
    );
  }
};

export default TertiaryCTA;
