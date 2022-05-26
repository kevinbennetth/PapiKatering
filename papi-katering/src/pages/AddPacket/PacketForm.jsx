import React from "react";
import { FaPlus } from "react-icons/fa";

export default function PacketForm(props) {
  return (
    <div className="flex flex-row w-full gap-20">
      <div className="flex flex-col items-center justify-center gap-6 w-1/2">
        <img
          src="https://www.expatica.com/app/uploads/sites/5/2014/05/french-food-1920x1080.jpg"
          alt=""
          className="w-1/2 object-cover rounded-md aspect-square"
        />
        <button
          className=" px-10 py-2 bg-primary hover:bg-emerald-700
                                    text-white font-bold rounded-md"
        >
          Edit
        </button>
      </div>
      <div className="flex flex-col w-1/2 gap-5 justify-center">
        <div className="flex flex-col gap-4">
          <p htmlFor="name">Packet Name</p>
          <input
            type="text"
            name="name"
            id="name"
            className="rounded-md border w-4/5 p-1 "
          />
        </div>
        <div className="flex flex-col gap-4">
          <p htmlFor="price">Price (per day)</p>
          <input
            type="text"
            name="price"
            id="price"
            className="rounded-md border w-4/5 p-1"
          />
        </div>

        <div className="flex flex-col gap-4">
          <p htmlFor="phone">Description</p>
          <textarea
            type="text"
            name="phone"
            id="phone"
            className="rounded-md border w-4/5 p-1 resize-none"
            rows="8"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between w-4/5">
            <p htmlFor="phone">Categories</p>
            <button
              className="flex flex-row font-bold items-center justify-end"
              onClick={() => props.showModal("category")}
            >
              <FaPlus className="fill-emerald-600 mx-1" />
              <p className="text-emerald-600">Add Categories</p>
            </button>
          </div>
          <div className="flex flex-row gap-4 flex-wrap">
            {props.packet.categories.map((category) => (
              <span
                key={category.id}
                className="bg-primary text-white px-4 py-1 rounded-full font-semibold"
              >
                {category.category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
