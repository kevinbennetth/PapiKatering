import { useState } from "react";

import AddressMenu from "../components/profile/AddressMenu";
import AuthenticationMenu from "../components/profile/AuthenticationMenu";
import MerchantMenu from "../components/profile/MerchantMenu";
import OngoingOrdersMenu from "../components/profile/OngoingOrdersMenu";
import OrdersHistoryMenu from "../components/profile/OrdersHistoryMenu";
import PackageMenu from "../components/profile/PackageMenu";
import PaymentsMenu from "../components/profile/PaymentsMenu";
import ProfileMenu from "../components/profile/ProfileMenu";
import ReviewsMenu from "../components/profile/ReviewsMenu";

const renderMenu = (menu) => {
    if(menu === "profile"){
        return (<ProfileMenu />);
    }
    else if(menu === "addresses"){
        return (<AddressMenu />);
    }
    else if(menu === "payments"){
        return (<PaymentsMenu />);
    }
    else if(menu === "authentication"){
        return (<AuthenticationMenu />);
    }
    else if(menu === "ongoing orders"){
        return (<OngoingOrdersMenu />);
    }
    else if(menu === "orders history"){
        return (<OrdersHistoryMenu />);
    }
    else if(menu === "reviews"){
        return (<ReviewsMenu />);
    }
    else if(menu === "merchant") {
        return (<MerchantMenu />);
    } else if(menu === "package") {
        return (<PackageMenu />)
    }
}

const ProfilePage = () => {

    const [menu, setMenu] = useState("profile");

    const renderOption = (option) => {
        if(menu===option.toLowerCase()){
            return (<span className="font-bold text-emerald-600">{option}</span>);
        }
        else{
            return (<span className="text-slate-400">{option}</span>);
        }
    }

    return (
        <div className="profile container mx-auto my-8 min-h-[1028px] w-2/3">
            <div className="profile-header flex flex-row items-center">
                <img src="https://static.zerochan.net/Ko.Elizabeth.full.2947878.jpg" alt=""
                className="profile-img-round rounded-full w-24" />
                <div className="profile-name text-2xl font-bold mx-8 ">
                    Bang Jago
                </div>
            </div>

            <div className="menus flex flex-row my-4">
                <div className="basis-1/4 ">
                    <div className="top">
                        <ul>
                            <li><button onClick={() => setMenu("profile")}>{renderOption("Profile")}</button></li>
                            <li><button onClick={() => setMenu("addresses")}>{renderOption("Addresses")}</button></li>
                            <li><button onClick={() => setMenu("payments")}>{renderOption("Payments")}</button></li>
                            <li><button onClick={() => setMenu("authentication")}>{renderOption("Authentication")}</button></li>
                        </ul>
                    </div>
                    <div className="mid my-8">
                        <ul>
                            <li><button onClick={() => setMenu("ongoing orders")}>{renderOption("Ongoing Orders")}</button></li>
                            <li><button onClick={() => setMenu("orders history")}>{renderOption("Orders History")}</button></li>
                            <li><button onClick={() => setMenu("reviews")}>{renderOption("Reviews")}</button></li>
                        </ul>
                    </div>
                    <div className="bottom">
                        <ul>
                            <li><button onClick={() => setMenu("merchant")}>{renderOption("Merchant")}</button></li>
                            <li><button onClick={() => setMenu("package")}>{renderOption("Package")}</button></li>
                            <li>Log out</li>
                        </ul>
                    </div>
                </div>
                <div className="basis-3/4">
                    {renderMenu(menu)}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;