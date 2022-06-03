import axios from "axios";
import { useContext, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/UI/alert/Alert";
import Button from "../components/UI/button/Button";
import Dropdown from "../components/UI/Dropdown";
import Input from "../components/UI/input/Input";
import TextArea from "../components/UI/input/TextArea";
import APIContext from "../context/api-context";

const registerInfoReducer = (state, data) => {
  return { ...state, ...data };
};

const RegisterPage = () => {
  const { API_URL } = useContext(APIContext);
  const [error, setError] = useState(null);
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
    const registerError = {
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
      registerError.header = "Invalid Name";
      registerError.detail = "Name Can't be Empty !";
    } else if (email.trim().length === 0 || !email.trim().includes("@")) {
      registerError.header = "Invalid Email";
      registerError.detail = "Email Can't be Empty and must contain an '@' !";
    } else if (phone.trim().length === 0) {
      registerError.header = "Invalid Phone";
      registerError.detail = "Phone Can't be Empty !";
    } else if (address.trim().length === 0) {
      registerError.header = "Invalid Address";
      registerError.detail = "Address Can't be Empty !";
    } else if (
      dob.trim().length === 0 ||
      new Date().getTime() - new Date(dob).getTime() < 0
    ) {
      registerError.header = "Invalid DoB";
      registerError.detail = "DoB Can't be Empty or be after today !";
    } else if (gender.trim() === "--Choose Gender--") {
      registerError.header = "Invalid Gender";
      registerError.detail = "Select a Gender !";
    } else if (password.trim().length === 0) {
      registerError.header = "Invalid Password";
      registerError.detail = "Password Can't be Empty !";
    } else if (password !== confirmPassword) {
      registerError.header = "Invalid Confirm Password";
      registerError.detail = "Password doesn't match !";
    }
    return registerError;
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    const registerError = validateFormFields();

    if (registerError.header !== "" && registerError.detail !== "") {
      setError(registerError);
    } else {
      const URL = `${API_URL}user/register`;
      const body = {
        CustomerName: name,
        CustomerEmail: email,
        CustomerPhone: phone,
        CustomerDOB: dob,
        CustomerGender: gender,
        CustomerPassword: password,
        CustomerAddress: address,
      };
      try {
        const registerResponse = await axios.post(URL, body);
        console.log(registerResponse);
      } catch (error) {
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
      <div className=" min-h-full absolute w-full bg-white top-0 flex flex-row z-10">
        <img
          src="https://images2.alphacoders.com/100/1003810.jpg"
          alt=""
          className="w-3/12 object-cover object-left bg-fixed"
        />
        <div className="col-span-8 mx-auto my-32 w-4/12 flex flex-col gap-8">
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
                options={["--Choose Gender--", "Male", "Female"]}
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
            Already have an account?
            <Link
              to="/login"
              className="text-emerald-600 hover:text-emerald-700"
            >
              {" "}
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
