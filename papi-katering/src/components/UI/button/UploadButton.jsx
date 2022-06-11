import React from "react";
import { useState } from "react";
import Button from "./Button";
import { useRef } from "react";
import { uploadAndGetURL } from "./firebase/uploadUtilities";

export default function UploadButton(props) {
  const fileInputRef = useRef();

  const imageChangeHandler = async (event) => {
    props.onFileSelect(props.name, event.target.files[0]);
  };

  const imageUploadHandler = async () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        name={props.name}
        id={props.id}
        onChange={imageChangeHandler}
        className="hidden"
        ref={fileInputRef}
        accept="image/*"
      />
      <Button type="button" onClick={imageUploadHandler}>
        {props.children}
      </Button>
    </div>
  );
}
