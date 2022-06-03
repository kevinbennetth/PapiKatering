import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const alertRoot = document.getElementById("alert-root");

export default function Alert(props) {
  useEffect(() => {
    setTimeout(() => {
      props.onFinishError(null);
    }, 2000);
  }, [props]);

  return ReactDOM.createPortal(
    <div
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 fixed w-1/2 left-1/4 animate-alert-move-down z-20"
      role="alert"
    >
      <span class="font-bold">{props.header}.</span> {props.detail}
    </div>,
    alertRoot
  );
}
