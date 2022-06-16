import axios from "axios";
import { useContext, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Alert from "../components/UI/alert/Alert";
import Button from "../components/UI/button/Button";
import Input from "../components/UI/input/Input";
import { APIContext, UserContext } from "../context/context";

const loginInfoReducer = (state, data) => {
  return { ...state, ...data };
};

const LoginPage = () => {
  const { onUserLogin } = useContext(UserContext);
  const { API_URL } = useContext(APIContext);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loginInfoState, dispatchLoginInfo] = useReducer(loginInfoReducer, {
    email: "",
    password: "",
  });

  const formValueHandler = (name, value) => {
    dispatchLoginInfo({ [name]: value });
  };

  const navigate = useNavigate();

  const { email, password } = loginInfoState;

  const validateFormFields = () => {
    const submissionError = {
      header: "",
      detail: "",
    };

    const { email, password } = loginInfoState;

    if (email.trim().length === 0 || !email.trim().includes("@")) {
      submissionError.header = "Invalid Email";
      submissionError.detail = "Email Can't be Empty and must contain an '@' !";
    } else if (password.trim().length === 0) {
      submissionError.header = "Invalid Password";
      submissionError.detail = "Password Can't be Empty !";
    }
    return submissionError;
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const submissionError = validateFormFields();

    const { email, password } = loginInfoState;

    if (submissionError.header !== "" && submissionError.detail !== "") {
      setError(submissionError);
    } else {
      const URL = `${API_URL}user/login`;
      const body = {
        Email: email.toLowerCase(),
        Password: password,
      };
      setUploadProgress(20);
      try {
        const loginResponse = await axios.post(URL, body);
        const data = loginResponse.data.data.returned;

        if (loginResponse.data.status === "success") {
          onUserLogin(
            data.customerID,
            data.customerName,
            data.customerImage,
            data.merchantID === null ? "" : data.merchantID
          );
          setUploadProgress(100);
          setTimeout(() => {
            navigate("/home");
          }, 500);
        } else {
          setUploadProgress(100);
          submissionError.header = "Wrong Credentials";
          submissionError.detail = "Either your email or password is wrong";
          setError(submissionError);
        }
      } catch (error) {
        setUploadProgress(100);
        submissionError.header = "Server Error";
        submissionError.detail = "Something went wrong with the server";
        setError(submissionError);
      }
    }
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
        <div className="col-span-8 ml-64 my-auto w-4/12 flex flex-col gap-8">
          <h1 className="text-3xl font-bold">Login to PAPIKATERING</h1>

          <form className="w-full" onSubmit={loginHandler}>
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
            <Button type="submit">LOGIN</Button>
          </form>

          <div className="font-bold">
            Not Registered Yet?{" "}
            <Link
              to={"/register"}
              className="text-primary focus:outline-none hover:underline"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
