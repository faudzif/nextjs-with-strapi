import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  checkNull,
  HandleNullImage,
  lowerNHyphenation,
  pushDataLayer,
} from "../../utils/api-helpers";
import useOutsideClick from "../../utils/useOutsideClick";
export interface DDAccordionProps {
  ref?: React.ForwardedRef<unknown>;
  callfilterOptionClickHandler: any;
  removeQueryString: any;
  queryParams: any;
  data: {
    MainData: any;
    AccordionData: any;
    ddAccordion?: boolean;
  };
}
const DDAccordion: React.FC<DDAccordionProps> = forwardRef((dataRef, ref) => {
  const [uniqueCategories, setUniqueCategories] = useState<any>(
    dataRef.data.AccordionData?.selectOptions?.data ||
      dataRef.data.AccordionData
  );
  const [btnDisabled, setBtnDisabled] = useState<any>(true);
  const [selectedUnit, setSelectedUnit] = useState<any>(true);
  const [unitTxt, setUnitTxt] = useState<any>("");
  const [categoriesSelected, setCategoriesSelected] = useState<any>([]);

  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<any[]>([]);
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const [filterNumSelected, setFilterNumSelected] = useState<any>(0);
  // const [heightApply, setHeightApply] = useState<any>(false);

  const categoriesOptionsRef: any = useRef(null);
  const unitTxtRef: any = useRef("");

  const anchorBarDefault = dataRef.data.AccordionData.filterName;

  const anchorOpenMob = (e: any) => {
    if (
      e.target
        .closest(".dd-accordion__wrap")
        .querySelector("ul")
        .classList?.contains("active")
    ) {
      e.target
        .closest(".dd-accordion__wrap")
        .classList?.remove("active-parent");
      e.target
        .closest(".dd-accordion__wrap")
        .querySelector("ul")
        .classList?.add("no-scroll");

      // if (!heightApply) {
      //   setUnitTxt("");
      //   setBtnDisabled(true);
      // }

      const previvousActive: any = e.target
        .closest(".dd-accordion__wrap")
        .querySelector("ul");
      previvousActive.style.height = "0px";
      previvousActive.addEventListener(
        "transitionend",
        function () {
          previvousActive.classList?.remove("active");
          previvousActive.classList?.remove("no-scroll");
        },
        {
          once: true,
        }
      );
    } else {
      e.target.closest(".dd-accordion__wrap").classList?.add("active-parent");
      e.target
        .closest(".dd-accordion__wrap")
        .querySelector("ul")
        .classList?.add("active");
      e.target
        .closest(".dd-accordion__wrap")
        .querySelector("ul")
        .classList?.add("no-scroll");
      e.target
        .closest(".dd-accordion__wrap")
        .querySelector("ul").style.transitionDuration = "0.5s";
      e.target.closest(".dd-accordion__wrap").querySelector("ul").style.height =
        "auto";

      const height =
        e.target.closest(".dd-accordion__wrap").querySelector("ul")
          .clientHeight +
        2 +
        "px";
      e.target.closest(".dd-accordion__wrap").querySelector("ul").style.height =
        "0px";
      setTimeout(function () {
        e.target
          .closest(".dd-accordion__wrap")
          .querySelector("ul").style.height = height;
      }, 0);
      const previvousActive: any = e.target
        .closest(".dd-accordion__wrap")
        .querySelector("ul");
      previvousActive.addEventListener(
        "transitionend",
        function () {
          previvousActive.classList?.remove("no-scroll");
        },
        {
          once: true,
        }
      );
    }
  };

  const clearAll = () => {
    if (dataRef.data.ddAccordion) {
      const updatedCategories = categoriesSelected.map((item: any) =>
        item !== "" ? { ...item, checkd: false } : item
      );

      setCategoriesSelected(updatedCategories);
      setFilterNumSelected(0);
    } else {
      setUnitTxt("");
      setSelectedUnit(true);
    }
    setBtnDisabled(true);
  };

  const CategoriesChangeHandler = (e: any, index: any) => {
    const updatedCategories = categoriesSelected.map((item: any, i: number) =>
      i === index ? { ...item, checkd: e.target.checked } : item
    );
    setCategoriesSelected(updatedCategories);

    const checkSelected = updatedCategories.every(
      (item: any) => item.checkd === false
    );
    setBtnDisabled(checkSelected);

    const checkdTrueCount = updatedCategories.filter(
      (item: any) => item.checkd === true
    ).length;
    setFilterNumSelected(checkdTrueCount);
  };

  useEffect(() => {
    const updatedCategories = categoriesSelected
      .filter((item: any) => item.checkd === true)
      .map((item: any) => item.slug);

    if (dataRef.data.ddAccordion) {
      dataRef.callfilterOptionClickHandler(
        dataRef.data.AccordionData.slug,
        updatedCategories.toString()
      );

      const updatedCategories2 = updatedCategories.map((item: any) => {
        return uniqueCategories
          .filter((item2: any) => item2.attributes.slug === item)
          .map((item2: any) => " " + item2.attributes.name);
      });
      setSelectedCategory(updatedCategories2.toString());
    } else {
      let newVal = unitTxt;
      if (!selectedUnit) {
        newVal = Math.round(unitTxt / 0.393701);
      }
      // if (newVal > 0) {
      dataRef.callfilterOptionClickHandler(
        dataRef.data.AccordionData.slug,
        newVal.toString()
      );

      setSelectedCategory(newVal.toString());

      if (unitTxt !== "" && unitTxt > 0) {
        setFilterNumSelected(1);
      } else {
        setFilterNumSelected(0);
      }
    }
  }, [categoriesSelected, unitTxt]);

  const changeUnit = () => {
    setSelectedUnit(!selectedUnit);
    if (unitTxt !== "" && unitTxt > 0) {
      if (!selectedUnit) {
        setUnitTxt(Math.round(unitTxt / 0.393701));
      } else {
        setUnitTxt(Math.round(unitTxt * 0.393701));
      }
    }
  };

  const handleChange = (e: any) => {
    if (e.target.value.length < 9) {
      setUnitTxt(e.target.value);
      setBtnDisabled(false);
    }
  };

  const closeDDAccordion = () => {
    const previvousActiveParents = bodyClickRef.current?.querySelectorAll(
      ".dd-accordion .active-parent"
    );
    // if (!heightApply) {
    //   setUnitTxt("");
    //   setBtnDisabled(true);
    // }

    if (previvousActiveParents !== undefined) {
      if (previvousActiveParents?.length > 0) {
        const previvousActiveParent = previvousActiveParents[0];
        previvousActiveParent.classList.remove("active-parent");
        const previvousActive: any = previvousActiveParent.children[2];
        previvousActive.style.height = "0px";
        previvousActive.parentElement.classList.remove("active-parent");
        previvousActive.classList?.add("no-scroll");
        previvousActive.addEventListener(
          "transitionend",
          function () {
            previvousActive.classList.remove("active");
            previvousActive.classList?.remove("no-scroll");
          },
          {
            once: true,
          }
        );
      }
    }
  };

  const bodyClickRef = useRef<HTMLDivElement>(null);

  useOutsideClick(bodyClickRef, () => {
    closeDDAccordion();
  });

  useEffect(() => {
    if (dataRef.queryParams.length > 0) {
      const matchingItem = dataRef.queryParams.find(
        (item: any) => item.categorySlug === dataRef.data.AccordionData.slug
      );

      if (!dataRef.data.ddAccordion) {
        if (matchingItem) {
          setUnitTxt(matchingItem.categoryValues[0]);
          setSelectedUnit(true);
          setBtnDisabled(false);
          // setHeightApply(true);
        } else {
          setUnitTxt("");
          setBtnDisabled(true);
        }
      } else {
        if (matchingItem) {
          const updatedCategories = categoriesSelected.map((item2: any) => {
            const shouldUpdate = matchingItem.categoryValues.some(
              (item: any) => item.slug === item2.slug
            );
            return shouldUpdate
              ? { ...item2, checkd: true }
              : { ...item2, checkd: false };
          });

          setSelectedValues(matchingItem.categoryValues);
          setCategoriesSelected(updatedCategories);
          setBtnDisabled(false);
          const checkdTrueCount = updatedCategories.filter(
            (item: any) => item.checkd === true
          ).length;
          setFilterNumSelected(checkdTrueCount);
        } else {
          const updatedCategories = categoriesSelected.map((item: any) =>
            item !== "" ? { ...item, checkd: false } : item
          );
          setSelectedValues([]);
          setCategoriesSelected(updatedCategories);
          setBtnDisabled(true);
          const checkdTrueCount = updatedCategories.filter(
            (item: any) => item.checkd === true
          ).length;
          setFilterNumSelected(checkdTrueCount);
        }
      }
    } else {
      if (!dataRef.data.ddAccordion) {
        setUnitTxt("");
        setBtnDisabled(true);
        // setHeightApply(false);
      } else {
        const updatedCategories = categoriesSelected.map((item: any) =>
          item !== "" ? { ...item, checkd: false } : item
        );

        setCategoriesSelected(updatedCategories);
        setBtnDisabled(true);
        setFilterNumSelected(0);
      }
    }
  }, [dataRef.queryParams, dataRef.data.AccordionData.slug]);

  useEffect(() => {
    if (dataRef.data.ddAccordion) {
      const categoriesOptionsDelete = uniqueCategories.map((item: any) => {
        return {
          slug: item.attributes.slug,
          checkd: false,
        };
      });
      setCategoriesSelected(categoriesOptionsDelete);
    }
  }, []);
  const [category, setCategory] = useState<any>([]);
  const [childCategory, setchildCategory] = useState<any>([]);
  const [queryPush, setQueryPush] = useState<any>([]);
  useEffect(() => {
    dataRef.queryParams.map((item: any) => {
      category.push(item.categoryName);
      childCategory.push(item.categoryValues[0].name);
    });
    dataRef.queryParams.map((item: any) => {
      queryPush?.push(item.categoryName + ":" + item.categoryValues[0].name);
    });
  }, [dataRef.queryParams]);

  useImperativeHandle(ref, () => {
    return {
      clickEvent: clearAll,
    };
  });

  return (
    <div className="dd-accordion" ref={bodyClickRef}>
      <div className="dd-accordion__wrap">
        <div
          className={`dd-accordion__wrap-btn ${
            filterNumSelected > 0 || (unitTxt !== "" && unitTxt > 0)
              ? "dd-accordion__wrap-btn--selected"
              : ""
          }`}
          onClick={anchorOpenMob}
        >

{HandleNullImage(dataRef.data.AccordionData.icon) &&
            <Image
            alt=""
            src={HandleNullImage(dataRef.data.AccordionData.icon)}
            width={20}
            height={20}
            className="dd-accordion__icon"
          ></Image>
          }

          {!HandleNullImage(dataRef.data.AccordionData.icon) && 
            <span
              className={`material-symbols-outlined icon-size-24 ${dataRef.data.AccordionData.muiIconClass}`}
              >
                {dataRef.data.AccordionData.muiIcon}
            </span>
          }

          <p className="btn btn-primary">
            {anchorBarDefault}

            {filterNumSelected > 0 && dataRef.data.ddAccordion && (
              <>
                <span>{` (${filterNumSelected})`}</span>
              </>
            )}
          </p>
          <div className="dd-accordion__wrap-btn--arrow">
            <span className="material-symbols-outlined icon-size-24">
              keyboard_arrow_right
            </span>
          </div>
        </div>
        <div className="flex lg:hidden mb-6 dd-accordion__filter-list">
          {filterNumSelected > 0 && (
            <p className="body-small mt-1">
              {selectedCategory}
              {!dataRef.data.ddAccordion
                ? uniqueCategories?.cmToggleText
                : null}
            </p>
          )}
        </div>
        <ul className="custom-scrollbar" ref={categoriesOptionsRef}>
          {dataRef.data.ddAccordion ? (
            <>
              {checkNull(uniqueCategories) &&
                uniqueCategories.map((category: any, index: number) => {
                  if (!categoriesSelected[index]) return;

                  const option = category.attributes;
                  return (
                    <li key={index}>
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className={`form-check-input `}
                            type="checkbox"
                            id={`checkboxB-${
                              lowerNHyphenation(
                                dataRef.data.AccordionData.filterName
                              ) + category.id
                            }`}
                            aria-label=""
                            value={option.name}
                            checked={categoriesSelected[index].checkd}
                            onChange={(e) => {
                              CategoriesChangeHandler(e, index);
                              pushDataLayer({
                                event: "eventTracker",
                                custom_event_name: "filter_selected",
                                filter_type:
                                  dataRef.data.AccordionData.slug.toLowerCase(),
                                filter_value: e.target.value.toLowerCase(),
                                action: e.target.checked
                                  ? "selected"
                                  : "deselected",
                              });
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkboxB-${
                              lowerNHyphenation(
                                dataRef.data.AccordionData.filterName
                              ) + category.id
                            }`}
                          ></label>
                          <span className={`body-normal color-blue w-full`}>
                            {option.name}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </>
          ) : (
            <li className="dd-accordion__input-field">
              <p className="body-small">{uniqueCategories?.helpText}</p>
              <div className="dd-accordion__input-field--wrap">
                <div className="unit-main">
                  <input
                    id="toggle-on"
                    className="toggle toggle-left"
                    name="toggle"
                    value="false"
                    type="radio"
                    checked={selectedUnit}
                    onChange={changeUnit}
                  />
                  <label htmlFor="toggle-on" className="toggle-btn label-small">
                    {uniqueCategories?.cmToggleText}
                  </label>
                  <input
                    id="toggle-off"
                    className="toggle toggle-right"
                    name="toggle"
                    value="true"
                    type="radio"
                    checked={!selectedUnit}
                    onChange={changeUnit}
                  />
                  <label
                    htmlFor="toggle-off"
                    className="toggle-btn label-small"
                  >
                    {uniqueCategories?.incToggleText}
                  </label>
                </div>
                <input
                  ref={unitTxtRef}
                  type="number"
                  name="height"
                  id="id-height"
                  placeholder="0"
                  maxLength={8}
                  className={`h5 dd-accordion__input-field--txt ${
                    unitTxt !== "" && unitTxt > 0
                      ? "dd-accordion__input-field--txt-notempty"
                      : ""
                  }`}
                  value={unitTxt}
                  onChange={(e) => {
                    handleChange(e);
                    pushDataLayer({
                      event: "eventTracker",
                      custom_event_name: "filter_selected",
                      filter_type:
                        dataRef.data.AccordionData.slug.toLowerCase(),
                      filter_value: e.target.value.toLowerCase(),
                      action: e.target.value !== "" ? "selected" : "deselected",
                    });
                  }}
                />
              </div>
            </li>
          )}
          {/* <li>
            <div
              className={`${btnDisabled ? "dd-accordion__btn-disabled" : ""} `}
            >
              <Button
                tag="span"
                btnBg="transparent"
                secondary={true}
                onClick={() => {
                  clearAll();
                }}
              >
                {MainData?.clearCtaTxt || ""}
              </Button>
              <Button
                onClick={() => {
                  const updatedCategories = categoriesSelected
                    .filter((item: any) => item.checkd === true)
                    .map((item: any) => item.slug);

                  if (ddAccordion) {
                    callfilterOptionClickHandler(
                      AccordionData.slug,
                      updatedCategories.toString()
                    );
                    pushDataLayer({
                      event: "eventTracker",
                      custom_event_name: "filter_applied",
                      filter_category: AccordionData.filterName,
                      filter_value: updatedCategories
                        .toString()
                        .replaceAll(",", "|"),
                      // express_lane_available: "on",
                    });
                  } else {
                    let newVal = unitTxt;
                    if (!selectedUnit) {
                      newVal = Math.round(unitTxt / 0.393701);
                    }
                    if (newVal > 0) {
                      callfilterOptionClickHandler(
                        AccordionData.slug,
                        newVal.toString()
                      );
                    }
                    pushDataLayer({
                      event: "eventTracker",
                      custom_event_name: "filter_applied",
                      filter_category: AccordionData.filterName,
                      filter_value: newVal.toString(),
                      // express_lane_available: "on",
                    });
                    setHeightApply(true);
                  }
                  closeDDAccordion();
                }}
                tag="button"
                btnBg="red"
              >
                {MainData?.applyCtaTxt || ""}
              </Button>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
});

export default DDAccordion;
