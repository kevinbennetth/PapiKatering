import { useState, useEffect } from "react";
import API from "../../apis/API";
import Alert from "../UI/alert/Alert";
import Button from "../UI/button/Button";
import BaseModal from "../UI/modal/BaseModal";

const AddressModal = (props) => {
  const custID = props.custID;
  const selectedAddress = props.address;

  const [name, setName] = useState(null);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setName(() => (selectedAddress ? selectedAddress.addressname : ""));
    setDetails(() => (selectedAddress ? selectedAddress.addressdetails : ""));
  }, [selectedAddress]);

  const validate = () => {
    const submissionError = { header: "", detail: "" };
    if (name.trim().length === 0) {
      submissionError.header = "Invalid Name";
      submissionError.detail = "Name Can't be Empty !";
    } else if (details.trim().length === 0) {
      submissionError.header = "Invalid Detail";
      submissionError.detail = "Detail Can't be Empty !";
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
        if (selectedAddress) {
          response = await API.put(`/address/${selectedAddress.addressid}`, {
            name,
            detail: details,
          });
        } else {
          response = await API.post(`/address/`, {
            customerID: custID,
            name,
            detail: details,
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
      <h3 className="text-lg font-bold">New Address</h3>

      <form action="" method="post" className="mt-4">
        <h4 className="text-md font-bold">Address Name</h4>
        <input
          type="text"
          name="addressName"
          id="addressName"
          className="rounded-md border w-full p-1"
          defaultValue={selectedAddress ? selectedAddress.addressname : ""}
          onChange={(e) => setName(e.target.value)}
        />

        <h4 className="text-md font-bold mt-8">Address Details</h4>
        <textarea
          name="addressDetails"
          id="addressDetails"
          cols="30"
          rows="5"
          className="rounded-md border w-full p-1 mb-8"
          defaultValue={selectedAddress ? selectedAddress.addressdetails : ""}
          onChange={(e) => setDetails(e.target.value)}
        />

        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </form>
    </BaseModal>
  );
};

export default AddressModal;
