import React from "react";

export interface RteProps {
  data: {
    body: string;
    hasWhiteBg?: boolean;
    classes?: string;
  };
}
const Rte: React.FC<RteProps> = ({ data }) => {
  const { classes = "", hasWhiteBg = false } = data;
  return (
    <>
      <section
        className={`${
          data.hasWhiteBg === true
            ? "breaker breaker__bg-white spacing-pt-80"
            : "breaker breaker__bg-blue spacing-pt-80"
        } ${data.classes}`}
      >
        <div className="container">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-start-1 col-span-12 md:col-start-3 md:col-span-8">
              <div
                className="rte-component"
                dangerouslySetInnerHTML={{ __html: data?.body }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rte;
