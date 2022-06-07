import React, { useContext, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { popularList } from "../HELPERS/popularList";
import { trendingList } from "../HELPERS/trendingList";
import bento from "../assets/bento1.png";
import { Link } from "react-router-dom";
import Button from "../components/UI/button/Button";
import ItemsCarousel from "react-items-carousel";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ItemCard from "../components/ItemCard";
import { APIContext } from "../context/context";

function Home() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const { API_URL } = useContext(APIContext);

  return (
    <div className="bg-[#F8F8F8]">
      <div className="flex flex-row items-center gap-5 py-24">
        <div className="w-1/2 flex justify-center">
          <div className="flex flex-col items-start gap-5">
            <p className="text-red-600 font-semibold text-lg">
              TODAY'S FAVOURITE
            </p>
            <h1 className="text-5xl font-black leading-[4rem]">
              Freshness <br /> in every bite
            </h1>
            <p className="text-lg font-medium">
              Have yourself a bento with variety of
              <br />
              beef, chicken, sushi, seafood, and salads!
            </p>
            <Link
              to="/"
              className="py-4 flex flex-row items-center gap-4 bg-primary text-xl text-white font-semibold px-16 rounded-full self-center mt-5 hover:opacity-75"
            >
              <p>Visit Merchant Page</p>

              <AiOutlineArrowRight className="fill-white mx-1 w-7 h-7" />
            </Link>
          </div>
        </div>
        <div className="relative self-start w-1/2 flex justify-center items-center">
          <img src={bento} alt="" className="mr-40" />
        </div>
      </div>

      <div className="flex flex-col gap-10 p-16">
        <div className="flex flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">PAPI'S RECOMMENDATION</h1>
          <Button>
            <Link to={"/quiz"}>Retake Quiz</Link>
          </Button>
        </div>
        <ItemsCarousel
          requestToChangeActive={(e) => setActiveItemIndex(e)}
          activeItemIndex={activeItemIndex}
          numberOfCards={5}
          gutter={20}
          leftChevron={
            <button>
              <AiOutlineLeft className="fill-primary mx-1 w-6 h-6" />
            </button>
          }
          rightChevron={
            <button>
              <AiOutlineRight className="fill-primary mx-1 w-6 h-6" />
            </button>
          }
          outsideChevron
          chevronWidth={40}
        >
          {trendingList.map((trendingItem, key) => {
            return (
              <ItemCard
                key={key}
                image={trendingItem.image}
                name={trendingItem.name}
                place={trendingItem.place}
                rate={trendingItem.rate}
                fee={trendingItem.fee}
              />
            );
          })}
        </ItemsCarousel>
      </div>

      <div className="flex flex-col gap-10 p-16">
        <h1 className="text-4xl font-bold">MOST POPULAR MERCHANTS</h1>
        <div className="grid grid-cols-5 gap-6">
          {popularList.map((popularItem, key) => {
            return (
              <ItemCard
                key={key}
                image={popularItem.image}
                name={popularItem.name}
                place={popularItem.place}
                rate={popularItem.rate}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-10 p-16">
        <h1 className="text-4xl font-bold">TRENDING TODAY</h1>
        <ItemsCarousel
          requestToChangeActive={(e) => setActiveItemIndex(e)}
          activeItemIndex={activeItemIndex}
          numberOfCards={5}
          gutter={20}
          leftChevron={
            <button>
              <AiOutlineLeft className="fill-primary mx-1 w-6 h-6" />
            </button>
          }
          rightChevron={
            <button>
              <AiOutlineRight className="fill-primary mx-1 w-6 h-6" />
            </button>
          }
          outsideChevron
          chevronWidth={40}
        >
          {trendingList.map((trendingItem, key) => {
            return (
              <ItemCard
                key={key}
                image={trendingItem.image}
                name={trendingItem.name}
                place={trendingItem.place}
                rate={trendingItem.rate}
                fee={trendingItem.fee}
              />
            );
          })}
        </ItemsCarousel>
      </div>
    </div>
  );
}

export default Home;
