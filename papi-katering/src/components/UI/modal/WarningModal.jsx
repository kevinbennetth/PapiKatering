import React from "react";
import Button from "../button/Button";
import NewBaseModal from "./NewBaseModal";

export default function WarningModal(props) {
  const onSelectHandler = (value) => {
    props.onSelect(value);
    props.onHideModal();
  };

  return (
    <NewBaseModal show={props.show} onHideModal={props.onHideModal}>
      <h1 className="text-2xl font-bold">{props.header}</h1>
      <p className="text-lg my-4">{props.detail}</p>
      <div className="flex flex-row gap-6 mt-8">
        <Button onClick={() => onSelectHandler(1)}>Yes</Button>
        <Button onClick={() => onSelectHandler(0)}>No</Button>
      </div>
    </NewBaseModal>
  );
}
