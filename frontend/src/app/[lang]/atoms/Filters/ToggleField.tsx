"use client";

import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { pushDataLayer } from "../../utils/api-helpers";
export interface ToggleFieldProps {
  ref?: React.ForwardedRef<unknown>;
  callfilterOptionClickHandler: any;
  queryParams: any;
  removeQueryString: any;
  data: {
    ToggleFieldData: any;
  };
}

const ToggleField: React.FC<ToggleFieldProps> = forwardRef((dataRef, ref) => {
  // console.log("🚀 ~ ToggleField ~ ToggleFieldData:", ToggleFieldData);
  const [selectedUnit, setSelectedUnit] = useState<any>(false);

  const clearAll = () => {
    setSelectedUnit(false);
  };

  useEffect(() => {
    if (dataRef.queryParams.length > 0) {
      const isMatch = dataRef.queryParams.some(
        (item: any) => item.categorySlug === dataRef.data.ToggleFieldData.slug
      );
      setSelectedUnit(isMatch);
    } else {
      setSelectedUnit(false);
    }
  }, [dataRef.queryParams, dataRef.data.ToggleFieldData.slug]);

  useEffect(() => {
    dataRef.callfilterOptionClickHandler(
      dataRef.data.ToggleFieldData.slug,
      selectedUnit ? "true" : ""
    );

    /* if(hasSelected) {
      pushDataLayer({
        'event': 'eventTracker',
        'custom_event_name': 'filter_selected',
        'filter_type': dataRef.data.ToggleFieldData.slug.toLowerCase(),
        'filter_value': selectedUnit ? "on" : "off",
        'action': selectedUnit === true ? 'selected' : 'deselected',
      });
    } */

    /* pushDataLayer({
      event: "eventTracker",
      custom_event_name: "filter_applied",
      express_lane_available: selectedUnit ? "on" : "off",
    }); */
  }, [selectedUnit]);

  useImperativeHandle(ref, () => {
    return {
      clickEvent: clearAll,
    };
  });

  return (
    <div className="toggle-field">
      <label className="switch" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          checked={selectedUnit}
          onChange={(e) => {
            setSelectedUnit(!selectedUnit);
            pushDataLayer({
              'event': 'eventTracker',
              'custom_event_name': 'filter_selected',
              'filter_type': dataRef.data.ToggleFieldData.slug.toLowerCase(),
              'filter_value': e.target.checked ? "on" : "off",
              'action': e.target.checked ? 'selected' : 'deselected',
            });
          }}
        />
        <div className="slider round"></div>
      </label>
      <p className="btn toggle-field__txt">
        {dataRef.data.ToggleFieldData.filterName}
      </p>
    </div>
  );
});

export default ToggleField;
