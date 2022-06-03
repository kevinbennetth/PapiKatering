import React, { useEffect, useState } from "react";
import CategoryModal from "../components/UI/modal/CategoryModal";
import MenuModal from "../components/UI/modal/MenuModal";
import ItemsCarousel from "react-items-carousel";
import MenuCard from "../components/UI/card/MenuCard";
import { FaPlus } from "react-icons/fa";
import Alert from "../components/UI/alert/Alert";
import axios from "axios";

export default function AddPacketPage() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [modal, setModal] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [menu, setMenu] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [category, setCategory] = useState([]);

  // const packet = {
  //   name: "Bang Jago",
  //   price: 30000,
  //   description: "Testing ngabb",
  //   categories: [
  //     {
  //       id: 1,
  //       category: "Vegetarian",
  //     },
  //     {
  //       id: 2,
  //       category: "Halal",
  //     },
  //   ],
  //   menu: [
  //     {
  //       id: 1,
  //       day: "Monday",
  //       menuItem: [
  //         {
  //           id: 1,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Breakfast",
  //         },
  //         {
  //           id: 2,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Lunch",
  //         },
  //         {
  //           id: 3,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Dinner",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       day: "Wednesday",
  //       menuItem: [
  //         {
  //           id: 4,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Breakfast",
  //         },
  //         {
  //           id: 5,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Lunch",
  //         },
  //         {
  //           id: 6,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Dinner",
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       day: "Friday",
  //       menuItem: [
  //         {
  //           id: 7,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Breakfast",
  //         },
  //         {
  //           id: 8,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Lunch",
  //         },
  //         {
  //           id: 9,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Dinner",
  //         },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       day: "Sunday",
  //       menuItem: [
  //         {
  //           id: 10,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Breakfast",
  //         },
  //         {
  //           id: 11,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Lunch",
  //         },
  //         {
  //           id: 12,
  //           image:
  //             "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/1200px-Mi_ayam_jamur.JPG",
  //           name: "Mi Pangsit",
  //           description: "Deskripsi singat mi pangsit, agak singkat si",
  //           time: "Dinner",
  //         },
  //       ],
  //     },
  //   ],
  //   merchant: {
  //     name: "Winter Catering",
  //     rating: "5",
  //     lastOnline: "1 jam yang lalu",
  //   },
  //   reviews: [
  //     {
  //       id: 1,
  //       image: "https://static.zerochan.net/Ko.Elizabeth.full.2947878.jpg",
  //       name: "Gustaf",
  //       date: "12 Jan 2022",
  //       review: "Wado, enak bener ngab boleh dicoba ni ges",
  //       rating: 5,
  //     },
  //     {
  //       id: 2,
  //       image: "https://static.zerochan.net/Ko.Elizabeth.full.2947878.jpg",
  //       name: "Gustaf",
  //       date: "12 Jan 2022",
  //       review: "Kata bokap gua enak bener",
  //       rating: 5,
  //     },
  //   ],
  // };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const responseCategory = await axios.get(
          "http://localhost:8080/category"
        );
        setCategory(responseCategory.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [error]);

  const showModal = (modalType) => {
    document.body.style.overflow = "hidden";
    setModal(modalType);
  };

  const hideModal = () => {
    document.body.style.overflow = "visible";
    document.body.style.paddingRight = "0";
    setModal(null);
  };

  const submitPackage = (e) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      setError(() => {
        return {
          header: "Name Error",
          detail: "Packet Name can't be empty !",
        };
      });
    } else if (Number.isInteger(price)) {
      setError(() => {
        return {
          header: "Price Error",
          detail: "Price has to be numeric !",
        };
      });
    } else if (parseInt(price) <= 0) {
      setError(() => {
        return {
          header: "Price Error",
          detail: "Price must be more than 0 !",
        };
      });
    } else if (description.trim().length === 0) {
      setError(() => {
        return {
          header: "Description Error",
          detail: "Description can't be empty !",
        };
      });
    }
  };

  return (
    <div className="py-20 px-24 flex flex-col gap-10">
      {error && <Alert header={error.header} detail={error.detail} />}
      <CategoryModal
        show={modal === "category"}
        onHideModal={hideModal}
        category={category}
        selectedCategory={selectedCategory}
        onUpdateSelectedCategory={setSelectedCategory}
      />
      <MenuModal show={modal === "menu"} onHideModal={hideModal} menu={menu} onUpdateMenu={setMenu}/>
      <form onSubmit={submitPackage}>
        <div className="flex flex-row w-full gap-20">
          <div className="flex flex-col items-center justify-center gap-6 w-1/2">
            <img
              src="https://www.expatica.com/app/uploads/sites/5/2014/05/french-food-1920x1080.jpg"
              alt=""
              className="w-1/2 object-cover rounded-md aspect-square"
            />
            <button
              className=" px-10 py-2 bg-primary hover:bg-emerald-700
                                    text-white font-bold rounded-md"
            >
              Edit
            </button>
          </div>
          <div className="flex flex-col w-1/2 gap-5 justify-center">
            <div className="flex flex-col gap-4">
              <p htmlFor="name">Packet Name</p>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-md border w-4/5 p-1 "
              />
            </div>
            <div className="flex flex-col gap-4">
              <p htmlFor="price">Price (per day)</p>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="rounded-md border w-4/5 p-1"
              />
            </div>

            <div className="flex flex-col gap-4">
              <p htmlFor="phone">Description</p>
              <textarea
                type="text"
                name="phone"
                id="phone"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-md border w-4/5 p-1 resize-none"
                rows="8"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between w-4/5">
                <p htmlFor="phone">Categories</p>
                <button
                  className="flex flex-row font-bold items-center justify-end"
                  onClick={() => showModal("category")}
                  type="button"
                >
                  <FaPlus className="fill-emerald-600 mx-1" />
                  <p className="text-emerald-600">Add Categories</p>
                </button>
              </div>
              <div className="flex flex-row gap-4 flex-wrap">
                {category &&
                  category.map((ctg) => {
                    return (
                      Object.values(selectedCategory).includes(
                        ctg.categoryid
                      ) && (
                        <span
                          key={ctg.categoryid}
                          className="bg-primary text-white px-4 py-1 rounded-full font-semibold"
                        >
                          {ctg.categoryname}
                        </span>
                      )
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

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
            {menu.map((menu) => (
              <MenuCard menu={menu} key={menu.id} />
            ))}
          </ItemsCarousel>
        </div>
        <div className="flex flex-row justify-end gap-6 pr-2">
          <button
            type="button"
            className="px-8 py-3 rounded text-white font-semibold bg-primary self-start mt-2 hover:opacity-75"
          >
            Delete
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded text-white font-semibold bg-primary self-start mt-2 hover:opacity-75"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
