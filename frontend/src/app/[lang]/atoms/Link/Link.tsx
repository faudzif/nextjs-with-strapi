interface LinkProps {
  tag?: "a" | "span";
  href?: string;
  tooltip?: string;
  target?: string;
  ariaLabel?: string;
  role?: string;
  classes?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Link = ({
  tag = "a",
  href = "#",
  tooltip,
  ariaLabel,
  role,
  target,
  children,
  classes = "",
  disabled,
  onClick,
}: LinkProps) => {
  const Element = tag;

  return (
    <Element
      {...(tag === "a" && { href: href })}
      target={target}
      title={tooltip}
      aria-label={ariaLabel}
      role={role || "button"}
      className={`link ${disabled ? "disabled" : ""} ${classes}`}
      onClick={onClick}
    >
      {children}
    </Element>
  );
};

export default Link;
