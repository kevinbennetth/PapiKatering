import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { APIContext, UserContext } from "../../context/context";
import HPackageCard from "../UI/card/HPackageCard";

export default function PackageMenu() {
  const [packets, setPackets] = useState();
  const { merchantID } = useContext(UserContext);
  const { API_URL } = useContext(APIContext);

  const getMerchantData = async () => {
    const URL = `${API_URL}merchant/${merchantID}`;
    try {
      const responseMerchant = await axios.get(URL);
      setPackets(responseMerchant.data.data.packetData);
    } catch (error) {}
  };
  useEffect(() => {
    getMerchantData();
  }, []);

  const packetUpdateHandler = () => {
    getMerchantData();
  };

  return (
    <div className="profile-menu">
      <div className="flex flex-row border-b-2 mb-6">
        <div className="title basis-4/5 text-3xl">Packages</div>
        {merchantID !== "" && (
          <Link to="/addpacket" className="focus:outline-none">
            <button className="add basis-1/5 flex flex-row text-lg font-bold items-center justify-end">
              <FaPlus className="fill-emerald-600 mx-1" />
              <p className="text-emerald-600">Add Package</p>
            </button>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {packets?.map((packet) => (
          <HPackageCard
            key={packet.packetid}
            type="EDIT"
            packet={packet}
            onUpdate={packetUpdateHandler}
          />
        ))}
      </div>
    </div>
  );
}
