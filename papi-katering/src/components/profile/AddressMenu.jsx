import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

const AddressMenu = () => {

    const [addresses, setAddresses] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8001/addresses")
        .then(response => {
            return response.json();
        })
        .then(data => {
            setAddresses(data);
        })
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
                    <div className="header flex flex-row justify-between bg-white my-4 py-4 px-8 rounded-md drop-shadow-md">
                        <div className="address w-4/5">
                            <div className="title text-xl font-bold">{address.title}</div>
                            <p className="text-md">{address.address}</p>
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