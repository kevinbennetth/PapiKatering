import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { APIContext } from "../../../context/context";
import Button from "../button/Button";

export default function OrderCard(props) {
  const { API_URL } = useContext(APIContext);
  const { order, type, status } = props;

  const processCatering = async () => {
    const URL = `${API_URL}order/${order.orderid}?status=1`;
    try {
      props.onChangeUpload(20);
      await axios.put(URL);
      props.onChangeUpload(100);
      props.onUpdateOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);

    return d.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className="flex flex-col bg-white p-8 rounded-md shadow-md hover:scale-[101%] transition-transform"
      key={order.orderid}
    >
      <Link
        to={`/detail/${order.packetid}`}
        className="visited:outline-none grid grid-cols-12"
      >
        <div className="card-header flex flex-row justify-between col-span-12 items-center">
          <div className="font-bold text-xl">
            {type === "Merchant" ? order.customername : order.merchantname}
          </div>
          <div className="font-bold text-md">{formatDate(order.orderdate)}</div>
        </div>
        <div className="content grid grid-cols-12 col-span-12 mt-8">
          <div className="food-img col-span-2">
            <img
              src={order.packetimage}
              alt=""
              className="profile-img-round aspect-square object-cover rounded-md w-[75%]"
            />
          </div>
          <div className="package col-span-6 flex flex-col justify-center">
            <div className="name font-bold text-2xl">{order.packetname}</div>
            <div className="price text-md">Rp. {order.packetprice}</div>
          </div>
          <div className="order-detail col-span-4 flex flex-col items-end">
            <div className="period text-lg">{order.orderdaycount} Days</div>
            <div className="font-bold mt-4">Total purchase</div>
            <div className="total-price">
              Rp.{" "}
              {order.packetprice * order.orderquantity * order.orderdaycount}
            </div>
          </div>
        </div>
      </Link>
      {type === "Merchant" && status === "Edit" && (
        <div className="self-end col-start-10 col-end-13 mt-4">
          <Button onClick={processCatering}>
            Finish
          </Button>
        </div>
      )}
    </div>
  );
}
