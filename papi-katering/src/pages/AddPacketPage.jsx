import React, { useContext, useReducer, useState } from "react";
import CategoryModal from "../components/UI/modal/CategoryModal";
import { FaPlus } from "react-icons/fa";
import Alert from "../components/UI/alert/Alert";
import axios from "axios";
import { APIContext, PacketContext, UserContext } from "../context/context";
import Button from "../components/UI/button/Button";
import Input from "../components/UI/input/Input";
import TextArea from "../components/UI/input/TextArea";
import MenuForm from "./AddPacket/MenuForm";
import { useNavigate, useParams } from "react-router-dom";
import UploadButton from "../components/UI/button/UploadButton";
import {
  uploadAndGetURL,
  selectImage,
} from "../components/UI/button/firebase/uploadUtilities";
import { useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

const packetReducer = (state, data) => {
  return { ...state, ...data };
};

const categoryList = [
  { categoryid: 1, categoryname: "Vegetarian" },
  { categoryid: 2, categoryname: "Halal" },
];

export default function AddPacketPage() {

  const { API_URL } = useContext(APIContext);

  const { merchantID } = useContext(UserContext);
  const { packetid, onSelectPacket } = useContext(PacketContext);

  const navigate = useNavigate();

  if(merchantID === "") {
    navigate("/profile");
  }
  const [categoryModal, setCategoryModal] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [packet, dispatchPacket] = useReducer(packetReducer, {
    packetid: "",
    packetname: "",
    packetprice: "",
    packetimage: "",
    packetdescription: "",
    category: [],
    menu: [],
  });
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
    } else if (!Number.isInteger(packetprice)) {
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

  const savePacketHandler = async (e) => {
    e.preventDefault();
    const submissionError = validateFormFields();

    const totalImageUpload = packet.menu.length * 3 + 1;
    let uploadCounter = 0;

    if (submissionError.header !== "" && submissionError.detail !== "") {
      setError(submissionError);
    } else {
      try {
        if (
          !(
            typeof packet.packetimage === "string" ||
            packet.packetimage instanceof String
          )
        ) {
          packet.packetimage = await uploadAndGetURL(packet.packetimage);
        }
        packet.packetimage = selectImage(packet.packetimage, "PACKET");
        uploadCounter++;
        setUploadProgress((uploadCounter / totalImageUpload) * 100);

        for (let i = 0; i < packet.menu.length; i++) {
          let menu = packet.menu[i];
          for (let j = 0; j < menu.menuitems.length; j++) {
            const menuitem = menu.menuitems[j];
            let newmenuimage = menuitem.menuimage;
            if (
              !(
                typeof menuitem.menuimage === "string" ||
                menuitem.menuimage instanceof String
              )
            ) {
              newmenuimage = await uploadAndGetURL(menuitem.menuimage);
            }
            newmenuimage = selectImage(newmenuimage, "PACKET");

            packet.menu[i].menuitems[j] = {
              ...packet.menu[i].menuitems[j],
              menuimage: newmenuimage,
            };
            uploadCounter++;
            setUploadProgress((uploadCounter / totalImageUpload) * 100);
          }
        }
        const body = { merchantid: parseInt(merchantID), ...packet };

        if (packetid === "") {
          const URL = `${API_URL}packet`;
          await axios.post(URL, body);
        } else {
          const URL = `${API_URL}packet/${packetid}`;
          await axios.put(URL, body);

        }
        onSelectPacket("");
        navigate("/profile");
      } catch (error) {
        onSelectPacket("")
        console.log(error);
      }
    }
  };

  const deletePacketHandler = async () => {
    const URL = `${API_URL}packet/${packetid}`;
    try {
      await axios.delete(URL);
      onSelectPacket("");
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const formValueHandler = (name, value) => {
    if (name === "packetprice") {
      value = parseInt(value);
    }
    dispatchPacket({ [name]: value });
  };

  const hideModalHandler = () => {
    setCategoryModal(false);
  };


  useEffect(() => {
    const fetchPacket = async () => {
      if (packetid !== "") {
        try {
          const URL = `${API_URL}packet/${packetid}`;
          const data = await axios.get(URL);
          let tempPacket = data.data;
          tempPacket.category = tempPacket.category.map(
            (ctg) => ctg.categoryid
          );

          dispatchPacket(tempPacket);
        } catch (error) {}
      }
    };
    fetchPacket();
  }, [packetid]);

  return (
    <div className="flex flex-col mx-auto my-24 w-11/12 gap-10">
      <div
        className={`fixed w-screen h-screen bg-black bg-opacity-20 top-0 left-0 z-50 ${
          uploadProgress > 0 ? "block" : "hidden"
        }`}
      />
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
      <LoadingBar
        height={8}
        color="#fde047"
        progress={uploadProgress}
        onLoaderFinished={() => setUploadProgress(0)}
      />
      <form onSubmit={savePacketHandler} className="">
        <div className="flex flex-row w-full gap-20">
          <div className="flex flex-col items-center justify-center gap-6 w-1/2">
            <img
              src={selectImage(packet.packetimage)}
              alt=""
              className="w-1/2 object-cover rounded-md aspect-square"
            />
            <UploadButton
              onFileSelect={formValueHandler}
              name="packetimage"
              id="packetimage"
            >
              Edit
            </UploadButton>
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
                  className="flex flex-row font-bold items-center justify-end hover:opacity-60"
                  onClick={() => setCategoryModal(true)}
                  type="button"
                >
                  <FaPlus className="fill-primary" />
                  <p className="text-primary">Add Categories</p>
                </button>
              </div>
              <div className="flex flex-row gap-4 flex-wrap items-start min-h-[4rem]">
                {categoryList?.map(
                  (ctg, idx) =>
                    category.includes(ctg.categoryid) && (
                      <span
                        key={ctg.categoryid === "" ? idx : ctg.categoryid}
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
          {packet && packet.packetid !== "" && (
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
