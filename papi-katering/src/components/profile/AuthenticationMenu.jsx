import { useState } from "react";
import API from "../../apis/API";
import Alert from "../UI/alert/Alert";
import Button from "../UI/button/Button";

const AuthenticationMenu = (props) => {
  const custID = props.custID;
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);

  const validate = () => {
    const submissionError = { header: "", detail: "" };
    if (password.trim().length === 0) {
      submissionError.header = "Invalid Password";
      submissionError.detail = "Password can't be empty !";
    } else if (confirm !== password) {
      submissionError.header = "Invalid Confirm Password";
      submissionError.detail = "Confirm Password doesn't match the password";
    }
    console.log(submissionError);
    return submissionError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionError = validate();

    if (submissionError.header !== "" && submissionError.detail !== "") {
      setError(submissionError);
    } else {
      try {
        const response = await API.put(`/user/${custID}`, {
          CustomerPassword: password,
        });

        if (response.data.status === "success") {
          setPassword("");
          setConfirm("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="authentication-menu">
      {error && (
        <Alert
          onFinishError={setError}
          header={error.header}
          detail={error.detail}
        />
      )}
      <div className="title text-3xl border-b-2">Authentication</div>
      <form action="" method="post" className="w-7/12 mt-4 mb-12">
        <div className="new-pass-container">
          <p>New Password</p>
          <input
            type="password"
            name="pass"
            id="pass"
            className="rounded-md border w-full p-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="confirm-pass-container mt-4">
          <p>Confirm New Password</p>
          <input
            type="password"
            name="confirm-pass"
            id="confirm-pass"
            className="rounded-md border w-full p-1 mb-8"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <p id="status"></p>
        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default AuthenticationMenu;
