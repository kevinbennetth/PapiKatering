import profileImg from "../../assets/profileImg.jpg";
import { useEffect, useState } from "react";
import API from "../../apis/API";

const ProfileMenu = (props) => {

    const customerID = props.custID;
    const [customer, setCustomer] = useState("");

    const formatDate = (date) => {
        date = new Date(date);

        const year = (date.getFullYear()).toString();

        var month = (date.getMonth()+1);
        if(month<10){
            month = "0" + month.toString();
        }
        else{
            month = month.toString()
        }

        var day = (date.getDate());
        if(day<10){
            day = "0" + day.toString();
        }
        else{
            day = day.toString()
        }

        const dateString = year+"-"+month+"-"+day;
        return dateString;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get(`/user/${customerID}`);
                setCustomer(response.data.data.customerData);
            } catch(err) {
                console.log(err);
            }
        }

        fetchData();
    }, []);

    const dob = formatDate(customer.customerdob);

    return (
        <div className="profile-menu">
            <div className="title text-3xl border-b-2">Profile</div>
            <div className="content container mt-4 mb-12">
                <div className="flex flex-row">
                    <div className="left-side basis-2/3">
                        <div className="biodata container w-11/12">
                            <strong className="text-lg">Biodata</strong>
                            <form action="" method="post">
                                <div className="name-container my-2">
                                    <p htmlFor="name">Name</p>
                                    <input type="text" name="name" id="name" defaultValue={customer.customername}
                                    className="rounded-md border w-full p-1"/>
                                </div>

                                <div className="dob-container my-2">
                                    <p htmlFor="dob">Date of Birth</p>
                                    <input type="date" name="dob" id="dob" defaultValue={dob}
                                    className="rounded-md border w-full p-1"/>
                                </div>
                                
                                <div className="gender-container my-2">
                                    <p htmlFor="gender">Gender</p>
                                    <select name="gender" id="gender" className="rounded-md border w-full p-1">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="contact container w-11/12 mt-8">
                            <strong className="text-lg">Contact</strong>
                            <form action="" method="post">
                                <div className="email-container my-2">
                                    <p htmlFor="email">Email</p>
                                    <input type="text" name="email" id="email" defaultValue={customer.customeremail}
                                    className="rounded-md border w-full p-1"/>
                                </div>
                                
                                <div className="phone-container my-2">
                                    <p htmlFor="phone">Phone Number</p>
                                    <input type="text" name="phone" id="phone" defaultValue={customer.customerphone}
                                    className="rounded-md border w-full p-1"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="right-side basis-1/3">
                        <div className="right-container flex flex-col">
                            <img className="profile-img" src={profileImg} alt="" />
                            <div className="button-container flex justify-center mt-4">
                                <button className="block px-10 py-2 bg-emerald-600 hover:bg-emerald-700
                                    text-white font-bold rounded-md">Edit</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <button className="block px-10 py-2 mt-12 mb-4 bg-emerald-600 hover:bg-emerald-700
                text-white font-bold rounded-md">Save</button>
        </div>
    );
}

export default ProfileMenu;