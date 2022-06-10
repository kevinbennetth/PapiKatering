import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ItemCard from "../../components/ItemCard";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";
import Radio from "../../components/UI/input/Radio";
import { APIContext } from "../../context/context";
import axios from "axios";
import PaginationButton from "../../components/UI/pagination/PaginationButton";

const filterReducer = (state, data) => {
  return { ...state, ...data };
};

const halalValue = [
  { value: 1, show: "Halal" },
  { value: -1, show: "Non-halal" },
];
const vegetarianValue = [
  { value: 1, show: "Vegetarian" },
  { value: -1, show: "Non-vegetarian" },
];
const emptyCard = Array.from(Array(20).keys());

export default function SearchPage() {
  const [filter, dispatchFilter] = useReducer(filterReducer, {
    halal: "",
    vegetarian: "",
    minPrice: "",
    maxPrice: "",
  });

  const { API_URL } = useContext(APIContext);

  const [queryData, setQueryData] = useState({ q: "", type: "" });
  const [prevURL, setPrevURL] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [fetching, setFetching] = useState(false);

  const processUrl = (url) => {
    let data = decodeURI(url.search);
    data = data.replace("?", "");
    const queryValues = data.split("&");

    let queryObject = {};

    queryValues.forEach((val) => {
      const data = val.split("=");
      queryObject = { ...queryObject, [data[0]]: data[1] };
    });
    if (prevURL !== url) {
      setQueryData(queryObject);
      setPrevURL(url);
    }
  };

  const url = useLocation();

  useEffect(() => {
    processUrl(url);
  });

  const { halal, vegetarian, minPrice, maxPrice } = filter;
  const [searchData, setSearchData] = useState([]);

  const valueChangeHandler = (name, value) => {
    dispatchFilter({ [name]: value });
  };

  const updateType = (type) => {
    setQueryData((prevQueryData) => {
      return { ...prevQueryData, type };
    });
    setSearchData([]);
    fetchData();
  };

  const fetchData = async () => {
    setFetching(true);
    try {
      if (queryData.type === "Food") {
        const URL = `${API_URL}packet?q=${queryData.q}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&halal=${halal}&vegetarian=${vegetarian}&page=${page}&limit=20`;
        const response = await axios.get(URL);
        setSearchData(response.data.data);
        setPageCount(response.data.page);
      } else if (queryData.type === "Merchant") {
        const URL = `${API_URL}merchant?q=${
          queryData.q
        }&limit=${20}&page=${page}`;
        const response = await axios.get(URL);
        setSearchData(response.data);
      }
      setFetching(false);
    } catch (error) {}
  };

  useEffect(() => {
    setSearchData([]);
    fetchData();
  }, [queryData, page]);

  const resetFilters = () => {
    dispatchFilter({ halal: "", vegetarian: "", minPrice: "", maxPrice: "" });
  };

  const filterHandler = () => {
    fetchData();
  };

  const pageChangeHandler = (page) => {
    setPage(page);
  };

  return (
    <div className="px-16 py-12 flex flex-row gap-16 bg-[#F8F8F8]">
      <div className="flex flex-col w-1/5">
        {queryData?.type === "Food" && (
          <>
            <h2 className="font-bold text-2xl mb-4">Filter</h2>
            <div className="flex flex-col gap-6 bg-white shadow-lg rounded-lg p-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Category</h3>
                {halalValue.map((val, idx) => (
                  <div className="flex flex-row gap-3" key={idx}>
                    <Radio
                      name="halal"
                      value={val.value}
                      onChange={valueChangeHandler}
                      checked={halal.toString() === val.value.toString()}
                    />
                    <p>{val.show}</p>
                  </div>
                ))}

                {vegetarianValue.map((val, idx) => (
                  <div className="flex flex-row gap-3" key={idx}>
                    <Radio
                      name="vegetarian"
                      value={val.value}
                      onChange={valueChangeHandler}
                      checked={vegetarian.toString() === val.value.toString()}
                    />
                    <p>{val.show}</p>
                  </div>
                ))}
              </div>
              <hr />
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold mb-2">Price</h3>
                <div className="flex flex-row border-2 border-[#686868] rounded-md">
                  <p className="py-2 px-3 bg-[#686868] text-white font-bold rounded-l-sm">
                    Rp
                  </p>
                  <Input
                    type="number"
                    name="minPrice"
                    placeholder="Minimum Price"
                    value={minPrice}
                    onChange={valueChangeHandler}
                  />
                </div>
                <div className="flex flex-row border-2 border-[#686868] rounded-md">
                  <p className="py-2 px-3 bg-[#686868] text-white font-bold rounded-l-sm">
                    Rp
                  </p>
                  <Input
                    type="number"
                    name="maxPrice"
                    placeholder="Maximum Price"
                    value={maxPrice}
                    onChange={valueChangeHandler}
                  />
                </div>
              </div>
              <Button onClick={filterHandler}>Filter</Button>
              <p
                className="text-center hover:underline cursor-pointer"
                onClick={resetFilters}
              >
                Reset Filters
              </p>
            </div>
          </>
        )}
      </div>
      <div className="w-4/5 flex flex-col">
        <div className="flex flex-row gap-8 w-full border-gray-300 border-b-2">
          <div
            onClick={() => {
              updateType("Food");
            }}
            className="flex flex-row items-center border-opacity-0 border-b-4 pr-1 border-primary gap-4 hover:border-opacity-100 transition-hover duration-100 cursor-pointer pb-1 px-1"
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.5 5.25C31.9286 5.25006 32.3423 5.40742 32.6627 5.69225C32.983 5.97708 33.1876 6.36956 33.2378 6.79525L33.25 7V35C33.2495 35.446 33.0787 35.8751 32.7725 36.1994C32.4663 36.5237 32.0478 36.7189 31.6026 36.7451C31.1573 36.7712 30.7188 36.6263 30.3768 36.34C30.0348 36.0538 29.8149 35.6477 29.7623 35.2048L29.75 35V26.25H28C27.5714 26.2499 27.1577 26.0926 26.8374 25.8078C26.517 25.5229 26.3124 25.1304 26.2623 24.7048L26.25 24.5V14C26.25 10.1325 28.875 5.25 31.5 5.25ZM21 5.25C21.4286 5.25006 21.8423 5.40742 22.1627 5.69225C22.483 5.97708 22.6876 6.36956 22.7378 6.79525L22.75 7V15.75C22.7498 17.302 22.2341 18.81 21.2838 20.0371C20.3335 21.2642 19.0026 22.1409 17.5 22.5295V35C17.4995 35.446 17.3287 35.8751 17.0225 36.1994C16.7163 36.5237 16.2978 36.7189 15.8526 36.7451C15.4073 36.7712 14.9688 36.6263 14.6268 36.34C14.2848 36.0538 14.0649 35.6477 14.0123 35.2048L14 35V22.5295C12.557 22.1565 11.2707 21.3328 10.3281 20.1784C9.38546 19.024 8.8357 17.5989 8.75875 16.1105L8.75 15.75V7C8.75049 6.55396 8.92129 6.12494 9.22748 5.80061C9.53368 5.47627 9.95217 5.28109 10.3974 5.25495C10.8427 5.22881 11.2812 5.37368 11.6232 5.65996C11.9653 5.94625 12.1851 6.35233 12.2378 6.79525L12.25 7V15.75C12.25 16.3644 12.4117 16.9679 12.7189 17.5C13.0261 18.032 13.4679 18.4738 14 18.781V7C14.0005 6.55396 14.1713 6.12494 14.4775 5.80061C14.7837 5.47627 15.2022 5.28109 15.6474 5.25495C16.0927 5.22881 16.5312 5.37368 16.8732 5.65996C17.2153 5.94625 17.4351 6.35233 17.4878 6.79525L17.5 7L17.5018 18.781C17.9901 18.4987 18.403 18.1026 18.7053 17.6263C19.0075 17.1501 19.1902 16.6078 19.2378 16.0458L19.25 15.75V7C19.25 6.53587 19.4344 6.09075 19.7626 5.76256C20.0908 5.43437 20.5359 5.25 21 5.25Z"
                className={`${
                  queryData.type === "Food"
                    ? "fill-primary"
                    : "fill-black opacity-50"
                }`}
              />
            </svg>
            <h4
              className={`text-xl font-bold ${
                queryData.type === "Food"
                  ? "text-primary"
                  : "text-black text-opacity-50"
              }`}
            >
              Food
            </h4>
          </div>
          <div
            onClick={() => {
              updateType("Merchant");
            }}
            className="flex flex-row items-center border-opacity-0 border-b-4 pr-1 border-primary gap-4 hover:border-opacity-100 transition-hover duration-100 cursor-pointer pb-1 px-1"
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 41 41"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.4584 3.41669H8.54175C5.71616 3.41669 3.41675 5.7161 3.41675 8.54169V13.378C3.41675 15.1769 4.06933 16.8117 5.12508 18.0691V34.1667C5.12508 34.6198 5.30507 35.0543 5.62544 35.3747C5.94582 35.695 6.38034 35.875 6.83341 35.875H20.5001C20.9532 35.875 21.3877 35.695 21.7081 35.3747C22.0284 35.0543 22.2084 34.6198 22.2084 34.1667V25.625H29.0417V34.1667C29.0417 34.6198 29.2217 35.0543 29.5421 35.3747C29.8625 35.695 30.297 35.875 30.7501 35.875H34.1667C34.6198 35.875 35.0543 35.695 35.3747 35.3747C35.6951 35.0543 35.8751 34.6198 35.8751 34.1667V18.0674C36.9308 16.8117 37.5834 15.1769 37.5834 13.3763V8.54169C37.5834 5.7161 35.284 3.41669 32.4584 3.41669ZM34.1667 8.54169V13.378C34.1667 15.3255 32.7164 16.986 30.9363 17.0799L30.7501 17.0834C28.8658 17.0834 27.3334 15.551 27.3334 13.6667V6.83335H32.4584C33.4014 6.83335 34.1667 7.6004 34.1667 8.54169ZM17.0834 13.6667V6.83335H23.9167V13.6667C23.9167 15.551 22.3844 17.0834 20.5001 17.0834C18.6158 17.0834 17.0834 15.551 17.0834 13.6667ZM6.83341 8.54169C6.83341 7.6004 7.59875 6.83335 8.54175 6.83335H13.6667V13.6667C13.6667 15.551 12.1344 17.0834 10.2501 17.0834L10.0639 17.0782C8.28379 16.986 6.83341 15.3255 6.83341 13.378V8.54169ZM17.0834 27.3334H10.2501V22.2084H17.0834V27.3334Z"
                className={`${
                  queryData.type === "Merchant"
                    ? "fill-primary"
                    : "fill-black opacity-50"
                }`}
              />
            </svg>
            <h4
              className={`text-xl font-bold ${
                queryData.type === "Merchant"
                  ? "text-primary"
                  : "text-black text-opacity-50"
              }`}
            >
              Merchant
            </h4>
          </div>
        </div>
        <p className="mt-4 ml-2">
          Search Results for <strong>{queryData.q}</strong>
        </p>
        <div className="grid grid-cols-4 w-full gap-x-6 min-h-screen">
          {!fetching
            ? queryData.type === "Food"
              ? searchData?.map((data) => (
                  <Link to={`/detail/${data.packetid}`} key={data.packetid}>
                    <ItemCard
                      image={data.packetimage}
                      name={data.packetname}
                      place={data.merchantname}
                      rate={data.reviewaverage}
                      fee={data.packetprice}
                    />
                  </Link>
                ))
              : searchData?.map((data) => (
                  <Link
                    to={`/merchant/${data.merchantid}`}
                    key={data.merchantid}
                  >
                    <ItemCard
                      image={data.merchantimage}
                      name={data.merchantname}
                      place={data.merchantaddress}
                      rate={data.reviewaverage}
                    />
                  </Link>
                ))
            : emptyCard.map((card) => <ItemCard key={card} type="skeleton" />)}
        </div>
        {searchData.length > 0 && (
          <div className="self-end mt-10 w-1/4">
            <PaginationButton
              currPage={page}
              maxPage={pageCount}
              onUpdatePage={pageChangeHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
}
