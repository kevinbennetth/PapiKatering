import React, { useContext, useReducer, useState } from "react";
import CategoryModal from "../components/UI/modal/CategoryModal";
import { FaPlus } from "react-icons/fa";
import Alert from "../components/UI/alert/Alert";
import axios from "axios";
import { APIContext, UserContext } from "../context/context";
import Button from "../components/UI/button/Button";
import Input from "../components/UI/input/Input";
import TextArea from "../components/UI/input/TextArea";
import MenuForm from "./AddPacket/MenuForm";
import { useNavigate } from "react-router-dom";

const packetReducer = (state, data) => {
  return { ...state, ...data };
};

export default function AddPacketPage() {
  const { API_URL } = useContext(APIContext);
  const { merchantID } = useContext(UserContext);
  const navigate = useNavigate();

  const [categoryModal, setCategoryModal] = useState(false);
  const [packet, dispatchPacket] = useReducer(packetReducer, {
    packetid: "",
    packetname: "",
    packetprice: "",
    packetimage:
      "https://bouchonbendigo.com.au/wp-content/uploads/2022/03/istockphoto-1316145932-170667a.jpg",
    packetdescription: "",
    category: [],
    menu: [],
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
      const body = { merchantid: parseInt(merchantID), ...packet };

      try {
        await axios.post(URL, body);
      } catch (error) {
        console.log(error);
      }
      navigate("/profile");
    }
  };

  const deletePacketHandler = async () => {
    const URL = `${API_URL}packet/${packet.packetid}`;
    try {
      await axios.delete(URL);
      navigate("/profile");
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

        <MenuForm menu={menu} onUpdate={formValueHandler} type={"EDIT"} />
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
