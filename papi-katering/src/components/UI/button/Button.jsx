import React from "react";

export default function Button(props) {
  let width = "";
  if(props.width === "full") {
    width = "w-full";
  } 

  const baseClass = `py-3 px-10 rounded text-white font-bold bg-primary hover:opacity-75 `;
  return (
    <button className={baseClass} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
