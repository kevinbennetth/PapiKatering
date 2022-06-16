import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ReviewCard(props) {
  const transformDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const editHandler = () => {
    const reviewID = props.review.reviewid;
    props.onEdit(reviewID);
  };

  const deleteHandler = () => {
    const reviewID = props.review.reviewid;
    props.onDelete(reviewID);
  };

  return (
    <div className="flex flex-row p-8 shadow-md gap-8 rounded-md hover:scale-[101%] transition-transform">
      <img
        src={props.review.customerimage}
        className="w-16 h-16 rounded-full aspect-square object-cover"
        alt=""
      />
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-5 items-center">
            <h4 className="font-bold text-xl">{props.review.customername}</h4>
            {props.canEdit && (
              <div className="flex flex-row items-center">
                <button type="button" onClick={editHandler}>
                  <FaEdit className="fill-primary mx-1 w-5 h-5 hover:scale-105 transition-transform cursor-pointer" />
                </button>
                <button onClick={deleteHandler}>
                  <FaTrashAlt className="fill-primary mx-1 w-5 h-5 hover:scale-105 transition-transform cursor-pointer" />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-row items-start gap-2">
            <BsFillStarFill className="text-yellow-300 w-6 h-6" />
            <h4 className="text-lg font-medium">{props.review.reviewrating}</h4>
          </div>
        </div>
        <h4 className="text-gray-800">
          {transformDate(props.review.reviewdate)}
        </h4>
        <p className="mt-6">{props.review.reviewdescription}</p>
      </div>
    </div>
  );
}
