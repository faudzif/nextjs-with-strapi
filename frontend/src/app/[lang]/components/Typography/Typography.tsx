import React from "react";
import Button from "../../atoms/Button/Button";
import Heading from "../../atoms/Heading/Heading";
import TertiaryCTA from "../../atoms/TertiaryCTA/TertiaryCTA";
import Link from "../../atoms/Link/Link";
import SignupBtn from "../../atoms/SignupBtn/SignupBtn";

interface TypographyProps {
  data: {};
}

export default function Typography({ data }: TypographyProps) {
  return (
    <div className="container">
      {/* Typography EN */}
      <div>
        <Heading tag="h1">
          The first thrilling theme park in the Kingdom...
        </Heading>
        <br />
        <Heading tag="h2">
          The first thrilling theme park in the Kingdom...
        </Heading>
        <br />
        <Heading tag="h3">
          The first thrilling theme park in the Kingdom...
        </Heading>
        <br />
        <Heading tag="h4">
          The first thrilling theme park in the Kingdom...
        </Heading>
        <br />
        <Heading tag="h5">
          The first thrilling theme park in the Kingdom...
        </Heading>
        <br />
        <Heading tag="h6">
          The first thrilling theme park in the Kingdom...
        </Heading>
        <br />
        <span className="overline">overline</span>
        <br />
        <br />
        <p className="body-small">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <br />
        <p className="body-normal">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <br />
        <p className="body-normal body-normal--bold">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <br />
        <p className="body-large">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <br />
        <p className="body-extra-large">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <br />
        <label className="label">Label Regular</label>
        <br />
        <br />
        <label className="label-small">Label Small</label>
        <br />
        <br />
        <label className="label-small--regular">Label Small</label>
        <br />
        <br />
        <Button tag="button" children={"primary button"} />
        <br />
        <br />
        <Button tag="button" btnBg="white" children={"primary button"} />
        <br />
        <br />
        <Button tag="button" disabled={true} children={"primary button"} />
        <br />
        <br />
        <Button tag="button" secondary={true} children={"secondary button"} />
        <br />
        <br />
        <Button
          tag="button"
          secondary={true}
          btnBg="transparent"
          children={"secondary button"}
        />
        <br />
        <br />
        <Button
          tag="button"
          secondary={true}
          disabled={true}
          children={"secondary button"}
        />
        <br />
        <br />
        <TertiaryCTA children={"Tertiary Primary"} iconRight="chevron_right" />
        <br />
        <br />
        <TertiaryCTA
          children={"Tertiary Primary"}
          iconRight="arrow_right_alt"
          disabled={true}
        />
        <br />
        <br />
        <TertiaryCTA
          children={"Tertiary Secondary"}
          iconRight="arrow_right_alt"
          secondary={true}
        />
        <br />
        <br />
        <TertiaryCTA
          children={"Tertiary Secondary"}
          iconRight="arrow_right_alt"
          secondary={true}
          disabled={true}
        />
        <br />
        <br />
        <Link href={"#."}>Inline text link</Link>
        <br />
        <br />
        <SignupBtn
          children={"Signup"}
          tag="a"
          iconRight="arrow_right_alt"
          // disabled={true}
        />
        <br />
        <br />
      </div>
      {/* Typography AR */}
      <div>
        <Heading tag="h1">لك ولعائلتك والطفل الذي بداخلك</Heading>
        <br />
        <Heading tag="h2">لك ولعائلتك والطفل الذي بداخلك</Heading>
        <br />
        <Heading tag="h3">لك ولعائلتك والطفل الذي بداخلك</Heading>
        <br />
        <Heading tag="h4">لك ولعائلتك والطفل الذي بداخلك</Heading>
        <br />
        <Heading tag="h5">لك ولعائلتك والطفل الذي بداخلك</Heading>
        <br />
        <Heading tag="h6">لك ولعائلتك والطفل الذي بداخلك</Heading>
        <br />
        <span className="overline">Overline عربي</span>
        <br />
        <br />
        <p className="body-small">
          يمكن للزوار من جميع أنحاء العالم الحصول بسهولة على تأشيرة دخول إلى
          المملكة العربية السعودية، مما يسمح لهم باللعب وتناول الطعام والتسوق في
          المركز
        </p>
        <br />
        <p className="body-normal">
          يمكن للزوار من جميع أنحاء العالم الحصول بسهولة على تأشيرة دخول إلى
          المملكة العربية السعودية، مما يسمح لهم باللعب وتناول الطعام والتسوق في
          المركز
        </p>
        <br />
        <p className="body-normal body-normal--bold">
          يمكن للزوار من جميع أنحاء العالم الحصول بسهولة على تأشيرة دخول إلى
          المملكة العربية السعودية، مما يسمح لهم باللعب وتناول الطعام والتسوق في
          المركز
        </p>
        <br />
        <p className="body-large">
          يمكن للزوار من جميع أنحاء العالم الحصول بسهولة على تأشيرة دخول إلى
          المملكة العربية السعودية، مما يسمح لهم باللعب وتناول الطعام والتسوق في
          المركز
        </p>
        <br />
        <p className="body-extra-large">
          يمكن للزوار من جميع أنحاء العالم الحصول بسهولة على تأشيرة دخول إلى
          المملكة العربية السعودية، مما يسمح لهم باللعب وتناول الطعام والتسوق في
          المركز
        </p>
        <br />
        <label className="label">Label Regular عربي</label>
        <br />
        <br />
        <label className="label-small">Label Small عربي</label>
        <br />
        <br />
        <label className="label-small--regular">Label Small عربي</label>
        <br />
        <br />
        <Button tag="button" children={"primary button عربي"} />
        <br />
        <br />
        <Button tag="button" btnBg="white" children={"primary button عربي"} />
        <br />
        <br />
        <Button tag="button" disabled={true} children={"primary button عربي"} />
        <br />
        <br />
        <Button
          tag="button"
          secondary={true}
          children={"secondary button عربي"}
        />
        <br />
        <br />
        <Button
          tag="button"
          secondary={true}
          btnBg="transparent"
          children={"secondary button عربي"}
        />
        <br />
        <br />
        <Button
          tag="button"
          secondary={true}
          disabled={true}
          children={"secondary button عربي"}
        />
        <br />
        <br />
        <TertiaryCTA
          children={"Tertiary Primary عربي"}
          iconRight="chevron_right"
        />
        <br />
        <br />
        <TertiaryCTA
          children={"Tertiary Primary عربي"}
          iconRight="arrow_right_alt"
          disabled={true}
        />
        <br />
        <br />
        <TertiaryCTA
          children={"Tertiary Secondary عربي"}
          iconRight="arrow_right_alt"
          secondary={true}
        />
        <br />
        <br />
        <TertiaryCTA
          children={"Tertiary Secondary عربي"}
          iconRight="arrow_right_alt"
          secondary={true}
          disabled={true}
        />
        <br />
        <br />
        <Link href={"#."}>Inline text link عربي</Link>
        <br />
        <br />
        <SignupBtn
          children={"عربي"}
          tag="a"
          iconRight="arrow_right_alt"
          // disabled={true}
        />
        <br />
        <br />
      </div>
    </div>
  );
}
