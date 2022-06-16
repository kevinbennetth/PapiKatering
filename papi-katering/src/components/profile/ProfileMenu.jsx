import { useContext, useEffect, useState } from "react";
import API from "../../apis/API";
import Button from "../UI/button/Button";
import {
  selectImage,
  uploadAndGetURL,
} from "../UI/button/firebase/uploadUtilities";
import UploadButton from "../UI/button/UploadButton";
import { UserContext } from "../../context/context";
import Alert from "../UI/alert/Alert";
import LoadingBar from "react-top-loading-bar";

const ProfileMenu = (props) => {
  const { onUserUpdate } = useContext(UserContext);

  const customerID = props.custID;
  const [customer, setCustomer] = useState("");
  const [name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const formatDate = (date) => {
    date = new Date(date);

    const year = date.getFullYear().toString();

    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    } else {
      month = month.toString();
    }

    var day = date.getDate();
    if (day < 10) {
      day = "0" + day.toString();
    } else {
      day = day.toString();
    }

    const dateString = year + "-" + month + "-" + day;
    return dateString;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/user/${customerID}`);
        const customerResponse = response.data.data.customerData;
        customerResponse.customerdob = formatDate(customerResponse.customerdob);
        setCustomer(customerResponse);
        setName(customerResponse.customername);
        setDOB(customerResponse.customerdob);
        setGender(customerResponse.customergender);
        setEmail(customerResponse.customeremail);
        setPhone(customerResponse.customerphone);
        setProfileImage(customerResponse.customerimage);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const validate = () => {
    const submissionError = { header: "", detail: "" };
    console.log(name);
    if (name.trim().length === 0) {
      submissionError.header = "Invalid Name";
      submissionError.detail = "Name Can't be Empty !";
    } else if (
      email.trim().length === 0 ||
      !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      submissionError.header = "Invalid Email";
      submissionError.detail = "Email can not be empty or have incorrect format !";
    } else if (phone.trim().length < 11 || phone.trim().length > 13) {
      submissionError.header = "Invalid Phone";
      submissionError.detail = "Phone has to be between 11 - 13 digits !";
    } else if (
      DOB.trim().length === 0 ||
      new Date().getTime() - new Date(DOB).getTime() < 0
    ) {
      submissionError.header = "Invalid DoB";
      submissionError.detail = "DoB Can't be Empty or be after today !";
    } else if (gender.trim() === "default") {
      submissionError.header = "Invalid Gender";
      submissionError.detail = "Select a Gender !";
    }
    return submissionError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionError = validate();
    try {
      if (submissionError.header !== "" && submissionError.detail !== "") {
        setError(submissionError);
      } else {
        setUploadProgress(20);
        let image = profileImage;
        if (!(typeof image === "string" || image instanceof String)) {
          image = await uploadAndGetURL(profileImage);
        }
        const response = await API.put(`/user/${customerID}`, {
          CustomerName: name,
          CustomerDOB: DOB,
          CustomerGender: gender,
          CustomerEmail: email,
          CustomerPhone: phone,
          CustomerImage: image,
        });
        setUploadProgress(100);
        if (response.data.status === "success") {
          onUserUpdate(name, image);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageChangeHandler = (name, value) => {
    setProfileImage(value);
  };

  return (
    <>
      {error && (
        <Alert
          onFinishError={setError}
          header={error.header}
          detail={error.detail}
        />
      )}
      <div className="profile-menu">
        <LoadingBar
          height={8}
          color="#fde047"
          progress={uploadProgress}
          onLoaderFinished={() => setUploadProgress(0)}
        />
        <div
          className={`fixed w-screen h-screen bg-black bg-opacity-20 top-0 left-0 z-50 ${
            uploadProgress > 0 ? "block" : "hidden"
          }`}
        />
        <div className="title text-3xl border-b-2">Profile</div>
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
                      value={name}
                      className="rounded-md border w-full p-1"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="dob-container my-2">
                    <p htmlFor="dob">Date of Birth</p>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      defaultValue={DOB}
                      className="rounded-md border w-full p-1"
                      onChange={(e) => setDOB(e.target.value)}
                    />
                  </div>

                  <div className="gender-container my-2">
                    <p htmlFor="gender">Gender</p>
                    <select
                      name="gender"
                      id="gender"
                      className="rounded-md border w-full px-1 bg-transparent py-2"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="Male" selected={gender === "Male"}>
                        Male
                      </option>
                      <option value="Female" selected={gender === "Female"}>
                        Female
                      </option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="contact container w-11/12 mt-8">
                <strong className="text-lg">Contact</strong>
                <form action="" method="post">
                  <div className="email-container my-2">
                    <p htmlFor="email">Email</p>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={email}
                      className="rounded-md border w-full p-1"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="phone-container my-2">
                    <p htmlFor="phone">Phone Number</p>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={phone}
                      className="rounded-md border w-full p-1"
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
                  src={selectImage(profileImage, "PROFILE")}
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
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Save
        </Button>
      </div>
    </>
  );
};

export default ProfileMenu;
