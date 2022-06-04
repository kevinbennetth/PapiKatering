import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const day = [
  "",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function MenuCard(props) {
  const editHandler = () => {
    props.onUpdate(props.menu.menuid, "EDIT");
  };

  const deleteHandler = () => {
    props.onUpdate(props.menu.menuid, "DELETE");
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg w-fit m-2 min-w-[28rem]">
      <div className="flex flex-row justify-between items-center mb-6">
        <h3 className="text-xl font-bold">{day[props.menu.menuday]}</h3>
        <div className="flex flex-row gap-2 items-center">
          <button type="button" onClick={editHandler}>
            <FaEdit className="fill-primary w-6 h-6 " />
          </button>
          <button type="button" onClick={deleteHandler}>
            <FaTrashAlt className="fill-primary w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {props.menu.menuitems.map((menuItem) => (
          <div
            className="flex flex-row gap-6 items-center"
            key={menuItem.menuitemid}
          >
            <img
              src={
                menuItem.menuimage
              }
              alt=""
              className="object-cover w-24 h-24 rounded-md"
            />
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-row items-center justify-between w-full">
                <h4 className="font-bold text-lg">{menuItem.menuname}</h4>
                <span className="font-semibold bg-yellow-300 py-0.5 rounded w-4/12 text-center">
                  {menuItem.menutime}
                </span>
              </div>
              <p className="">{menuItem.menudescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
