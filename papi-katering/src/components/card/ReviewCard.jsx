import React from "react";
import { BsFillStarFill } from "react-icons/bs";

export default function ReviewCard(props) {
  return (
    <div className="flex flex-row p-8 shadow-md gap-8 rounded-md">
      <img src={props.review.image} className="w-16 h-16 rounded-full" alt="" />
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center">
          <h4 className="font-bold text-xl">{props.review.name}</h4>
          <div className="flex flex-row items-center">
            <BsFillStarFill className="text-yellow-300 w-6 h-6" />
            <h4>{props.review.rating}</h4>
          </div>
        </div>
        <h4 className="text-gray-800">{props.review.date}</h4>
        <p className="mt-6">{props.review.review}</p>
      </div>
    </div>
  );
}
