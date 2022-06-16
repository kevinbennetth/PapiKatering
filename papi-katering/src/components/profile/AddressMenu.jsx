import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import API from "../../apis/API";
import AddressModal from "../modal/AddressModal";
import LoadingBar from "react-top-loading-bar";

const AddressMenu = (props) => {
  const custID = props.custID;
  const [addresses, setAddresses] = useState(null);
  const [modal, setModal] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchData = async () => {
    try {
      const response = await API.get(`/address?customerID=${custID}`);
      setAddresses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [addresses]);

  const showModal = (modalType) => {
    setModal(modalType);
  };

  const hideModal = () => {
    setModal(null);
  };

  const handleAdd = (e) => {
    setSelectedAddress(null);
    showModal("address");
  };

  const handleEdit = (e, address) => {
    setSelectedAddress(address);
    showModal("address");
  };

  const handleDelete = async (e, addressid) => {
    try {
      setUploadProgress(20);
      await API.delete(`/address/${addressid}`);
    } catch (error) {
      console.log(error);
    }
    setUploadProgress(100);

    hideModal();
  };

  return (
    <div className="address-menu">
      <LoadingBar
        height={8}
        color="#fde047"
        progress={uploadProgress}
        onLoaderFinished={() => setUploadProgress(0)}
      />
      <div
        className={`fixed w-screen h-screen bg-black bg-opacity-20 top-0 left-0 z-50 ${
          uploadProgress > 0 ? "block" : "hidden"
        }`}
      />
      <AddressModal
        show={modal === "address"}
        hideModal={hideModal}
        custID={custID}
        address={selectedAddress}
        onChangeUpload={setUploadProgress}
      />
      <div className="flex flex-row border-b-2">
        <div className="title basis-4/5 text-3xl">Addresses</div>
        <button
          className="add basis-1/5 flex flex-row text-lg font-bold items-center justify-end hover:opacity-60"
          onClick={(e) => handleAdd(e)}
        >
          <FaPlus className="fill-primary mx-1" />
          <p className="text-primary">Add Address</p>
        </button>
      </div>

      <div className="addresses container mt-4">
        {addresses &&
          addresses.map((address) => (
            <div
              className="header flex flex-row justify-between bg-white my-4 py-4 px-8 rounded-md drop-shadow-md hover:scale-[101%] transition-transform"
              key={address.addressid}
            >
              <div className="address w-4/5">
                <div className="title text-xl font-bold">
                  {address.addressname}
                </div>
                <p className="text-md mt-4">{address.addressdetails}</p>
              </div>
              <div className="flex flex-row">
                <FaEdit
                  className="fill-primary mx-1 w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
                  onClick={(e) => handleEdit(e, address)}
                />
                <FaTrashAlt
                  className="fill-primary mx-1 w-5 h-5 hover:scale-105 transition-transform cursor-pointer"
                  onClick={(e) => handleDelete(e, address.addressid)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddressMenu;
