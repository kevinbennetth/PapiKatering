import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/UI/alert/Alert";
import Button from "../components/UI/button/Button";
import ErrorMessage from "../components/UI/error/ErrorMessage";
import Input from "../components/UI/input/Input";
import APIContext from "../context/api-context";

const LoginPage = () => {
  const APICtx = useContext(APIContext);
  const [error, setError] = useState(null);

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
          className="w-3/12 object-cover object-left"
        />
        <div className="col-span-8 m-auto w-4/12 flex flex-col gap-8">
          <h1 className="text-3xl font-bold">Login to PAPIKATERING</h1>

          <form action="" className="w-full">
            <div className="my-8">
              <p className="text-lg font-bold my-3">Email Address</p>
              <Input type="text" name="email" id="email" color="gray" />
            </div>

            <div className="my-8">
              <div className="flex flex-row justify-between items-center">
                <p className="text-lg font-bold my-3">Password</p>
                <Link to="" className="text-emerald-600">
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                id="password"
                color="gray"
              />
            </div>
            <Button>LOGIN</Button>
          </form>

          <div className="font-bold">
            Not Registered Yet?
            <Link to={"/register"} className="text-emerald-600">
              {" "}
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
