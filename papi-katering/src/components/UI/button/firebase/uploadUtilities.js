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
        reject(error);
      }
    });
  }
  return null;
};

export const selectImage = (image, type) => {
  let defaultImage =
    "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg";

  if (type === "PROFILE") {
    defaultImage =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  }

  return typeof image === "string" || image instanceof String
    ? image === ""
      ? defaultImage
      : image
    : URL.createObjectURL(image);
};
