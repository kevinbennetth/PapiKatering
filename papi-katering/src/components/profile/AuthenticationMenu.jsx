import { useState } from "react";
import API from "../../apis/API";

const AuthenticationMenu = (props) => {

    const custID = props.custID;
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(confirm===password){
            try {
                const response = await API.put(`/user/${custID}`, {
                    CustomerPassword: password
                });

                if(response.data.status=="success"){
                    document.getElementById("status").innerHTML="Password has been updated!";
                    document.getElementById("status").className="text-neutral-900";
                }
            } catch(err) {
                console.log(err);
            }
        }
        else{
            document.getElementById("status").innerHTML="Password did not match";
            document.getElementById("status").className="text-red-500";
        }
    }

    return (
        <div className="authentication-menu">
            <div className="title text-3xl border-b-2">Authentication</div>
            <form action="" method="post" className="w-7/12 mt-4 mb-12">
                <div className="new-pass-container">
                    <p>New Password</p>
                    <input type="password" name="pass" id="pass" 
                    className="rounded-md border w-full p-1" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="confirm-pass-container mt-4">
                    <p>Confirm New Password</p>
                    <input type="password" name="confirm-pass" id="confirm-pass" 
                    className="rounded-md border w-full p-1" onChange={(e) => setConfirm(e.target.value)}/>
                </div>

                <p id="status" ></p>
            </form>

            <button type="submit" className="block px-10 py-2 mt-12 mb-4 bg-emerald-600 hover:bg-emerald-700
                text-white font-bold rounded-md" onClick={handleSubmit}>Save</button>
        </div>
    );
}

export default AuthenticationMenu;