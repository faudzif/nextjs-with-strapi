import React from "react";

interface HeadingProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  tagClass?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  classes?: string;
  children: React.ReactNode;
  dataAttr?: any;
}

const Heading: React.FC<HeadingProps> = ({
  tag,
  tagClass,
  classes = "",
  dataAttr,
  children,
}) => {
  const Element = tag;
  return (
    <Element
      className={`${tagClass || tag} ${classes}`}
      data-land-slide-index={dataAttr}
    >
      {children}
    </Element>
  );
};

export default Heading;
