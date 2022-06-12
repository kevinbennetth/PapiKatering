import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import API from "../../apis/API";
import AddressModal from "../modal/AddressModal";

const AddressMenu = (props) => {

    const custID = props.custID;
    const [addresses, setAddresses] = useState(null);
    const [modal, setModal] = useState(null);

    const [selectedAddress, setSelectedAddress] = useState(null);

    const fetchData = async () => {
        try {
            const response = await API.get(`/address?customerID=${custID}`);
            setAddresses(response.data);
        } catch (err) {
            console.log(err);
        }
    }

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
    }

    const handleEdit = (e, address) => {
        setSelectedAddress(address);
        showModal("address");
    };

    const handleDelete = async (e, addressid) => {
        try {
            const response = API.delete(`/address/${addressid}`);
        } catch (error) {
            console.log(error);
        }
        hideModal();
    };

    return (
        <div className="address-menu">
            <AddressModal show={modal === "address"} hideModal={hideModal} custID={custID} address={selectedAddress}/>
            <div className="flex flex-row border-b-2">
                <div className="title basis-4/5 text-3xl">Addresses</div>
                <button className="add basis-1/5 flex flex-row text-lg font-bold items-center justify-end" onClick={(e) => handleAdd(e)}>
                    <FaPlus className="fill-emerald-600 mx-1"/>
                    <p className="text-emerald-600">Add Address</p>
                </button>
            </div>

            <div className="addresses container mt-4">
                {addresses && addresses.map((address) => (
                    <div className="header flex flex-row justify-between bg-white my-4 py-4 px-8 rounded-md drop-shadow-md" key={address.addressid}>
                        <div className="address w-4/5">
                            <div className="title text-xl font-bold">{address.addressname}</div>
                            <p className="text-md">{address.addressdetails}</p>
                        </div>
                        <div className="options flex flex-row mt-2">
                            <button className="mx-2 h-0"><FaEdit className="fill-emerald-600" onClick={(e) => handleEdit(e, address)}/></button>
                            <button className="mx-2 h-0"><FaTrashAlt className="fill-emerald-600" onClick={(e) => handleDelete(e, address.addressid)}/></button>
                        </div>
                    </div>
                ))}  
            </div>

        </div>
    );
}

export default AddressMenu;