import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import API from "../../apis/API";

const PaymentModal = (props) => {

    const custID = props.custID;
    const selectedPayment = props.payment;

    const [name, setName] = useState(null);
    const [number, setNumber] = useState(null);

    useEffect(() => {
        setName(() => (selectedPayment) ? selectedPayment.paymentname : "");
        setNumber(() => (selectedPayment) ? selectedPayment.paymentnumber : "");
    }, [selectedPayment]);

    const handleSubmit = async (e) => {
        try {
            console.log(number.toString().length);
            if(number.toString().length==16){
                let response;
                if(selectedPayment){
                    response = API.put(`/payment/${selectedPayment.paymentid}`,{
                        name,
                        cardNumber: number
                    });
                }
                else{
                    response = API.post(`/payment/`, {
                        paymentID: Math.floor(Math.random() * 1000000),
                        customerID: custID,
                        name,
                        cardNumber: number
                    });
                }
                props.hideModal();

                document.getElementById("status").innerHTML = "Sucessfully added!";
                document.getElementById("status").className = "text-neutral-800";
            } else{
                document.getElementById("status").innerHTML = "Card number needs to have 16 digits";
                document.getElementById("status").className = "text-red-500";
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <BaseModal show={props.show} hideModal={props.hideModal}>
            <h3 className="text-lg font-bold">New Payment Method</h3>

            <form action="" method="post" className="mt-4">
                <h4 className="text-md font-bold">Payment Name</h4>
                <input type="text" name="paymentName" id="paymentName" 
                className="rounded-md border w-full p-1" defaultValue={(selectedPayment) ? selectedPayment.paymentname : ""}
                onChange={(e) => setName(e.target.value)}/>

                <h4 className="text-md font-bold mt-8">Card Number</h4>
                <input type="text" name="cardNo" id="cardNo" 
                className="rounded-md border w-full p-1" defaultValue={(selectedPayment) ? selectedPayment.paymentnumber : ""}
                onChange={(e) => setNumber(e.target.value)}/>

                <p id="status"></p>
            </form>

            <button type="submit" className="block px-10 py-2 mt-8 mb-4 bg-emerald-600 hover:bg-emerald-700
                text-white font-bold rounded-md" onClick={handleSubmit}>Save</button>
        </BaseModal>
    );
}

export default PaymentModal;