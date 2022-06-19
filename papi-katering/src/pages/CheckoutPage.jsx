import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Dropdown from "../components/UI/Dropdown";
import AddressSelectionModal from "../components/UI/modal/AddressSelectionModal";
import { APIContext, CartContext, UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import Alert from "../components/UI/alert/Alert";
import LoadingBar from "react-top-loading-bar";
import Input from "../components/UI/input/Input";

const transformDate = (date) => {
  let month = (date.getMonth() + 1).toString();
  month = month.length == 1 ? 0 + month : month;
  return `${date.getFullYear()}-${month}-${date.getDate()}`;
};

export default function CheckoutPage() {
  const { customerID } = useContext(UserContext);
  const { cart, onUpdateCart } = useContext(CartContext);

  const { API_URL } = useContext(APIContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [cartItem, setCartItem] = useState();
  const [dayCount, setDayCount] = useState(1);
  const [startDate, setStartDate] = useState(() => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 2);
    return transformDate(startDate);
  });

  const [selectedPayment, setSelectedPayment] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});

  const [fetch, setFetch] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const calculateTotal = () => {
    return cartItem.packetprice * cart.orderquantity * dayCount;
  };

  const calculateGrandTotal = () => {
    return calculateTotal() + 20000;
  };

  const changeAddressHandler = () => {
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);

  const hideModalHandler = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (cart.packetid === "") {
      setError({
        header: "No Packet",
        detail: "You haven't ordered a packet",
      });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      const fetchData = async () => {
        setFetch(true);
        const paymentMethodURL = `${API_URL}payment?customerID=${parseInt(
          customerID
        )}`;
        const addressURL = `${API_URL}address?customerID=${customerID}`;
        const packetURL = `${API_URL}packet/${cart.packetid}?merchantData=true`;

        try {
          const responsePayment = await axios.get(paymentMethodURL);
          const payment = responsePayment.data.data.payments.map((payment) => {
            return { value: payment.paymentid, show: payment.paymentname };
          });
          if (cart.packetid !== "" && payment.length === 0) {
            setError({
              header: "No Payment",
              detail: "You don't have a payment method yet !",
            });
            setTimeout(() => {
              navigate(-1);
            }, 2000);
          }
          setPaymentMethod(payment);
          setSelectedPayment(payment[0].value);

          const responseAddress = await axios.get(addressURL);
          const addr = responseAddress.data;
          setAddress(addr);
          setSelectedAddress(addr[0]);

          if (cart.packetid !== "" && addr.length === 0) {
            setError({
              header: "No Address",
              detail: "You don't have an address yet !",
            });
            setTimeout(() => {
              navigate(-1);
            }, 2000);
          }

          const responsePacket = await axios.get(packetURL);
          setCartItem(responsePacket.data);

          setFetch(false);
        } catch (error) {}
      };
      fetchData();
    }
  }, []);

  const updateSelectedAddress = (selectedAddress) => {
    setSelectedAddress(selectedAddress);
    hideModalHandler();
  };

  const paymentChangeHandler = (_, value) => {
    setSelectedPayment(parseInt(value));
  };

  const validateForm = () => {
    const submissionError = {
      header: "",
      detail: "",
    };

    const twoDays = 1000 * 60 * 60 * 24 * 2;

    const twoDaysDate = new Date();
    twoDaysDate.setDate(twoDaysDate.getDate() + 3);
    twoDaysDate.setHours(7, 0, 0, 0);

    if (
      startDate.trim().length === 0 ||
      !(twoDaysDate.getTime() - new Date(startDate).getTime() < twoDays)
    ) {
      submissionError.header = "Invalid Start Date";
      submissionError.detail =
        "Start date has to be filled and at least 2 days from now !";
    } else if (dayCount < 1) {
      submissionError.header = "Invalid Day Count";
      submissionError.detail = "The order has to be at least 1 day !";
    }

    return submissionError;
  };

  const submitHandler = async () => {
    const API = `${API_URL}order`;
    const submissionError = validateForm();
    if (submissionError.header !== "" && submissionError.detail !== "") {
      setError(submissionError);
    } else {
      const orderObject = {
        packetid: cartItem.packetid,
        merchantid: cartItem.merchant.merchantid,
        customerid: customerID,
        addressid: selectedAddress.addressid,
        paymentid: selectedPayment,
        orderdaycount: parseInt(dayCount),
        orderdate: startDate,
        orderadditionalprice: 20000,
        orderquantity: cart.orderquantity,
      };

      try {
        setUploadProgress(20);
        const response = await axios.post(API, orderObject);
        onUpdateCart({
          packetid: "",
          merchantid: "",
          customerid: "",
          orderdaycount: "",
          orderquantity: "",
        });
        setSelectedAddress({});
        setSelectedPayment({});
        setUploadProgress(100);
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const startDateValueHandler = (_, value) => {
    setStartDate(value);
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
      {!fetch && cartItem && (
        <div className="flex flex-row px-12 py-20 gap-20 bg-gray-50 items-start">
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
          <AddressSelectionModal
            show={showModal}
            onHideModal={hideModalHandler}
            address={address}
            selectedAddress={selectedAddress}
            onUpdateAddress={updateSelectedAddress}
          />
          <div className="flex flex-col gap-10 w-2/3">
            <h1 className="font-bold text-3xl">Checkout</h1>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-medium">Shipping address</h2>
                <div
                  className="flex flex-row items-center gap-2 cursor-pointer"
                  onClick={changeAddressHandler}
                >
                  <p className="font-semibold">Change Address</p>
                  <FaEdit className="fill-primary mx-1 w-6 h-6" />
                </div>
              </div>
              <hr className="border-black" />
              <div className="mt-4 flex flex-col gap-4 p-6 shadow-lg rounded-md bg-white">
                <div className="title text-xl font-bold">
                  {selectedAddress.addressname}
                </div>
                <p className="text-md">{selectedAddress.addressdetails}</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-xl font-medium">Order</h2>
              <hr className="border-black" />
              <div className="flex flex-col gap-8">
                <h3 className="font-medium text-xl">
                  {cartItem.merchant.merchantname}
                </h3>
                <div className="flex flex-row gap-10 items-center">
                  <div className="relative w-1/6">
                    <img
                      className="w-full aspect-square object-cover rounded"
                      src={cartItem.packetimage}
                      alt=""
                    />
                    <p className="absolute right-2 top-2 bg-primary text-center p-2 text-white font-bold w-10 rounded-full aspect-square">
                      {cart.orderquantity}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 w-4/6 ">
                    <h4 className="font-bold text-2xl">
                      {cartItem.packetname}
                    </h4>
                    <div className="flex items-center w-1/2">
                      <h4 className="w-1/2">Start Date: </h4>
                      <Input
                        type="date"
                        name="startdate"
                        id="startdate"
                        className="border-2 rounded-md"
                        value={startDate}
                        onChange={startDateValueHandler}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-1/6">
                    <h4 className="font-bold text-2xl w-full text-right">
                      Rp {" " + cartItem.packetprice}
                    </h4>
                    <div className="flex flex-row-reverse items-center gap-1">
                      <p className="text-xl text-right w-1/2">Days</p>
                      <input
                        type="number"
                        min={1}
                        value={dayCount}
                        onChange={(e) => {
                          setDayCount(e.target.value);
                        }}
                        className="w-1/3 border-2 rounded text-xl py-1 text-center border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <hr className="border-gray-400" />
                  <div className="flex flex-row justify-between">
                    <p className="font-semibold text-xl">Sub Total</p>
                    <p className="font-semibold text-xl">
                      {"Rp " + calculateTotal()}
                    </p>
                  </div>

                  <hr className="border-black" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-8 shadow-lg gap-8 rounded-md w-1/3 bg-white">
            <h2 className="text-xl font-medium">Order Summary</h2>
            <div className="grid grid-cols-2 gap-y-5">
              <p>Total Price</p>
              <p className="justify-self-end">{"Rp " + calculateTotal()}</p>
              <p>Shipping</p>
              <p className="justify-self-end">Rp 20000</p>
              <hr className="col-span-2 border-t-2 border-gray-300" />
              <p className="font-bold">Grand Total</p>
              <p className="justify-self-end font-bold">
                {"Rp " + calculateGrandTotal()}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-bold">Payment Method</p>
              <Dropdown
                name="payment"
                id="payment"
                color="white"
                value={selectedPayment}
                options={paymentMethod}
                onChange={paymentChangeHandler}
              />
            </div>
            <button
              className="py-3 rounded text-white font-bold bg-primary w-full hover:opacity-75"
              onClick={submitHandler}
            >
              Order
            </button>
          </div>
        </div>
      )}
    </>
  );
}
