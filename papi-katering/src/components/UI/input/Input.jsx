import React from "react";

export default function Input(props) {
  let color = "";

  if (props.color === "gray") {
    color = "bg-gray-200";
  } else if (props.color === "white") {
    color = "bg-white";
  }

  const baseClass = `rounded-md w-full p-2 focus:outline-none ${color}`;

  const valueChangeHandler = (e) => {
    const { name, value } = e.target;
    props.onChange(name, value);
  };

  return (
    <input
      value={props.value}
      onChange={valueChangeHandler}
      type={props.type}
      name={props.name}
      id={props.id}
      className={baseClass}
    />
  );
}
