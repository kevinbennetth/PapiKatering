import React from "react";

export default function Radio(props) {
  const valueChangeHandler = (e) => {
    const { name, value } = e.target;
    props.onChange(name, value);
  };

  return (
    <input
      type="radio"
      name={props.name}
      id=""
      value={props.value}
      onChange={valueChangeHandler}
      checked={props.checked}
    />
  );
}
