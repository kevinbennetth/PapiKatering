import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import MenuCard from "../components/UI/card/MenuCard";
import ReviewModal from "../components/UI/modal/ReviewModal";
import ReviewCard from "../components/UI/card/ReviewCard";
import ItemsCarousel from "react-items-carousel";

export default function DetailPage() {
  const [orderCount, setOrderCount] = useState(0);
  const [reviewModal, setReviewModal] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const packet = {
    name: "Paket A",
    sold: 28,
    rating: 5,
    reviewCount: 25,
    price: "30.000",
    detail:
      "Fotonya KFC si biar agak rame yang teken, tapi di sini jualnya nasi sama pecel aja, tapi lumayan enak kok ga bohong dah, boleh bener dicoba. Kata orang si enak, cuma gatau si, kalo suka boleh direview 5 bintang biar lebih rame tokonya, kasih tau saudara juga biar toko saya lebih ramai, tengkiu ngab",
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

  const showModal = () => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "1.05rem";
    setReviewModal(true);
  };

  const hideModal = () => {
    document.body.style.overflow = "visible";
    document.body.style.paddingRight = "0";
    setReviewModal(false);
  };

  return (
    <div className="py-20 px-24 flex flex-col gap-10">
      <ReviewModal show={reviewModal} hideModal={hideModal} />
      <div className="flex flex-row gap-16 items-center">
        <img
          src="https://ik.imagekit.io/tvlk/cul-asset/guys1L+Yyer9kzI3sp-pb0CG1j2bhflZGFUZOoIf1YOBAm37kEUOKR41ieUZm7ZJ/cul-assets-252301483284-b172d73b6c43cddb/culinary/asset/REST_823-720x720-FIT_AND_TRIM-546ba62036aeff0535844d034100a061.jpeg?tr=q-40,c-at_max,w-720,h-1280&amp;_src=imagekit"
          alt=""
          className="w-2/3 rounded-md"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-semibold">{packet.name}</h1>
          <div className="flex flex-row items-center gap-2 my-2">
            <h4>Terjual {packet.sold}</h4>
            <BsFillStarFill className="text-yellow-300 w-6 h-6" />
            <h4>{packet.rating}</h4>
            <h4>({packet.reviewCount} Ulasan)</h4>
          </div>
          <div className="flex flex-row gap-4 flex-wrap">
            {packet.categories.map((category) => (
              <span key={category.id} className="bg-primary text-white px-4 py-1 rounded-full font-semibold">
                {category.category}
              </span>
            ))}
          </div>
          <h2 className="text-4xl my-4 font-semibold">Rp {packet.price}</h2>
          <h3 className="text-xl font-semibold">Detail</h3>
          <p>{packet.detail}</p>
          <div className="flex flex-row w-1/2 gap-4 my-4">
            <input
              type="number"
              min={0}
              value={orderCount}
              onChange={(e) => {
                setOrderCount(e.target.value);
              }}
              className="w-1/6 border-2 rounded text-xl text-center border-primary p-2 focus:outline-none"
            />
            <button className="border-2 rounded text-xl font-bold w-5/6 focus:outline-none border-primary text-primary hover:bg-primary hover:text-white transition-all duration-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>
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
      <div className="rounded shadow-md flex flex-row items-center p-8 gap-10">
        <img
          src="https://static.zerochan.net/Ko.Elizabeth.full.2947878.jpg"
          alt=""
          className="w-24 rounded-full"
        />
        <div className="flex flex-col cursor-pointer">
          <h3 className="text-xl font-bold">{packet.merchant.name}</h3>
          <h4 className="text-sm mt-1">Online {packet.merchant.lastOnline}</h4>
          <div className="flex flex-row gap-2 items-center mt-4">
            <BsFillStarFill className="text-yellow-300 w-6 h-6" />
            {packet.merchant.rating + " "}
            <p>rata-rata ulasan</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <h4 className="text-2xl font-bold">Reviews</h4>
          <h4
            className="text-xl font-bold text-primary cursor-pointer"
            onClick={showModal}
          >
            + Add Review
          </h4>
        </div>
        <div className="flex flex-col gap-6">
          {packet.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
