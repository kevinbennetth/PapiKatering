import React from "react";
import logo from "../assets/LogoWhite.png";
import { GoSearch } from "react-icons/go";

export default function Header() {
  return (
    <header className="bg-primary py-4 px-10 flex flex-row justify-between">
      <div className="flex flex-row items-center gap-4 font-semibold text-white">
        <img src={logo} alt="" srcset="" className="w-12" />
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
        <div className="cursor-pointer">CART</div>
        <div className="cursor-pointer">HOME</div>
        <div className="cursor-pointer">BROWSE</div>
        <img
          src="https://static.zerochan.net/Ko.Elizabeth.full.2947878.jpg"
          alt=""
          className="w-12 rounded-full"
        />
      </nav>
    </header>
  );
}
