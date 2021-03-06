import React from "react";

export default function TextArea(props) {
  let color = "";
  let width = "";

  if (props.color === "gray") {
    color = "bg-gray-200";
  } else if (props.color === "white") {
    color = "bg-white border-gray-300 border-2";
  }

  const valueChangeHandler = (e) => {
    const { name, value } = e.target;
    props.onChange(name, value);
  };

  const baseClass = `rounded-md w-full p-2 focus:outline-none resize-none ${color} ${width}`;
  return (
    <textarea
      name={props.name}
      id={props.id}
      className={baseClass}
      rows={props.rows}
      value={props.value}
      onChange={valueChangeHandler}
    />
  );
}
