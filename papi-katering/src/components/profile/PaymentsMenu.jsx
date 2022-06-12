import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import API from "../../apis/API";
import PaymentModal from "../modal/PaymentModal";

const PaymentsMenu = (props) => {
  const custID = props.custID;
  const [payments, setPayments] = useState(null);
  const [modal, setModal] = useState(null);

  const [selectedPayment, setSelectedPayment] = useState(null);

  const fetchData = async () => {
    try {
      const response = await API.get(`/payment?customerID=${custID}`);
      setPayments(response.data.data.payments);
    } catch (err) {
      console.log(err);
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
    try {
      const response = API.delete(`/payment/${paymentid}`);
    } catch (error) {
      console.log(error);
    }
    hideModal();
  };

  return (
    <div className="payments-menu">
      <PaymentModal
        show={modal === "payment"}
        hideModal={hideModal}
        custID={custID}
        payment={selectedPayment}
      />

      <div className="flex flex-row border-b-2">
        <div className="title basis-4/5 text-3xl">Payments</div>
        <button
          className="add basis-1/5 flex flex-row text-lg font-bold items-center justify-end"
          onClick={(e) => handleAdd(e)}
        >
          <FaPlus className="fill-emerald-600 mx-1" />
          <p className="text-emerald-600">Add Payment</p>
        </button>
      </div>

      <div className="payments container mt-4">
        {payments &&
          payments.map((payment) => (
            <div
              className="header flex flex-row justify-between bg-white my-4 py-4 px-8 rounded-md drop-shadow-md"
              key={payment.paymentid}
            >
              <div className="payment w-4/5">
                <div className="title text-xl font-bold">
                  {payment.paymentname}
                </div>
                <p className="text-md mt-4">{payment.paymentnumber}</p>
              </div>
              <div className="options flex flex-row mt-2">
                <button
                  className="mx-2 h-0"
                  onClick={(e) => {
                    handleEdit(e, payment);
                  }}
                >
                  <FaEdit className="fill-emerald-600" />
                </button>
                <button
                  className="mx-2 h-0"
                  onClick={(e) => {
                    handleDelete(e, payment.paymentid);
                  }}
                >
                  <FaTrashAlt className="fill-emerald-600" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PaymentsMenu;
