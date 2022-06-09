import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Input from "../input/Input";

export default function PaginationButton(props) {

  
  
  const nextPage = () => {
    updatePage(props.currPage + 1);
  };

  const prevPage = () => {
    updatePage(props.currPage - 1);
  };

  const updatePage = (page) => {
    props.onUpdatePage(page);
  };

  return (
    <div className="flex flex-row items-center gap-2 justify-end">
      {props.currPage > 1 && (
        <AiOutlineLeft
          className="fill-primary mx-1 w-6 h-6 cursor-pointer"
          onClick={prevPage}
        />
      )}
      <p className="text-xl bg-primary text-white px-2 py-1 rounded-md">{props.currPage}</p>
      <p className="text-xl">...</p>
      <p className="text-xl">{props.maxPage}</p>
      {props.currPage < props.maxPage && (
        <AiOutlineRight
          className="fill-primary mx-1 w-6 h-6 cursor-pointer"
          onClick={nextPage}
        />
      )}
    </div>
  );
}
