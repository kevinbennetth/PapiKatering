import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import API from "../../apis/API";
import PaymentModal from "../modal/PaymentModal";
import LoadingBar from "react-top-loading-bar";

const PaymentsMenu = (props) => {
  const custID = props.custID;
  const [payments, setPayments] = useState(null);
  const [modal, setModal] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedPayment, setSelectedPayment] = useState(null);

  const fetchData = async () => {
    try {
      const response = await API.get(`/payment?customerID=${custID}`);
      setPayments(response.data.data.payments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [payments]);

  const showModal = (modalType) => {
    setModal(modalType);
  };

  const hideModal = () => {
    setModal(null);
  };

  const handleAdd = (e) => {
    setSelectedPayment(null);
    showModal("payment");
  };

  const handleEdit = (e, payment) => {
    setSelectedPayment(payment);
    showModal("payment");
  };

  const handleDelete = async (e, paymentid) => {
    setUploadProgress(20);
    try {
      const response = await API.delete(`/payment/${paymentid}`);
    } catch (error) {
      console.log(error);
    }
    setUploadProgress(100);
    hideModal();
  };

  return (
    <div className="payments-menu">
      <PaymentModal
        show={modal === "payment"}
        hideModal={hideModal}
        custID={custID}
        payment={selectedPayment}
        onChangeUpload={setUploadProgress}
      />
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

      <div className="flex flex-row border-b-2">
        <div className="title basis-4/5 text-3xl">Payments</div>
        <button
          className="add basis-1/5 flex flex-row text-lg font-bold items-center justify-end hover:opacity-60"
          onClick={(e) => handleAdd(e)}
        >
          <FaPlus className="fill-primary mx-1" />
          <p className="text-primary">Add Payment</p>
        </button>
      </div>

      <div className="payments container mt-4">
        {payments &&
          payments.map((payment) => (
            <div
              className="header flex flex-row justify-between bg-white my-4 py-4 px-8 rounded-md drop-shadow-md hover:scale-[101%] transition-transform"
              key={payment.paymentid}
            >
              <div className="payment w-4/5">
                <div className="title text-xl font-bold">
                  {payment.paymentname}
                </div>
                <p className="text-md mt-4">{payment.paymentnumber}</p>
              </div>
              <div className="flex flex-row">
                <FaEdit
                  className="fill-primary mx-1 w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
                  onClick={(e) => {
                    handleEdit(e, payment);
                  }}
                />
                <FaTrashAlt
                  className="fill-primary mx-1 w-5 h-5 hover:scale-105 transition-transform cursor-pointer"
                  onClick={(e) => {
                    handleDelete(e, payment.paymentid);
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PaymentsMenu;
