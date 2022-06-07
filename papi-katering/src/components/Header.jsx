import React from "react";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import logo from "../assets/LogoWhite.png";
import Dropdown from "./UI/Dropdown";

export default function Header() {
  return (
    <header className="bg-primary py-4 px-10 flex flex-row justify-between">
      <div className="flex flex-row items-center gap-4 font-semibold text-white">
        <img src={logo} alt="" className="w-12" />
        PAPI KATERING
      </div>
      <div className="flex flex-row items-center bg-white px-5 rounded gap-4 w-3/6">
        <select
          name=""
          id=""
          className="bg-white focus:outline-none cursor-pointer"
        >
          <option value="Food">Food</option>
          <option value="Merchant">Merchant</option>
        </select>
        <input
          type="text"
          placeholder="Search food or merchant"
          className="w-full focus:outline-none px-4 border-l-2"
        />
        <GoSearch className="w-5 h-5" />
      </div>
      <nav className="flex flex-row text-white items-center gap-8 font-medium">
        <div className="cursor-pointer">HOME</div>
        <div className="cursor-pointer">CHECKOUT</div>
        <Link to="/profile">
          <img
            src="https://static.zerochan.net/Ko.Elizabeth.full.2947878.jpg"
            alt=""
            className="w-12 rounded-full"
          />
        </Link>
      </nav>
    </header>
  );
}
