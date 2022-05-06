import {FaStar} from "react-icons/fa";

const ReviewsMenu = () => {
    return (
        <div className="reviews-menu">
            <div className="title text-3xl border-b-2">Reviews</div>
                <div className="grid grid-cols-12 gap-4 mt-8 bg-white p-4 rounded-md drop-shadow-md">
                    <div className="profile-pic col-span-1">
                        <img src="https://static.zerochan.net/Ko.Elizabeth.full.2947878.jpg" alt=""
                        className="profile-img-round rounded-full w-24" />
                    </div>
                    <div className="card-header grid grid-cols-12 gap-4 col-span-11">
                        <div className="name-date col-span-8">
                            <strong>Bang Jago</strong><br />
                            12 Jan 2022
                        </div>
                        <div className="shop-name col-span-3">
                                Catering by Ryne 
                        </div>
                        <div className="score flex flex-row col-span-1"><FaStar className="fill-amber-500"/> <strong>5</strong></div>
                        <div className="review-content col-span-12">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptas perferendis debitis, consequuntur aut neque quisquam ad. Doloremque rem numquam provident, voluptatum ducimus, nisi repudiandae dignissimos est sint animi quaerat?
                        </div>
                    </div>
                    
                </div>
        </div>
    );
}

export default ReviewsMenu;