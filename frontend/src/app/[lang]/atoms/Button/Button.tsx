interface ButtonProps {
  tag?: "a" | "button" | "span";
  ref?: string;
  href?: string;
  tooltip?: string;
  target?: string;
  ariaLabel?: string;
  role?: string;
  value?: string;
  secondary?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  btnBg?: "" | "white" | "red" | "blue" | "transparent";
  disabled?: boolean;
  classes?: string;
  noClassification?: boolean;
  title?: string;
  children: React.ReactNode;
  iconLeft?: string;
  iconRight?: string;
  dataAttr?: any;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  tag = "a",
  ref,
  href = `#`,
  tooltip,
  ariaLabel,
  role,
  secondary = false,
  target,
  type,
  btnBg = "",
  title,
  children,
  disabled,
  classes = "",
  noClassification,
  iconLeft,
  iconRight,
  dataAttr,
  onClick,
}: ButtonProps) => {
  const Element = tag;

  const ChildrenData = () => {
    return (
      <>
        {iconLeft && (
          <span className={`material-symbols-outlined icon-left`}>
            {iconLeft}
          </span>
        )}
        
        {children || title}

        {iconRight && (
          <span className={`material-symbols-outlined icon-right`}>
            {iconRight}
          </span>
        )}
      </>
    );
  };

  if (tag === "button") {
    return (
      <Element
        ref={ref}
        type={type || "button"}
        title={tooltip}
        aria-label={ariaLabel}
        className={`btn ${
          !noClassification ? (secondary ? "btn-secondary" : "btn-primary") : ""
        } ${" btn-" + btnBg} ${classes}`}
        disabled={disabled}
        onClick={onClick}
      >
        <ChildrenData />
      </Element>
    );
  } else if (tag === "span") {
    return (
      <Element
        ref={ref}
        title={tooltip}
        aria-label={ariaLabel}
        role={role || "button"}
        data-land-slide-index={dataAttr}
        className={`btn ${
          !noClassification ? (secondary ? "btn-secondary" : "btn-primary") : ""
        } ${" btn-" + btnBg} ${classes}`}
        onClick={onClick}
      >
        <ChildrenData />
      </Element>
    );
  } else {
    return (
      <Element
        ref={ref}
        href={href}
        target={target}
        title={tooltip}
        aria-label={ariaLabel}
        role={role || "button"}
        className={`btn ${
          !noClassification ? (secondary ? "btn-secondary" : "btn-primary") : ""
        } ${" btn-" + btnBg} ${classes}`}
        onClick={onClick}
      >
        <ChildrenData />
      </Element>
    );
  }
};

export default Button;
