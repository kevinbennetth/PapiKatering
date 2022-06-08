import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsFillStarFill, BsWhatsapp } from "react-icons/bs";
import { useParams } from "react-router-dom";
import HPackageCard from "../components/UI/card/HPackageCard";
import { APIContext } from "../context/context";

const MerchantPage = () => {
  const { id } = useParams();
  const [merchant, setMerchant] = useState();
  const [packets, setPackets] = useState();
  const { API_URL } = useContext(APIContext);

  const getMerchantData = async () => {
    const URL = `${API_URL}merchant/${id}`;
    try {
      const responseMerchant = await axios.get(URL);
      setMerchant(responseMerchant.data.data.merchantData);
      setPackets(responseMerchant.data.data.packetData);
    } catch (error) {}
  };

  useEffect(() => {
    getMerchantData();
  }, []);

  return (
    merchant && (
      <>
        <div className="py-20 px-16 min-h-screen">
          <div className="rounded shadow-md flex flex-row items-center py-8 px-12 gap-16 cursor-pointer">
            <img
              src={merchant.merchantimage}
              alt=""
              className="w-32 rounded-full aspect-square"
            />
            <div className="flex flex-col gap-5 w-11/12 items-start">
              <div className="flex flex-row w- items-center justify-between self-stretch">
                <h3 className="text-3xl font-extrabold">
                  {merchant.merchantname}
                </h3>
                <div className="flex flex-row gap-2 items-center mt-4 self-start">
                  <p className="text-xl">{merchant.reviewrating}</p>
                  <BsFillStarFill className="text-yellow-300 w-8 h-8" />
                </div>
              </div>
              <a
                href={`http://wa.me/${merchant.merchantphone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex flex-row items-center border-2 gap-4 py-2 px-4 border-primary rounded-lg hover:bg-primary transition-colors group">
                  <div className="text-xl font-bold text-primary group-hover:text-white">
                    Available on WhatsApp
                  </div>
                  <BsWhatsapp className="fill-primary w-6 h-6 group-hover:fill-white" />
                </div>
              </a>
            </div>
          </div>
          <div className="text-3xl font-bold my-8">Packets</div>
          <div className="flex flex-col gap-5">
            {packets.map((packet) => (
              <HPackageCard packet={packet} />
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default MerchantPage;
