import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import { useParams } from "react-router-dom";
import MenuCard from "../../components/UI/card/MenuCard";
import CategoryModal from "../../components/UI/modal/CategoryModal";
import MenuModal from "../../components/UI/modal/MenuModal";
import PacketForm from "./PacketForm";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

export default function AddPacketPage() {
  const [modal, setModal] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const packet = {
    name: "Bang Jago",
    price: 30000,
    description: "Testing ngabb",
    categories: [
      {
        id: 1,
        category: "Vegetarian",
      },
      {
        id: 2,
        category: "Halal",
      },
    ],
    menu: [
      {
        id: 1,
        day: "Monday",
        menuItem: [
          {
            id: 1,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Breakfast",
          },
          {
            id: 2,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Lunch",
          },
          {
            id: 3,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Dinner",
          },
        ],
      },
      {
        id: 2,
        day: "Wednesday",
        menuItem: [
          {
            id: 4,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Breakfast",
          },
          {
            id: 5,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Lunch",
          },
          {
            id: 6,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Dinner",
          },
        ],
      },
      {
        id: 3,
        day: "Friday",
        menuItem: [
          {
            id: 7,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Breakfast",
          },
          {
            id: 8,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Lunch",
          },
          {
            id: 9,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Dinner",
          },
        ],
      },
      {
        id: 4,
        day: "Sunday",
        menuItem: [
          {
            id: 10,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Breakfast",
          },
          {
            id: 11,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Lunch",
          },
          {
            id: 12,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
            name: "Mi Pangsit",
            description: "Deskripsi singat mi pangsit, agak singkat si",
            time: "Dinner",
          },
        ],
      },
    ],
    merchant: {
      name: "Winter Catering",
      rating: "5",
      lastOnline: "1 jam yang lalu",
    },
    reviews: [
      {
        id: 1,
        image: "https://static.zerochan.net/Ko.Elizabeth.full.2947878.jpg",
        name: "Gustaf",
        date: "12 Jan 2022",
        review: "Wado, enak bener ngab boleh dicoba ni ges",
        rating: 5,
      },
      {
        id: 2,
        image: "https://static.zerochan.net/Ko.Elizabeth.full.2947878.jpg",
        name: "Gustaf",
        date: "12 Jan 2022",
        review: "Kata bokap gua enak bener",
        rating: 5,
      },
    ],
  };

  const showModal = (modalType) => {
    document.body.style.overflow = "hidden";
    setModal(modalType);
  };

  const hideModal = () => {
    document.body.style.overflow = "visible";
    document.body.style.paddingRight = "0";
    setModal(null);
  };

  return (
    <div className="py-20 px-24 flex flex-col gap-10">
      <CategoryModal show={modal === "category"} hideModal={hideModal} />
      <MenuModal show={modal === "menu"} hideModal={hideModal} />
      
      <PacketForm showModal={showModal} packet={packet} />
      

      <div className="flex flex-col gap-6">
        <h4
          className="text-xl font-bold text-primary cursor-pointer self-end mr-2"
          onClick={() => showModal("menu")}
        >
          + Add Menu
        </h4>
        <ItemsCarousel
          requestToChangeActive={(e) => setActiveItemIndex(e)}
          activeItemIndex={activeItemIndex}
          numberOfCards={3}
          gutter={20}
          leftChevron={<button>{"<"}</button>}
          rightChevron={<button>{">"}</button>}
          outsideChevron
          chevronWidth={40}
        >
          {packet.menu.map((menu) => (
            <MenuCard menu={menu} key={menu.id} />
          ))}
        </ItemsCarousel>
      </div>
      <div className="flex flex-row justify-end gap-6 pr-2">
        <button className="px-8 py-3 rounded text-white font-semibold bg-primary self-start mt-2 hover:opacity-75">
          Delete
        </button>
        <button className="px-8 py-3 rounded text-white font-semibold bg-primary self-start mt-2 hover:opacity-75">
          Save
        </button>
      </div>
    </div>
  );
}
