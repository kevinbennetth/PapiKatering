import axios from "axios";
import React from "react";
import { useContext } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { APIContext, PacketContext } from "../../../context/context";

export default function HPackageCard(props) {
  const { API_URL } = useContext(APIContext);
  const { onSelectPacket } = useContext(PacketContext);
  const navigate = useNavigate();

  const editHandler = () => {
    onSelectPacket(props.packet.packetid);
    navigate("/addpacket");
    props.onUpdate();
  };

  const deleteHandler = async () => {
    const URL = `${API_URL}packet/${props.packet.packetid}`;
    try {
      await axios.delete(URL);
    props.onUpdate();
  } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative hover:scale-[101%] transition-transform">
      <Link
        to={`/detail/${props.packet.packetid}`}
        className="focus:outline-none flex flex-row shadow-md rounded-md items-center "
      >
        <img
          src={props.packet.packetimage}
          className="h-36 w-36 object-cover rounded-md"
          alt=""
        />
        <div className="flex flex-col gap-6 w-full px-8">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-3xl font-semibold">
              {props.packet.packetname}
            </h3>
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

          <p className="text-2xl">{"Rp. " + props.packet.packetprice}</p>
        </div>
      </Link>
      {props.type === "EDIT" && (
        <div className="flex flex-row absolute right-7 bottom-1/4">
          <FaEdit
            className="fill-primary mx-1 w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
            onClick={editHandler}
          />
          <FaTrashAlt
            className="fill-primary mx-1 w-5 h-5 hover:scale-105 transition-transform cursor-pointer"
            onClick={deleteHandler}
          />
        </div>
      )}
    </div>
  );
}
