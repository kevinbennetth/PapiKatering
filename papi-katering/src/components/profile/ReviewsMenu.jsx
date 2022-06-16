import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import API from "../../apis/API";
import { selectImage } from "../UI/button/firebase/uploadUtilities";
import ReviewCard from "../UI/card/ReviewCard";
import { Link } from "react-router-dom";

const ReviewsMenu = (props) => {
  const custID = props.custID;
  const [reviews, setReviews] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await API.get(
          `/review?type=user&customerID=${custID}`
        );
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);

    return d.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="reviews-menu">
      <div className="title text-3xl border-b-2">Reviews</div>
      {reviews &&
        reviews.map((review) => (
          <Link to={`/detail/${review.packetid}`} key={review.reviewid}>
            <ReviewCard key={review.reviewid} review={review} />
          </Link>
        ))}
    </div>
  );
};

export default ReviewsMenu;
