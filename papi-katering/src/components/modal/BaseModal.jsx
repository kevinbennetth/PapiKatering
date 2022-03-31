import React, { useRef, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";

export default function BaseModal(props) {
  const modalRef = useRef();

  console.log(props);

  const updateRef = (e) => {
    if (modalRef.current === e.target) {
      props.hideModal();
    }
  };

  return (
    props.show && (
      <div
        className="flex items-center justify-center h-full w-full bg-black bg-opacity-50 fixed top-0 left-0 z-50"
        ref={modalRef}
        onClick={updateRef}
      >
        <div className="bg-white rounded-lg p-12 shadow-lg relative">
          <FaRegTimesCircle
            className="absolute right-8 top-8 text-2xl cursor-pointer"
            onClick={props.hideModal}
          />
          {props.children}
        </div>
      </div>
    )
  );
}
