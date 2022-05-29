import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import API from "../../apis/API";

const AddressMenu = (props) => {

    const custID = props.custID;
    const [addresses, setAddresses] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(`/address?customerID=${custID}`);
                setAddresses(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [])

    return (
        <div className="address-menu">
            <div className="flex flex-row border-b-2">
                <div className="title basis-4/5 text-3xl">Addresses</div>
                <button className="add basis-1/5 flex flex-row text-lg font-bold items-center justify-end">
                    <FaPlus className="fill-emerald-600 mx-1"/>
                    <p className="text-emerald-600">Add Address</p></button>
            </div>

            <div className="addresses container mt-4">
                {addresses && addresses.map((address) => (
                    <div className="header flex flex-row justify-between bg-white my-4 py-4 px-8 rounded-md drop-shadow-md" key={address.addressid}>
                        <div className="address w-4/5">
                            <div className="title text-xl font-bold">{address.addressname}</div>
                            <p className="text-md">{address.addressdetails}</p>
                        </div>
                        <div className="options flex flex-row mt-2">
                            <button className="mx-2 h-0"><FaEdit className="fill-emerald-600"/></button>
                            <button className="mx-2 h-0"><FaTrashAlt className="fill-emerald-600"/></button>
                        </div>
                    </div>
                ))}  
            </div>

        </div>
    );
}

export default AddressMenu;