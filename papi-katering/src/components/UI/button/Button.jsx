import React from "react";

export default function Button(props) {

  const baseClass = `py-3 px-10 rounded text-white font-bold bg-primary hover:opacity-75 `;
  return (
    <button className={baseClass} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
