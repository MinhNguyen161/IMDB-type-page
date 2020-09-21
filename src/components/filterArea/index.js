import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const Filtered = (props) => {
  return (
    <div>
      <InputRange
        maxValue={10}
        minValue={0}
        value={props.inputRange}
        onChange={(range) => {
          props.setInputRange(range);
          props.filterByRate(range);
        }}
      />
    </div>
  );
};

export default Filtered;
