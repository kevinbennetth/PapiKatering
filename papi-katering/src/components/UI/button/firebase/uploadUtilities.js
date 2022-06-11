import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "./firebase";

export const uploadAndGetURL = (selectedImage) => {
  if (selectedImage !== null) {
    return new Promise(async (resolve, reject) => {
      try {
        const imageRef = ref(storage, `images/${selectedImage.name + v4()}`);
        await uploadBytes(imageRef, selectedImage);
        const URL = await getDownloadURL(imageRef);
        resolve(URL);
      } catch (error) {
        reject(error)
      }
    });
  }
  return null;
};
