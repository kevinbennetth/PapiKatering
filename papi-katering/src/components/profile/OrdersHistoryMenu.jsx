import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../../apis/API";
import { UserContext } from "../../context/context";
import OrderCard from "../UI/card/OrderCard";
import Dropdown from "../UI/Dropdown";

const selectionValue = [
  { value: "Customer", show: "Customer" },
  { value: "Merchant", show: "Merchant" },
];

const OrdersHistoryMenu = (props) => {
  const custID = props.custID;
  const { merchantID } = useContext(UserContext);
  const [orders, setOrders] = useState("");
  const [type, setType] = useState("Customer");

  const fetchOrders = async () => {
    try {
      let response;
      if (type === "Customer") {
        response = await API.get(`/order?customerID=${custID}&status=finished`);
        setOrders(() => response.data);
      } else if (type === "Merchant") {
        if (merchantID !== "") {
          response = await API.get(
            `/order?merchantID=${merchantID}&status=finished`
          );
          setOrders(() => response.data);
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
      <div className="title text-3xl border-b-2">Order History</div>
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
            <Link
              to={`/detail/${order.packetid}`}
              key={order.orderid}
              className="visited:outline-none"
            >
              <OrderCard
                onUpdateOrder={updateHandler}
                order={order}
                type={type}
                key={order.orderid}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default OrdersHistoryMenu;
