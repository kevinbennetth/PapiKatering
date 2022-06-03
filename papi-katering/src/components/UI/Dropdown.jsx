import React from "react";

export default function Dropdown(props) {
  let color = "";
  let width = "";

  if (props.color === "gray") {
    color = "bg-gray-200";
  } else if (props.color === "white") {
    color = "bg-white";
  }

  const valueChangeHandler = (e) => {
    const { name, value } = e.target;
    props.onChange(name, value);
  };

  const baseClass = `rounded-md w-full p-2 focus:outline-none resize-none ${color} ${width}`;

  return (
    <select
      name={props.name}
      id={props.id}
      defaultValue={props.value}
      className={baseClass}
      onChange={valueChangeHandler}
    >
      {props.options?.map((option, idx) => (
        <option key={idx} value={option.value}>{option.show}</option>
      ))}
    </select>
  );
}
