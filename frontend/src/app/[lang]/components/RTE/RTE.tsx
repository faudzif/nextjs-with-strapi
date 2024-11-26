import React from "react";

export interface RteProps {
  data: {
    content: string;
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
            ? "breaker breaker__bg-white"
            : "breaker breaker__bg-blue"
        } ${data.classes}`}
      >
        <div className="container">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-start-1 col-span-12 md:col-start-3 md:col-span-8">
              <div
                className="rte-component"
                dangerouslySetInnerHTML={{ __html: data?.content }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rte;
