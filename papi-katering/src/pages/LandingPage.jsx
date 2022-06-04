import React from "react";
import { Link } from "react-router-dom";
import bento1 from "../assets/bento1.png";
// import "../styles/landing.css";

function LandingPage() {
  return (
    <div className="bg-white z-10 absolute top-0 w-full">
      <div className="flex flex-row items-center min-h-screen gap-5">
        <div className="w-1/2 flex justify-center">
          <div className="flex flex-col items-start gap-5">
            <p className="text-red-600 font-semibold text-lg">TODAY'S FAVOURITE</p>
            <h1 className="text-5xl font-black leading-[4rem]">
              Freshness <br /> in every bite
            </h1>
            <p className="text-lg font-medium">
              Have yourself a bento with variety of
              <br />
              beef, chicken, sushi, seafood, and salads!
            </p>
            <Link
              to="/login"
              className="py-3 bg-primary text-xl text-white font-semibold px-24 rounded-full self-center mt-5 hover:opacity-75"
            >
              Login to PapiKatering
            </Link>
            <Link
              to="/register"
              className="self-center text-primary font-semibold"
            >
              Or Register Here
            </Link>
          </div>
        </div>
        <div className="relative self-start h-screen w-1/2 flex justify-center items-center">
          <svg
            className="absolute -z-10 top-0 right-0 h-full"
            viewBox="0 0 784 983"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M783.82 982.073V-0.999985H552.923C466.526 -0.999954 496.313 33.9331 465.461 62.7968C388.82 134.5 330.701 88.4544 243.56 100.974C166.82 112 133.603 153.939 130.111 217.516C127.035 273.5 152.545 287.296 180.088 324.012C229.564 389.964 344.53 353.311 359.509 434.526C379.629 543.622 151.32 479 85.1307 502.844C18.9415 526.687 -24.9966 597.767 15.6616 672.633C56.3199 747.5 184.415 726.052 115.117 810.776C45.8199 895.5 160.053 982.073 243.56 982.073H783.82Z"
              fill="#28937F"
            />
          </svg>

          <img src={bento1} alt="" className="mr-40" />
        </div>
      </div>
      <div></div>

      <section>
        <div className="circle"></div>
        <div className="content1">
          <div className="textBox">
            <h1 className="head1">TODAY'S FAVOURITE</h1>
            <h2 className="head2">
              Freshness <br />
              in every Bite!
            </h2>{" "}
            <br />
            <p className="p1">
              Have yourself a bento with <br />
              variety of beef, chicken, sushi, seafood, and salads!
            </p>
            <div className="buton">
              <button>Login to PapiKatering</button>
            </div>
            <div className="buton1">
              <button>or register here!</button>
            </div>
          </div>

          <div className="imgBox">
            <img src={bento1} className="papi" />
          </div>
        </div>
      </section>

      {/* <div className="header5">
        <h5>PapiKatering's Core Features</h5>
      </div> */}

      {/* <div className="row">
        <div className="container">
          <div className="box">
            <div className="icon">
              <img src={refresh} />
            </div>
            <div className="content">
              <h3>Subscription</h3>
              <p>
                Subscribe to a catering package and relieve yourself from
                repetitive food decisions
              </p>
            </div>
          </div>
        </div> */}

      {/* <div className="container">
          <div className="box">
            <div className="icon">
              <img src={house} />
            </div>
            <div className="content">
              <h3>Marketplace</h3>
              <p>
                Make your catering known by selling packages for customers to
                subscribe
              </p>
            </div>
          </div>
        </div> */}

      {/* <div className="container">
          <div className="box">
            <div className="icon">
              <img src={call} />
            </div>
            <div className="content">
              <h3>Recommendation</h3>
              <p>
                Ask PapiAdvisor for advice on what to eat and get
                recommendations based on your food n eds
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="greenbox">
        <div className="title1">
          <h4>Welcome to PapiKatering</h4>
        </div>
        <div className="para">
          <p>
            After living through college, we found that it was quite troublesome
            to decide on what to eat each time we wanted to, and the lack of
            structure in our daily meals led to unhealthy food choices within
            our daily lives. Well no wonder when we have so many things to do !
          </p>
          <div className="para2">
            <p>
              Thus, PapiKatering was born, a website that helps customers to
              subscribe to caterings and for merchants to sell their food
              packets. We provide customers with the ability to subscribe once
              and decide how long the subscription lasts so that there will be
              no extra food from overdued subscription. There’s also
              PapiAdviser, which gives questions to give you a more personalized
              recommendation on your food choices. Customers can also filter out
              the food that they want, whether it’s halal, vegetarian, or many
              others!
            </p>
          </div>
        </div>
      </div> */}

      {/* <div className="boxword">
        <div className="overlay">
          <img src={catering} alt="Food" className="foodpic1" />
          <p className="para3">
            Join Papi's forces and make less food choices today!
          </p>
          <button className="buton">Register</button>
        </div>
      </div> */}
    </div>
  );
}

export default LandingPage;
