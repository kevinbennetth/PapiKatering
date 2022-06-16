import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { APIContext, UserContext } from "../../context/context";
import HPackageCard from "../UI/card/HPackageCard";

export default function PackageMenu() {
  const [packets, setPackets] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

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
      <LoadingBar
        height={8}
        color="#fde047"
        progress={uploadProgress}
        onLoaderFinished={() => setUploadProgress(0)}
      />
      <div
        className={`fixed w-screen h-screen bg-black bg-opacity-20 top-0 left-0 z-50 ${
          uploadProgress > 0 ? "block" : "hidden"
        }`}
      />
      <div className="flex flex-row border-b-2 mb-6">
        <div className="title basis-4/5 text-3xl">Packages</div>
        {merchantID !== "" && (
          <Link to="/addpacket" className="focus:outline-none">
            <button className="add basis-1/5 flex flex-row text-lg font-bold items-center justify-end hover:opacity-60">
              <FaPlus className="fill-primary mx-1" />
              <p className="text-primary">Add Package</p>
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
            onChangeUpload={setUploadProgress}
          />
        ))}
      </div>
    </div>
  );
}
