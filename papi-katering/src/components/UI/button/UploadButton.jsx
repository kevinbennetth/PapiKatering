import React from "react";
import { useState } from "react";
import Button from "./Button";
import { useRef } from "react";
import { uploadAndGetURL } from "./firebase/uploadUtilities";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "./firebase/firebase";

export default function UploadButton() {
  const [selectedImage, setSelectedImage] = useState(null);

  //   const imageListRef = ref(storage, "images/");

  const fileInputRef = useRef();

  const imageChangeHandler = async (event) => {
    setSelectedImage(event.target.files[0]);
    try {
      const url = await uploadAndGetURL(selectedImage);
    } catch (error) {}
  };

  const imageUploadHandler = async () => {
    fileInputRef.current.click();
    if (selectedImage !== null) {
      console.log(selectedImage);
      try {
        const imageRef = ref(storage, `images/${selectedImage.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, selectedImage);
        const URL = await getDownloadURL(imageRef);
        return URL;
      } catch (error) {}
    }
  };

  return (
    <div>
      <input
        type="file"
        name=""
        id=""
        onChange={imageChangeHandler}
        className="hidden"
        ref={fileInputRef}
      />
      <Button onClick={imageUploadHandler}>Upload</Button>
    </div>
  );
}
