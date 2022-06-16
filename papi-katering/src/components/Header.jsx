import React, { useState } from "react";
import { useContext } from "react";
import { GoSearch } from "react-icons/go";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/LogoWhite.png";
import { UserContext } from "../context/context";
import Dropdown from "./UI/Dropdown";
import Input from "./UI/input/Input";

const options = [
  {
    value: "Food",
    show: "Food",
  },
  {
    value: "Merchant",
    show: "Merchant",
  },
];

export default function Header() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Food");
  const { customerImage } = useContext(UserContext);
  const navigate = useNavigate();

  const searchValueHandler = (name, value) => {
    if (name === "query") {
      setQuery(value);
    } else if (name === "type") {
      setType(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}&type=${type}`);
  };

  return (
    <header className="bg-primary py-4 px-10 flex flex-row justify-between">
      <Link
        to="/home"
        className="flex flex-row items-center  hover:opacity-80 gap-4 font-semibold text-white cursor-pointer focus:outline-none"
      >
        <img src={logo} alt="" className="w-12" />
        PAPI KATERING
      </Link>
      <form
        onSubmit={submitHandler}
        className="flex flex-row items-center bg-white px-5 rounded gap-4 w-3/6"
      >
        <div className="w-1/5">
          <Dropdown
            color="header"
            name="type"
            onChange={searchValueHandler}
            options={options}
          />
        </div>
        <hr className="border-l-2 h-1/2" />
        <Input
          type="text"
          name="query"
          placeholder="Search food or merchant"
          onChange={searchValueHandler}
        />
        <GoSearch
          className="w-7 h-7 hover:opacity-60 cursor-pointer"
          onClick={submitHandler}
        />
      </form>
      <nav className="flex flex-row text-white items-center gap-8 font-medium">
        <Link
          to="/home"
          className="cursor-pointer hover:underline focus:outline-none"
        >
          HOME
        </Link>
        <Link
          to="/checkout"
          className="cursor-pointer hover:underline focus:outline-none"
        >
          CHECKOUT
        </Link>
        <Link to="/profile" className="visited:outline-none">
          <img src={customerImage} alt="" className="w-12 rounded-full aspect-square object-cover  hover:opacity-80" />
        </Link>
      </nav>
    </header>
  );
}
