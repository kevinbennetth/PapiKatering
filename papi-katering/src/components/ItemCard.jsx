import React from "react";
import { AiFillStar } from "react-icons/ai";

function ItemCard({ image, name, place, rate, fee }) {
  return (
    <div className="shadow-lg rounded-lg w-60 mx-2 my-4 cursor-pointer hover:scale-105 transition-transform">
      <img src={image} className="h-48 object-cover rounded-t-lg w-full" alt="" />
      <div className="p-5 bg-white rounded-b-lg">
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold">{name}</h4>
          <div className="flex flex-row items-center justify-between">
            <p>{place}</p>
            <div className="flex flex-row items-center gap-1">
              <AiFillStar className="fill-yellow-400 w-5 h-5" />
              <p>{rate}</p>
            </div>
          </div>
          <p>{fee}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default ItemCard;
