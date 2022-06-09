import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import ItemsCarousel from "react-items-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import bento from "../assets/bento1.png";
import ItemCard from "../components/ItemCard";
import Button from "../components/UI/button/Button";
import { APIContext, UserContext } from "../context/context";
import { trendingList } from "../HELPERS/trendingList";

function Home() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [merchant, setMerchant] = useState([]);
  const [popularPacket, setPopularPacket] = useState([]);
  const [recommendedPacket, setRecommendedPacket] = useState([]);
  const { API_URL } = useContext(APIContext);
  const { customerID, merchantID } = useContext(UserContext);

  const fetchHomeData = async () => {
    const merchantURL = `${API_URL}merchant/home`;
    const packetURL = `${API_URL}packet/home`;
    const recommendationURL = `${API_URL}packet/recommend/${customerID}`;

    try {
      const merchantResponse = await axios.get(merchantURL);
      setMerchant(merchantResponse.data.data.merchantData);

      const packetResponse = await axios.get(packetURL);
      setPopularPacket(packetResponse.data.data.packetData);

      const recommendationResponse = await axios.get(recommendationURL);
      setRecommendedPacket(recommendationResponse.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

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
              to="/merchant/1"
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
            <Link to="/quiz">Retake Quiz</Link>
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
          {recommendedPacket.map((packet) => {
            return (
              <ItemCard
                image={packet.packetimage}
                name={packet.packetname}
                place={packet.merchantname}
                rate={packet.reviewaverage}
                fee={packet.packetprice + " / day"}
              />
            );
          })}
        </ItemsCarousel>
      </div>

      <div className="flex flex-col gap-10 p-16">
        <h1 className="text-4xl font-bold">MOST POPULAR MERCHANTS</h1>
        <div className="grid grid-cols-5 gap-6">
          {merchant.map((merchant) => {
            return (
              <Link
                to={`/merchant/${merchant.merchantid}`}
                key={merchant.merchantid}
              >
                <ItemCard
                  image={merchant.merchantimage}
                  name={merchant.merchantname}
                  rate={merchant.reviewaverage}
                  place={merchant.merchantaddress}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-10 p-16">
        <h1 className="text-4xl font-bold">MOST POPULAR PACKETS</h1>
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
          {popularPacket.map((packet) => {
            return (
              <Link to={`/detail/${[packet.packetid]}`} key={packet.packetid}>
                <ItemCard
                  image={packet.packetimage}
                  name={packet.packetname}
                  place={packet.merchantname}
                  rate={packet.reviewaverage}
                  fee={packet.packetprice + " / day"}
                />
              </Link>
            );
          })}
        </ItemsCarousel>
      </div>
    </div>
  );
}

export default Home;
