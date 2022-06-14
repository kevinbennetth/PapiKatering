import { useState, useEffect } from "react";
import API from "../../apis/API";
import { useContext } from "react";
import { UserContext } from "../../context/context";
import {
  selectImage,
  uploadAndGetURL,
} from "../UI/button/firebase/uploadUtilities";
import UploadButton from "../UI/button/UploadButton";
import Alert from "../UI/alert/Alert";
import Button from "../UI/button/Button";
import LoadingBar from "react-top-loading-bar";

const MerchantMenu = (props) => {
  const customerID = props.custID;
  const { merchantID } = useContext(UserContext);
  const [merchant, setMerchant] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [buttonText, setButtonText] = useState("Create Merchant");

const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/merchant/${merchantID}`);

        if (response.data.data.merchantData) {
          setMerchant(response.data.data.merchantData);
          setName(response.data.data.merchantData.merchantname);
          setAddress(response.data.data.merchantData.merchantaddress);
          setPhone(response.data.data.merchantData.merchantphone);
          setProfileImage(response.data.data.merchantData.merchantimage);
          setButtonText("Save");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (merchantID !== "") {
      fetchData();
    }
  }, []);

  const validate = () => {
    const submissionError = { header: "", detail: "" };
    const addressData = address.split(",");
    if (name.trim().length === 0) {
      submissionError.header = "Invalid Name";
      submissionError.detail = "Name Can't be Empty !";
    } else if (phone.trim().length < 11 || phone.trim().length > 13) {
      submissionError.header = "Invalid Phone";
      submissionError.detail = "Phone has to be between 11 - 13 digits !";
    } else if (
      address.trim().length === 0 ||
      !address.includes(",") ||
      addressData[address.split(",").length - 1].trim().length === 0
    ) {
      submissionError.header = "Invalid Address";
      submissionError.detail =
        "Address can't be empty and needs to specify a City (separated with a comma (,)) !";
    }
    return submissionError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadProgress(20);
    try {
      let response;

      const submissionError = validate();
      if (submissionError.header !== "" && submissionError.detail !== "") {
        setError(submissionError);
      } else {
        if (merchant) {
          let image = profileImage;
          if (!(typeof image === "string" || image instanceof String)) {
            image = await uploadAndGetURL(profileImage);
          }

          response = await API.put(`/merchant/${merchant.merchantid}`, {
            MerchantName: name,
            MerchantAddress: address,
            MerchantPhone: phone,
            MerchantImage: image,
          });
        } else {
          response = await API.post(`/merchant`, {
            CustomerID: customerID,
            MerchantName: name,
            MerchantAddress: address,
            MerchantPhone: phone,
          });
        }
        setUploadProgress(100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageChangeHandler = (name, value) => {
    setProfileImage(value);
  };

  return (
    <div className="profile-menu">
      {error && (
        <Alert
          onFinishError={setError}
          header={error.header}
          detail={error.detail}
        />
      )}
      <LoadingBar
        height={8}
        color="#fde047"
        progress={uploadProgress}
        onLoaderFinished={() => setUploadProgress(0)}
      />
      <div
        className={`fixed w-screen h-screen bg-black bg-opacity-20 top-0 left-0 ${
          uploadProgress > 0 ? "block" : "hidden"
        }`}
      />
      <div className="title text-3xl border-b-2">Merchant</div>
      <div className="content container mt-4 mb-12">
        <div className="flex flex-row">
          <div className="left-side basis-2/3">
            <div className="biodata container w-11/12">
              <strong className="text-lg">Biodata</strong>
              <form action="" method="post">
                <div className="name-container my-2">
                  <p htmlFor="name">Name</p>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="rounded-md border w-full p-1"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="address-container my-2">
                  <p htmlFor="address">Address</p>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="rounded-md border w-full p-1"
                    defaultValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="phone-container my-2">
                  <p htmlFor="phone">Phone Number</p>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="rounded-md border w-full p-1"
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <p id="status"></p>
              </form>
            </div>
          </div>
          <div className="right-side basis-1/3">
            <div className="right-container flex flex-col">
              <img
                className="profile-img aspect-square object-cover rounded-md"
                src={selectImage(profileImage)}
                alt=""
              />
              <div className="button-container flex justify-center mt-4">
                <UploadButton
                  name="customerimage"
                  id="customerimage"
                  onFileSelect={imageChangeHandler}
                >
                  Edit
                </UploadButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button id="submitBtn" type="submit" onClick={(e) => handleSubmit(e)}>
        {buttonText}
      </Button>
    </div>
  );
};

export default MerchantMenu;
