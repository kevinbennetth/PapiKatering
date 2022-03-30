import React from "react";

export default function MenuCard(props) {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-6">{props.menu.day}</h3>
      <div className="flex flex-col gap-6">
        {props.menu.menuItem.map((menuItem) => (
          <div className="flex flex-row gap-8 items-center" key={menuItem.id}>
            <img
              src={menuItem.image}
              alt=""
              className="object-cover w-24 h-24 rounded-md"
            />
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <h4 className="font-bold text-lg">{menuItem.name}</h4>
                <span className="font-semibold bg-yellow-300 px-4 py-0.5 rounded w-1/2 text-center">
                  {menuItem.time}
                </span>
              </div>
              <p>{menuItem.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
