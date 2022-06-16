import { useEffect, useState } from "react";
import API from "../../apis/API";
import Alert from "../UI/alert/Alert";
import Button from "../UI/button/Button";
import BaseModal from "../UI/modal/BaseModal";

const PaymentModal = (props) => {
  const custID = props.custID;
  const selectedPayment = props.payment;

  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setName(() => (selectedPayment ? selectedPayment.paymentname : ""));
    setNumber(() => (selectedPayment ? selectedPayment.paymentnumber : ""));
  }, [selectedPayment]);

  const validate = () => {
    const submissionError = { header: "", detail: "" };
    if (name.trim().length === 0) {
      submissionError.header = "Invalid Name";
      submissionError.detail = "Name Can't be Empty !";
    } else if (number.trim().length !== 16) {
      submissionError.header = "Invalid Card Number";
      submissionError.detail = "Card Number must be 16 digits !";
    }

    return submissionError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let submissionError = validate();
      let response;
      if (submissionError.header !== "" && submissionError.detail !== "") {
        setError(submissionError);
      } else {
        let response;
        if (selectedPayment) {
          response = API.put(`/payment/${selectedPayment.paymentid}`, {
            name,
            cardNumber: number,
          });
        } else {
          response = API.post(`/payment/`, {
            customerID: custID,
            name,
            cardNumber: number,
          });
        }
        props.hideModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseModal show={props.show} onHideModal={props.hideModal}>
      {error && (
        <Alert
          onFinishError={setError}
          header={error.header}
          detail={error.detail}
        />
      )}
      <h3 className="text-lg font-bold">New Payment Method</h3>

      <form action="" method="post" className="mt-4">
        <h4 className="text-md font-bold">Payment Name</h4>
        <input
          type="text"
          name="paymentName"
          id="paymentName"
          className="rounded-md border w-full p-1"
          defaultValue={selectedPayment ? selectedPayment.paymentname : ""}
          onChange={(e) => setName(e.target.value)}
        />

        <h4 className="text-md font-bold mt-8">Card Number</h4>
        <input
          type="text"
          name="cardNo"
          id="cardNo"
          className="rounded-md border w-full p-1 mb-8"
          defaultValue={selectedPayment ? selectedPayment.paymentnumber : ""}
          onChange={(e) => setNumber(e.target.value)}
        />

        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </form>
    </BaseModal>
  );
};

export default PaymentModal;
