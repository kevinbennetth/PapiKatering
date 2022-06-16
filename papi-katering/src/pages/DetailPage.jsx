import React, { useContext, useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import MenuCard from "../components/UI/card/MenuCard";
import ReviewModal from "../components/UI/modal/ReviewModal";
import WarningModal from "../components/UI/modal/WarningModal";
import ReviewCard from "../components/UI/card/ReviewCard";
import ItemsCarousel from "react-items-carousel";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Button from "../components/UI/button/Button";
import { APIContext, CartContext, UserContext } from "../context/context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function DetailPage() {
  const { API_URL } = useContext(APIContext);
  const { cart, onUpdateCart } = useContext(CartContext);

  const { id } = useParams();

  const { customerID, merchantID } = useContext(UserContext);

  const navigate = useNavigate();

  const [orderCount, setOrderCount] = useState(1);
  const [modal, setModal] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [packet, setPacket] = useState(null);
  const [hasReview, setHasReview] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [warningMessage, setWarningMessage] = useState({
    header: "",
    detail: "",
  });
  const [warningSelect, setWarningSelect] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  const checkCanReview = (data) => {
    if (merchantID !== null) {
      if (data.merchant.merchantid === merchantID) {
        setHasReview(true);
      } else {
        for (let index = 0; index < data.review.length; index++) {
          const review = data.review[index];

          if (review.customerid === customerID) {
            setHasReview(true);
            break;
          }
        }
      }
    }
  };

  const getPacket = async () => {
    const API = `${API_URL}packet/${id}?merchantData=true`;
    try {
      const data = await axios.get(API);
      setPacket(data.data);
      checkCanReview(data.data);
    } catch (error) {}
  };

  const refetchData = () => {
    getPacket();
  };

  useEffect(() => {
    getPacket();
  }, []);

  const hideModalHandler = () => {
    setModal(null);
  };

  const editReviewHandler = (reviewID) => {
    setModal("REVIEW");
    const review = packet.review.filter(
      (review) => review.reviewid === reviewID
    );
    setSelectedReview(...review);
  };

  const deleteReviewHandler = async (reviewID) => {
    const API = `${API_URL}review/${reviewID}`;
    try {
      setUploadProgress(20);
      await axios.delete(API);
      hideModalHandler();
      refetchData();
      setSelectedReview(null);
      setHasReview(false);
    } catch (error) {
      console.log(error);
    }
    setUploadProgress(100);
  };

  const addToCartHandler = () => {
    if (cart.packetid !== "" && warningSelect === 0) {
      setWarningMessage({
        header: "Cart is Already Filled",
        detail: "Are you sure you want to delete your previous cart item ?",
      });
      setModal("WARNING");
    } else {
      const newCartItem = {
        packetid: packet.packetid,
        customerid: customerID,
        merchantid: packet.merchant.merchantid,
        orderquantity: parseInt(orderCount),
      };
      onUpdateCart(newCartItem);
      navigate("/checkout");
    }
  };

  const selectHandler = (value) => {
    setWarningSelect(() => value);
    addToCartHandler();
  };

  return (
    packet && (
      <div className="py-20 px-24 flex flex-col gap-10">
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
        <WarningModal
          show={modal === "WARNING"}
          onHideModal={hideModalHandler}
          header={warningMessage.header}
          detail={warningMessage.detail}
          onSelect={selectHandler}
        />
        <ReviewModal
          show={modal === "REVIEW"}
          onHideModal={hideModalHandler}
          packetid={packet.packetid}
          onUpdate={refetchData}
          onDelete={deleteReviewHandler}
          selectedReview={selectedReview}
          onChangeProgress={setUploadProgress}
        />
        <div className="flex flex-row gap-16 items-center">
          <div className="w-1/2">
            <img
              src={packet.packetimage}
              alt=""
              className="w-1/2 aspect-square rounded-md m-auto object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <h1 className="text-6xl font-semibold">{packet.packetname}</h1>
            <div className="flex flex-row items-center gap-2 my-2">
              <h4>Terjual {packet.transactioncount}</h4>
              <BsFillStarFill className="text-yellow-300 w-6 h-6" />
              <h4>{packet.reviewaverage}</h4>
              <h4>({packet.reviewcount} Ulasan)</h4>
            </div>
            <div className="flex flex-row gap-4 flex-wrap">
              {packet.category.map((category) => (
                <span
                  key={category.categoryid}
                  className="bg-primary text-white px-4 py-1 rounded-full font-semibold"
                >
                  {category.categoryname}
                </span>
              ))}
            </div>
            <h2 className="text-4xl my-4 font-semibold">
              Rp {packet.packetprice}
            </h2>
            <h3 className="text-xl font-semibold">Detail</h3>
            <p>{packet.packetdescription}</p>
            <div className="flex flex-row w-1/2 gap-4 my-4">
              <input
                type="number"
                min={1}
                value={orderCount}
                onChange={(e) => {
                  setOrderCount(e.target.value);
                }}
                className="w-3/12 border-2 rounded text-xl text-center border-primary p-2 focus:outline-none"
              />
              <Button
                onClick={addToCartHandler}
                disabled={merchantID === packet.merchant.merchantid}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <ItemsCarousel
          requestToChangeActive={(e) => setActiveItemIndex(e)}
          activeItemIndex={activeItemIndex}
          numberOfCards={3}
          gutter={20}
          leftChevron={
            <button>
              <AiOutlineLeft className="fill-primary mx-1" />
            </button>
          }
          rightChevron={
            <button>
              <AiOutlineRight className="fill-primary mx-1" />
            </button>
          }
          outsideChevron
          chevronWidth={40}
        >
          {packet.menu.map((menu) => (
            <MenuCard menu={menu} key={menu.menuid} type={"VIEW"} />
          ))}
        </ItemsCarousel>
        <div
          onClick={() => navigate(`/merchant/${packet.merchant.merchantid}`)}
          className="rounded shadow-md flex flex-row items-center p-8 gap-10 cursor-pointer hover:scale-[101%] transition-transform"
        >
          <img
            src={packet.merchant.merchantimage}
            alt=""
            className="w-24 aspect-square rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="text-2xl font-extrabold">
              {packet.merchant.merchantname}
            </h3>
            <div className="flex flex-row gap-2 items-center mt-4">
              <BsFillStarFill className="text-yellow-300 w-6 h-6" />
              {packet.merchant.reviewaverage + " "}
              <p>rata-rata ulasan</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {!hasReview && (
            <div className="flex flex-row justify-between">
              <h4 className="text-2xl font-bold">Reviews</h4>
              <h4
                className="text-xl font-bold text-primary cursor-pointer hover:text-opacity-60"
                onClick={() => setModal("REVIEW")}
              >
                + Add Review
              </h4>
            </div>
          )}
          <div className="flex flex-col gap-6">
            {packet.review.map((review) => (
              <ReviewCard
                key={review.reviewid}
                review={review}
                canEdit={customerID === review.customerid}
                onEdit={editReviewHandler}
                onDelete={deleteReviewHandler}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
}
