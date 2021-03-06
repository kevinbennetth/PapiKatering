import axios from "axios";
import { useContext, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Alert from "../components/UI/alert/Alert";
import Button from "../components/UI/button/Button";
import Dropdown from "../components/UI/Dropdown";
import Input from "../components/UI/input/Input";
import TextArea from "../components/UI/input/TextArea";
import { APIContext, UserContext } from "../context/context";

const registerInfoReducer = (state, data) => {
  return { ...state, ...data };
};

const RegisterPage = () => {
  const { onUserLogin } = useContext(UserContext);
  const { API_URL } = useContext(APIContext);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [registerInfoState, dispatchRegisterInfo] = useReducer(
    registerInfoReducer,
    {
      name: "",
      email: "",
      phone: "",
      address: "",
      dob: "",
      gender: "",
      password: "",
      confirmPassword: "",
    }
  );
  const navigate = useNavigate();

  const {
    name,
    email,
    phone,
    address,
    dob,
    gender,
    password,
    confirmPassword,
  } = registerInfoState;

  const validateFormFields = () => {
    const submissionError = {
      header: "",
      detail: "",
    };

    const {
      name,
      email,
      phone,
      address,
      dob,
      gender,
      password,
      confirmPassword,
    } = registerInfoState;

    if (name.trim().length === 0) {
      submissionError.header = "Invalid Name";
      submissionError.detail = "Name Can't be Empty !";
    } else if (
      email.trim().length === 0 ||
      !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      submissionError.header = "Invalid Email";
      submissionError.detail = "Email is not in the correct format !";
    } else if (phone.trim().length < 11 || phone.trim().length > 13) {
      submissionError.header = "Invalid Phone";
      submissionError.detail = "Phone has to be between 11 - 13 digits !";
    } else if (address.trim().length === 0) {
      submissionError.header = "Invalid Address";
      submissionError.detail = "Address Can't be Empty !";
    } else if (
      dob.trim().length === 0 ||
      new Date().getTime() - new Date(dob).getTime() < 0
    ) {
      submissionError.header = "Invalid DoB";
      submissionError.detail = "DoB Can't be Empty or be after today !";
    } else if (gender.trim() === "default") {
      submissionError.header = "Invalid Gender";
      submissionError.detail = "Select a Gender !";
    } else if (password.trim().length === 0) {
      submissionError.header = "Invalid Password";
      submissionError.detail = "Password Can't be Empty !";
    } else if (password !== confirmPassword) {
      submissionError.header = "Invalid Confirm Password";
      submissionError.detail = "Password doesn't match !";
    }
    return submissionError;
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    const submissionError = validateFormFields();

    const { name, email, phone, address, dob, gender, password } =
      registerInfoState;

    if (submissionError.header !== "" && submissionError.detail !== "") {
      setError(submissionError);
    } else {
      setUploadProgress(20);
      const URL = `${API_URL}user/register`;
      const body = {
        CustomerName: name,
        CustomerEmail: email.toLowerCase(),
        CustomerPhone: phone,
        CustomerDOB: dob,
        CustomerGender: gender,
        CustomerPassword: password,
        CustomerAddress: address,
      };
      try {
        const registerResponse = await axios.post(URL, body);

        if (registerResponse.data.status === "Success") {
          const data = registerResponse.data;
          onUserLogin(
            data.customerID,
            data.customerName,
            data.customerImage,
            ""
          );
          setUploadProgress(100);
          setTimeout(() => {
            navigate("/quiz");
          }, 500);
        } else if (registerResponse.data.status === "Taken") {
          setUploadProgress(100);
          setError({
            header: "Email Taken",
            detail: "There's already an account with that email !",
          });
        }
      } catch (error) {
        setUploadProgress(100);
        console.log(error);
      }
    }
  };

  const formValueHandler = (name, value) => {
    dispatchRegisterInfo({ [name]: value });
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
      <div className="min-h-full absolute w-full bg-white top-0 flex flex-row z-10">
        <div
          className={`fixed w-screen h-screen bg-black bg-opacity-20 top-0 left-0 z-50 ${
            uploadProgress > 0 ? "block" : "hidden"
          }`}
        />
        <LoadingBar
          height={8}
          color="#fde047"
          progress={uploadProgress}
          onLoaderFinished={() => setUploadProgress(0)}
        />
        <img
          src="https://images2.alphacoders.com/100/1003810.jpg"
          alt=""
          className="w-3/12 object-cover object-left"
        />
        <div className="col-span-8 ml-64 my-32 w-4/12 flex flex-col gap-8">
          <h1 className="text-3xl font-bold">Register to PAPIKATERING</h1>

          <form className="w-full" onSubmit={registerHandler}>
            <div className="my-8">
              <p className="text-lg font-bold my-3">Name</p>
              <Input
                type="text"
                name="name"
                id="name"
                color="gray"
                value={name}
                onChange={formValueHandler}
              />
            </div>

            <div className="my-8">
              <p className="text-lg font-bold my-3">Email Address</p>
              <Input
                type="text"
                name="email"
                id="email"
                color="gray"
                value={email}
                onChange={formValueHandler}
              />
            </div>

            <div className="my-8">
              <p className="text-lg font-bold my-3">Phone Number</p>
              <Input
                type="text"
                name="phone"
                id="phone"
                color="gray"
                value={phone}
                onChange={formValueHandler}
              />
            </div>

            <div className="my-8">
              <p className="text-lg font-bold my-3">Address</p>
              <TextArea
                name="address"
                id="address"
                color="gray"
                rows={5}
                value={address}
                onChange={formValueHandler}
              />
            </div>

            <div className="my-8">
              <p className="text-lg font-bold my-3">Date of Birth</p>
              <Input
                type="date"
                name="dob"
                id="dob"
                color="gray"
                value={dob}
                onChange={formValueHandler}
              />
            </div>

            <div className="my-8">
              <p className="text-lg font-bold my-3">Gender</p>
              <Dropdown
                name="gender"
                id="gender"
                color="gray"
                value={gender}
                options={[
                  { show: "--Choose Gender--", value: "default" },
                  { show: "Male", value: "Male" },
                  { show: "Female", value: "Female" },
                ]}
                onChange={formValueHandler}
              />
            </div>

            <div className="my-8">
              <p className="text-lg font-bold my-3">Password</p>
              <Input
                type="password"
                name="password"
                id="password"
                color="gray"
                value={password}
                onChange={formValueHandler}
              />
            </div>

            <div className="my-8">
              <p className="text-lg font-bold my-3">Confirm Password</p>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                color="gray"
                value={confirmPassword}
                onChange={formValueHandler}
              />
            </div>
            <Button type="submit">Register</Button>
          </form>

          <div className="have-account font-bold">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary focus:outline-none hover:underline"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
