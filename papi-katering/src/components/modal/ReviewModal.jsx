import React from "react";
import BaseModal from "./BaseModal";

export default function ReviewModal(props) {
  return (
    <BaseModal show={props.show} hideModal={props.hideModal}>
      <h3 className="text-xl font-bold mb-6">Add Review</h3>
      <div className="flex flex-col gap-4">
        <label htmlFor="score">Review Score</label>
        <select
          defaultValue={5}
          name="score"
          className="w-min bg-white focus:outline-none cursor-pointer border-black border-opacity-50 border-2 p-2 rounded-md"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="">Description</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="focus:outline-none resize-none border-black border-opacity-50 border-2 p-2 rounded-md"
        ></textarea>

        <button className="px-16 py-3 rounded text-white font-bold bg-primary self-start mt-2 hover:opacity-75">
          Save
        </button>
      </div>
    </BaseModal>
  );
}
