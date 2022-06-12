import { useEffect, useState } from "react";
import Button from "../button/Button";
import BaseModal from "./BaseModal";

export default function AddressSelectionModal(props) {
  const { selectedAddress, address } = props;

  const [tempAddress, setTempAddress] = useState(selectedAddress);

  const changeTempAddress = (e) => {
    let selectedAddress = {};
    for (let i = 0; i < address.length; i++) {
      const addr = address[i];
      if (addr.addressid.toString() === e.target.id) {
        selectedAddress = addr;
      }
    }

    selectedAddress.addressid = parseInt(selectedAddress.addressid);
    setTempAddress(selectedAddress);
  };

  const selectHandler = () => {
    props.onUpdateAddress(tempAddress);
  };

  useEffect(() => {
    setTempAddress(selectedAddress);
  }, [selectedAddress]);

  return (
    <BaseModal show={props.show} onHideModal={props.onHideModal}>
      <h4 className="text-2xl font-bold mb-8">Select Address</h4>
      {address?.map((addr) => (
        <div
          className={`mb-5 flex flex-col gap-4 p-6 shadow-lg rounded-md bg-white cursor-pointer transition-transform w-full text-left relative ${
            addr.addressid.toString() === tempAddress.addressid.toString()
              ? "border-primary border-2"
              : ""
          }`}
          key={addr.addressid}
        >
          <div className="title text-xl font-bold">{addr.addressname}</div>
          <p className="text-md">{addr.addressdetails}</p>
          <div
            className="absolute w-full h-full bg-transparent top-0 left-0 rounded-md"
            id={addr.addressid}
            onClick={changeTempAddress}
          />
        </div>
      ))}
      <Button type="button" onClick={selectHandler}>
        Select
      </Button>
    </BaseModal>
  );
}
