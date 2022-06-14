import React from "react";

export default function Button(props) {
  let disableClass = "";
  if (props.disabled) {
    disableClass = `cursor-not-allowed`;
  }

  const baseClass = `py-3 px-10 rounded text-white font-bold bg-primary hover:opacity-75 ${disableClass}`;
  return (
    <button
      disabled={props.disabled}
      className={baseClass}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
