import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HPackageCard(props) {
  console.log(props.packet)
  return (
    <Link to={`/detail/${props.packet.packetid}`} className="flex flex-row shadow-md rounded-md items-center hover:scale-[101%] transition-transform">
      <img
        src={props.packet.packetimage}
        className="h-36 w-36 object-cover rounded-md"
        alt=""
      />
      <div className="flex flex-col gap-6 w-full px-8">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-3xl font-semibold">{props.packet.packetname}</h3>
          <div className="flex flex-row items-center gap-2">
            <p>Terjual {" " + props.packet.sold}</p>
            <BsFillStarFill className="text-yellow-300 w-5 h-5" />
            <p>
              {props.packet.packetratingaverage +
                " (" +
                props.packet.packetratingcount +
                " ulasan)"}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <p className="text-2xl">{"Rp. " + props.packet.packetprice}</p>
          {props.type === "EDIT" && (
            <div className="flex flex-row">
              <FaEdit className="fill-emerald-600 mx-1 w-5 h-5" />
              <FaTrashAlt className="fill-emerald-600 mx-1 w-5 h-5" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
