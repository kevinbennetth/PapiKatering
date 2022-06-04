import React, { useContext, useEffect, useReducer, useState } from "react";
import CategoryModal from "../components/UI/modal/CategoryModal";
import { FaPlus } from "react-icons/fa";
import Alert from "../components/UI/alert/Alert";
import axios from "axios";
import APIContext from "../context/api-context";
import Button from "../components/UI/button/Button";
import Input from "../components/UI/input/Input";
import TextArea from "../components/UI/input/TextArea";
import MenuForm from "./AddPacket/MenuForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const packetReducer = (state, data) => {
  return { ...state, ...data };
};

export default function AddPacketPage() {
  const { API_URL } = useContext(APIContext);
  const MerchantID = localStorage.getItem("MerchantID");
  const history = useHistory();

  const [categoryModal, setCategoryModal] = useState(false);
  const [packet, dispatchPacket] = useReducer(packetReducer, {
    packetid: 1,
    packetname: "",
    packetprice: "",
    packetimage:
      "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg",
    packetdescription: "",
    category: [1, 2],
    menu: [
      {
        menuid: 1,
        menuday: 1,
        menuitems: [
          {
            menuitemid: 1,
            menutime: "Breakfast",
            menuimage:
              "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg",
            menuname: "Mi Pangsit",
            menudescription: "Deskripsi singat mi pangsit, agak singkat si",
          },
          {
            menuitemid: 2,
            menutime: "Lunch",
            menuimage:
              "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg",
            menuname: "Mi Pangsit",
            menudescription: "Deskripsi singat mi pangsit, agak singkat si",
          },
          {
            menuitemid: 3,
            menutime: "Dinner",
            menuimage:
              "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg",
            menuname: "Mi Pangsit",
            menudescription: "Deskripsi singat mi pangsit, agak singkat si",
          },
        ],
      },
      {
        menuid: 2,
        menuday: 3,
        menuitems: [
          {
            menuitemid: 4,
            menutime: "Breakfast",
            menuimage:
              "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg",
            menuname: "Mi Pangsit",
            menudescription: "Deskripsi singat mi pangsit, agak singkat si",
          },
          {
            menuitemid: 5,
            menutime: "Lunch",
            menuimage:
              "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg",
            menuname: "Mi Pangsit",
            menudescription: "Deskripsi singat mi pangsit, agak singkat si",
          },
          {
            menuitemid: 6,
            menutime: "Dinner",
            menuimage:
              "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg",
            menuname: "Mi Pangsit",
            menudescription: "Deskripsi singat mi pangsit, agak singkat si",
          },
        ],
      },
      {
        menuid: 3,
        menuday: 5,
        menuitems: [
          {
            menuitemid: 7,
            menutime: "Breakfast",
            menuimage:
              "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg",
            menuname: "Mi Pangsit",
            menudescription: "Deskripsi singat mi pangsit, agak singkat si",
          },
          {
            menuitemid: 8,
            menutime: "Lunch",
            menuimage:
              "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg",
            menuname: "Mi Pangsit",
            menudescription: "Deskripsi singat mi pangsit, agak singkat si",
          },
          {
            menuitemid: 9,
            menutime: "Dinner",
            menuimage:
              "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg",
            menuname: "Mi Pangsit",
            menudescription: "Deskripsi singat mi pangsit, agak singkat si",
          },
        ],
      },
    ],
  });
  const [error, setError] = useState(null);
  const { packetname, packetprice, packetdescription, category, menu } = packet;
  const validateFormFields = () => {
    const submissionError = {
      header: "",
      detail: "",
    };

    const { packetname, packetprice, packetdescription } = packet;

    if (packetname.trim().length === 0) {
      submissionError.header = "Name Error";
      submissionError.detail = "Packet Name can't be empty !";
    } else if (Number.isInteger(packetprice)) {
      submissionError.header = "Price Error";
      submissionError.detail = "Price has to be numeric !";
    } else if (parseInt(packetprice) <= 0) {
      submissionError.header = "Price Error";
      submissionError.detail = "Price must be more than 0 !";
    } else if (packetdescription.trim().length === 0) {
      submissionError.header = "Description Error";
      submissionError.detail = "Description can't be empty !";
    }

    return submissionError;
  };

  const categoryList = [
    { categoryid: 1, categoryname: "Vegetarian" },
    { categoryid: 2, categoryname: "Halal" },
  ];

  const savePacketHandler = async (e) => {
    e.preventDefault();
    const submissionError = validateFormFields();

    if (submissionError.header !== "" && submissionError.detail !== "") {
      setError(submissionError);
    } else {
      const URL = `${API_URL}packet`;
      const body = { merchantid: parseInt(MerchantID), ...packet };

      try {
        await axios.post(URL, body);
      } catch (error) {
        console.log(error);
      }
      history.push("/profile");
    }
  };

  const deletePacketHandler = async () => {
    const URL = `${API_URL}packet/${packet.packetid}`;
    try {
      await axios.delete(URL);
      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const formValueHandler = (name, value) => {
    dispatchPacket({ [name]: value });
  };

  const hideModalHandler = () => {
    setCategoryModal(false);
  };

  return (
    <div className="flex flex-col mx-auto my-24 w-11/12 gap-10">
      {error && (
        <Alert
          onFinishError={setError}
          header={error.header}
          detail={error.detail}
        />
      )}
      <CategoryModal
        show={categoryModal}
        categoryList={categoryList}
        category={category}
        onHideModal={hideModalHandler}
        onSave={formValueHandler}
      />
      <form onSubmit={savePacketHandler} className="">
        <div className="flex flex-row w-full gap-20">
          <div className="flex flex-col items-center justify-center gap-6 w-1/2">
            <img
              src="https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg"
              alt=""
              className="w-1/2 object-cover rounded-md aspect-square"
            />
            <Button>Edit</Button>
          </div>
          <div className="flex flex-col w-1/2 gap-5 justify-center">
            <div className="flex flex-col gap-4">
              <p htmlFor="name">Packet Name</p>
              <Input
                type="text"
                name="packetname"
                id="packetname"
                color="white"
                value={packetname}
                onChange={formValueHandler}
              />
            </div>
            <div className="flex flex-col gap-4">
              <p htmlFor="price">Price (per day)</p>
              <Input
                type="number"
                name="packetprice"
                id="packetprice"
                color="white"
                value={packetprice}
                onChange={formValueHandler}
              />
            </div>

            <div className="flex flex-col gap-4">
              <p htmlFor="phone">Description</p>
              <TextArea
                type="text"
                name="packetdescription"
                id="packetdescription"
                color="white"
                rows={12}
                value={packetdescription}
                onChange={formValueHandler}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <p htmlFor="phone">Categories</p>
                <button
                  className="flex flex-row font-bold items-center justify-end"
                  onClick={() => setCategoryModal(true)}
                  type="button"
                >
                  <FaPlus className="fill-primary" />
                  <p className="text-primary">Add Categories</p>
                </button>
              </div>
              <div className="flex flex-row gap-4 flex-wrap items-start min-h-[4rem]">
                {categoryList?.map(
                  (ctg) =>
                    category.includes(ctg.categoryid) && (
                      <span
                        key={ctg.categoryid}
                        className="bg-primary text-white px-4 py-1 rounded-full font-semibold"
                      >
                        {ctg.categoryname}
                      </span>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        <MenuForm menu={menu} onUpdate={formValueHandler} />
        <div className="flex flex-row justify-end gap-6 mt-10">
          {menu.packetid !== "" && (
            <Button type="button" onClick={deletePacketHandler}>
              Delete
            </Button>
          )}
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
