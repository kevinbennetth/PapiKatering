import { useState, useEffect } from "react";
import API from "../../apis/API";
import BaseModal from "../UI/modal/BaseModal";

const AddressModal = (props) => {

    const custID = props.custID;
    const selectedAddress = props.address;

    const [name, setName] = useState(null);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        setName(() => (selectedAddress) ? selectedAddress.addressname : "");
        setDetails(() => (selectedAddress) ? selectedAddress.addressdetails : "");
    }, [selectedAddress]);

    const validate = (name, details) => {
        if(name.length<1){
            return false;
        }
        if(details.length<1){
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        try {
            let response;
            if(validate(name, details)){
                if(selectedAddress){
                    response = await API.put(`/address/${selectedAddress.addressid}`,{
                        name,
                        detail: details
                    });
                }
                else{
                    response = await API.post(`/address/`, {
                        customerID: custID,
                        name,
                        detail : details
                    });
                }
                props.hideModal();
            }
            else{
                document.getElementById("status").innerHTML = "Invalid input";
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <BaseModal show={props.show} onHideModal={props.hideModal}>
            <h3 className="text-lg font-bold">New Address</h3>

            <form action="" method="post" className="mt-4">
                <h4 className="text-md font-bold">Address Name</h4>
                <input type="text" name="addressName" id="addressName" 
                className="rounded-md border w-full p-1" defaultValue={(selectedAddress) ? selectedAddress.addressname : ""}
                onChange={(e) => setName(e.target.value)}/>

                <h4 className="text-md font-bold mt-8">Address Details</h4>
                <textarea name="addressDetails" id="addressDetails" cols="30" rows="5"
                className="rounded-md border w-full p-1" defaultValue={(selectedAddress) ? selectedAddress.addressdetails : ""}
                onChange={(e) => setDetails(e.target.value)}/>

                <p id="status"></p>
            </form>

            <button type="submit" className="block px-10 py-2 mt-8 mb-4 bg-emerald-600 hover:bg-emerald-700
                text-white font-bold rounded-md" onClick={handleSubmit}>Save</button>
        </BaseModal>
    );
}

export default AddressModal;