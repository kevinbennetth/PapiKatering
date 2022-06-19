import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import API from "../../apis/API";
import { UserContext } from "../../context/context";
import OrderCard from "../UI/card/OrderCard";
import Dropdown from "../UI/Dropdown";

const selectionValue = [
  { value: "Customer", show: "Customer" },
  { value: "Merchant", show: "Merchant" },
];

const OngoingOrdersMenu = (props) => {
  const custID = props.custID;
  const { merchantID } = useContext(UserContext);
  const [orders, setOrders] = useState("");
  const [type, setType] = useState("Customer");
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchOrders = async () => {
    try {
      let response;
      if (type === "Customer") {
        response = await API.get(`/order?customerID=${custID}&status=ongoing`);
        setOrders(response.data);
      } else if (type === "Merchant") {
        if (merchantID !== "") {
          response = await API.get(
            `/order?merchantID=${merchantID}&status=ongoing`
          );
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [type]);

  const typeHandler = (_, value) => {
    setOrders(() => []);
    setType(value);
  };

  const updateHandler = () => {
    fetchOrders();
  };

  return (
    <div className="flex flex-col gap-4">
      
      
      <div className="title text-3xl border-b-2">Ongoing Subscription</div>
      <div className="self-end">
        <Dropdown
          name="ordertype"
          id="ordertype"
          color="white"
          value={type}
          options={selectionValue}
          onChange={typeHandler}
        />
      </div>
      <div className="orders mt-8 flex flex-col gap-6">
        {orders &&
          orders.map((order) => (
            <OrderCard
              onUpdateOrder={updateHandler}
              order={order}
              key={order.orderid}
              type={type}
              status={"Edit"}
              onChangeUpload={setUploadProgress}
            />
          ))}
      </div>
    </div>
  );
};

export default OngoingOrdersMenu;
