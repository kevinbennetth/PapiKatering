import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect } from "react";

const PaymentsMenu = () => {

    const [payments, setPayments] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/payments")
        .then(response => {
            return response.json();
        })
        .then(data => {
            setPayments(data);
        })
    }, [])

    return (
        <div className="payments-menu">
            <div className="flex flex-row border-b-2">
                <div className="title basis-4/5 text-3xl">Payments</div>
                <button className="add basis-1/5 flex flex-row text-lg font-bold items-center justify-end">
                    <FaPlus className="fill-emerald-600 mx-1"/>
                    <p className="text-emerald-600">Add Payment</p></button>
            </div>

            <div className="payments container mt-4">
                {payments && payments.map((payment) => (
                    <div className="header flex flex-row justify-between bg-white my-4 py-4 px-8 rounded-md drop-shadow-md">
                        <div className="payment w-4/5">
                            <div className="title text-xl font-bold">{payment.paymentName}</div>
                            <p className="text-md mt-4">{payment.details}</p>
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

export default PaymentsMenu;