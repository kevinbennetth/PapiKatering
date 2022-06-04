import {FaStar} from "react-icons/fa";
import { useState, useEffect } from "react";
import API from "../../apis/API";

const ReviewsMenu = (props) => {

    const custID = props.custID;
    const [reviews, setReviews] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await API.get(`/review?type=user&customerID=${custID}`);
                setReviews(response.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchReviews();
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);

        return d.toLocaleString('id-ID', { day: '2-digit', month: 'short' , year: 'numeric'});
    }

    return (
        <div className="reviews-menu">
            <div className="title text-3xl border-b-2">Reviews</div>
            { reviews && reviews.map((review) => (
                <div className="grid grid-cols-12 gap-4 mt-8 bg-white p-4 rounded-md drop-shadow-md">
                    <div className="profile-pic col-span-1">
                        <img src="https://static.zerochan.net/Ko.Elizabeth.full.2947878.jpg" alt=""
                        className="profile-img-round rounded-full w-24" />
                    </div>
                    <div className="card-header grid grid-cols-12 gap-4 col-span-11">
                        <div className="name-date col-span-8">
                            <strong>{review.customername}</strong><br />
                            {formatDate(review.reviewdate)}
                        </div>
                        <div className="shop-name col-span-3">
                                {review.merchantname}
                        </div>
                        <div className="score flex flex-row col-span-1"><FaStar className="fill-amber-500"/> <strong>{review.reviewrating}</strong></div>
                        <div className="review-content col-span-12">
                            {review.reviewdescription}
                        </div>
                    </div>
                </div>)
            )}
        </div>
    );
}

export default ReviewsMenu;