import React from "react";
import { Link } from "react-router-dom";
import bento from "../assets/bento1.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import Footer from "../components/Footer";

// import "../styles/landing.css";

function LandingPage() {
  return (
    <div className="bg-[#F8F8F8] z-10 absolute top-0 w-full">
      <div className="flex flex-row items-center min-h-screen gap-5">
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
              to="/login"
              className="py-4 flex flex-row items-center gap-4 bg-primary text-xl text-white font-semibold px-16 rounded-full self-center mt-5 hover:opacity-75"
            >
              <p>Login to PapiKatering</p>

              <AiOutlineArrowRight className="fill-white mx-1 w-7 h-7" />
            </Link>
            <Link
              to="/register"
              className="self-center text-primary font-semibold hover:underline"
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

          <img src={bento} alt="" className="mr-40" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen gap-28 px-20">
        <h2 className="text-5xl font-black">PapiKatering's Core Features</h2>
        <div className="flex flex-row w-full gap-12">
          <div className="bg-white p-6 shadow-md rounded-lg m-2 w-1/3 flex flex-col items-center  gap-4 py-12 hover:-translate-y-2 transition-transform cursor-pointer">
            <svg
              viewBox="0 0 103 103"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3/12"
            >
              <path
                d="M94.4167 51.5C94.4167 77.25 75.5763 94.4167 52.3326 94.4167C33.4407 94.4167 18.1967 84.3957 12.875 68.6667M8.58337 51.5C8.58337 25.75 27.4238 8.58337 50.6675 8.58337C69.5637 8.58337 84.8034 18.6044 90.125 34.3334"
                stroke="#28937F"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30.0417 72.9584L12.875 68.6667L8.58337 85.8334M72.9584 30.0417L90.125 34.3334L94.4167 17.1667"
                stroke="#28937F"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h3 className="text-3xl font-bold">Subscription</h3>
            <p className="text-lg text-center">
              Subscribe to a catering package and relieve yourself from
              repetitive food decisions
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg m-2 w-1/3 flex flex-col items-center  gap-4 py-12 hover:-translate-y-2 transition-transform cursor-pointer">
            <svg
              className="w-3/12 mb-2"
              viewBox="0 0 106 94"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_243_828)">
                <path
                  d="M19.6763 7.93125C20.2982 7.28638 21.0704 6.76865 21.9396 6.41369C22.8088 6.05872 23.7543 5.87494 24.7113 5.875H81.2887C82.2457 5.87494 83.1912 6.05872 84.0604 6.41369C84.9296 6.76865 85.7018 7.28638 86.3237 7.93125L103.608 25.8148C105.152 27.4118 106 29.4456 106 31.5487V33.0469C106 35.9549 104.976 38.7903 103.071 41.1569C101.165 43.5234 98.4731 45.3029 95.3714 46.2465C92.2696 47.1901 88.9128 47.2508 85.7703 46.42C82.6278 45.5891 79.8565 43.9084 77.8438 41.6126C76.3739 43.2915 74.4904 44.6499 72.3373 45.5837C70.1842 46.5175 67.8187 47.0019 65.4219 47C63.025 47.0024 60.6593 46.5181 58.5061 45.5843C56.353 44.6504 54.4695 43.2918 53 41.6126C51.5305 43.2918 49.647 44.6504 47.4939 45.5843C45.3407 46.5181 42.975 47.0024 40.5781 47C38.1812 47.0024 35.8156 46.5181 33.6624 45.5843C31.5092 44.6504 29.6257 43.2918 28.1562 41.6126C26.1435 43.9084 23.3722 45.5891 20.2297 46.42C17.0871 47.2508 13.7304 47.1901 10.6286 46.2465C7.52688 45.3029 4.83508 43.5234 2.92946 41.1569C1.02384 38.7903 -0.000361716 35.9549 9.58276e-08 33.0469V31.5487C8.35249e-05 29.4456 0.848375 27.4118 2.39162 25.8148L19.6829 7.92537L19.6763 7.93125ZM31.4688 33.0469C31.4688 35.1893 32.4285 37.244 34.1368 38.759C35.8452 40.2739 38.1622 41.125 40.5781 41.125C42.9941 41.125 45.3111 40.2739 47.0194 38.759C48.7278 37.244 49.6875 35.1893 49.6875 33.0469C49.6875 32.2678 50.0365 31.5206 50.6577 30.9697C51.2789 30.4189 52.1215 30.1094 53 30.1094C53.8785 30.1094 54.7211 30.4189 55.3423 30.9697C55.9635 31.5206 56.3125 32.2678 56.3125 33.0469C56.3125 35.1893 57.2722 37.244 58.9806 38.759C60.6889 40.2739 63.0059 41.125 65.4219 41.125C67.8378 41.125 70.1548 40.2739 71.8632 38.759C73.5715 37.244 74.5312 35.1893 74.5312 33.0469C74.5312 32.2678 74.8802 31.5206 75.5015 30.9697C76.1227 30.4189 76.9652 30.1094 77.8438 30.1094C78.7223 30.1094 79.5648 30.4189 80.186 30.9697C80.8073 31.5206 81.1562 32.2678 81.1562 33.0469C81.1562 35.1893 82.116 37.244 83.8243 38.759C85.5327 40.2739 87.8497 41.125 90.2656 41.125C92.6816 41.125 94.9986 40.2739 96.7069 38.759C98.4153 37.244 99.375 35.1893 99.375 33.0469V31.5487C99.3751 30.8486 99.0931 30.1715 98.58 29.6394L81.2887 11.75H24.7113L7.42 29.6394C6.90688 30.1715 6.62494 30.8486 6.625 31.5487V33.0469C6.625 35.1893 7.58474 37.244 9.29307 38.759C11.0014 40.2739 13.3184 41.125 15.7344 41.125C18.1503 41.125 20.4673 40.2739 22.1757 38.759C23.884 37.244 24.8438 35.1893 24.8438 33.0469C24.8438 32.2678 25.1927 31.5206 25.814 30.9697C26.4352 30.4189 27.2777 30.1094 28.1562 30.1094C29.0348 30.1094 29.8773 30.4189 30.4985 30.9697C31.1198 31.5206 31.4688 32.2678 31.4688 33.0469ZM9.9375 49.9375C10.816 49.9375 11.6586 50.247 12.2798 50.7979C12.901 51.3488 13.25 52.0959 13.25 52.875V88.125H19.875V58.75C19.875 57.1919 20.573 55.6975 21.8154 54.5957C23.0578 53.494 24.7429 52.875 26.5 52.875H46.375C48.1321 52.875 49.8172 53.494 51.0596 54.5957C52.302 55.6975 53 57.1919 53 58.75V88.125H92.75V52.875C92.75 52.0959 93.099 51.3488 93.7202 50.7979C94.3414 50.247 95.184 49.9375 96.0625 49.9375C96.941 49.9375 97.7836 50.247 98.4048 50.7979C99.026 51.3488 99.375 52.0959 99.375 52.875V88.125H102.688C103.566 88.125 104.409 88.4345 105.03 88.9854C105.651 89.5363 106 90.2834 106 91.0625C106 91.8416 105.651 92.5887 105.03 93.1396C104.409 93.6905 103.566 94 102.688 94H3.3125C2.43397 94 1.59142 93.6905 0.970209 93.1396C0.348995 92.5887 9.58276e-08 91.8416 9.58276e-08 91.0625C9.58276e-08 90.2834 0.348995 89.5363 0.970209 88.9854C1.59142 88.4345 2.43397 88.125 3.3125 88.125H6.625V52.875C6.625 52.0959 6.97399 51.3488 7.59521 50.7979C8.21642 50.247 9.05897 49.9375 9.9375 49.9375ZM26.5 88.125H46.375V58.75H26.5V88.125ZM59.625 58.75C59.625 57.1919 60.323 55.6975 61.5654 54.5957C62.8078 53.494 64.4929 52.875 66.25 52.875H79.5C81.2571 52.875 82.9422 53.494 84.1846 54.5957C85.427 55.6975 86.125 57.1919 86.125 58.75V76.375C86.125 77.9331 85.427 79.4275 84.1846 80.5293C82.9422 81.631 81.2571 82.25 79.5 82.25H66.25C64.4929 82.25 62.8078 81.631 61.5654 80.5293C60.323 79.4275 59.625 77.9331 59.625 76.375V58.75ZM79.5 58.75H66.25V76.375H79.5V58.75Z"
                  fill="#28937F"
                />
              </g>
              <defs>
                <clipPath id="clip0_243_828">
                  <rect width="106" height="94" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <h3 className="text-3xl font-bold">Marketplace</h3>
            <p className="text-lg text-center">
              Make your catering known by selling packages for customers to
              subscribe
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg m-2 w-1/3 flex flex-col items-center  gap-4 py-12 hover:-translate-y-2 transition-transform cursor-pointer">
            <svg
              className="w-3/12"
              viewBox="0 0 101 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80.6183 5.79051C80.1407 5.3164 79.4929 5.05005 78.8174 5.05005C78.1419 5.05005 77.4941 5.3164 77.0164 5.79051C76.5388 6.26462 76.2705 6.90766 76.2705 7.57815C76.2705 8.24864 76.5388 8.89168 77.0164 9.36579C82.7957 15.0973 85.8126 23.8588 85.8126 32.8273C85.8126 41.7957 82.7957 50.5572 77.0164 56.2887C76.5388 56.7628 76.2705 57.4059 76.2705 58.0764C76.2705 58.7469 76.5388 59.3899 77.0164 59.864C77.4941 60.3381 78.1419 60.6045 78.8174 60.6045C79.4929 60.6045 80.1407 60.3381 80.6183 59.864C87.5575 52.971 90.9 42.7956 90.9 32.8273C90.9 22.8589 87.5575 12.6835 80.6183 5.79051ZM70.4435 15.8902C70.207 15.6554 69.9262 15.4692 69.6172 15.3421C69.3082 15.2151 68.977 15.1497 68.6426 15.1497C68.3081 15.1497 67.9769 15.2151 67.6679 15.3421C67.3589 15.4692 67.0781 15.6554 66.8416 15.8902C66.6051 16.1249 66.4175 16.4036 66.2895 16.7103C66.1615 17.0171 66.0957 17.3458 66.0957 17.6778C66.0957 18.0098 66.1615 18.3385 66.2895 18.6453C66.4175 18.952 66.6051 19.2307 66.8416 19.4654C70.0721 22.6721 71.8222 27.6461 71.8222 32.8273C71.8222 38.0084 70.0721 42.9825 66.8416 46.1891C66.364 46.6632 66.0957 47.3062 66.0957 47.9767C66.0957 48.6472 66.364 49.2903 66.8416 49.7644C67.3193 50.2385 67.9671 50.5048 68.6426 50.5048C69.3181 50.5048 69.9659 50.2385 70.4435 49.7644C74.8441 45.3963 76.9096 39.0082 76.9096 32.8273C76.9096 26.6463 74.8441 20.2583 70.4435 15.8902ZM20.3122 35.3522C20.3122 29.995 22.4562 24.8572 26.2725 21.0691C30.0888 17.281 35.2648 15.1529 40.6618 15.1529C46.0589 15.1529 51.2349 17.281 55.0512 21.0691C58.8675 24.8572 61.0115 29.995 61.0115 35.3522C61.0115 40.7094 58.8675 45.8471 55.0512 49.6352C51.2349 53.4233 46.0589 55.5515 40.6618 55.5515C35.2648 55.5515 30.0888 53.4233 26.2725 49.6352C22.4562 45.8471 20.3122 40.7094 20.3122 35.3522ZM40.6618 20.2027C38.6576 20.2027 36.6729 20.5946 34.8212 21.3559C32.9695 22.1172 31.287 23.2331 29.8698 24.6399C28.4526 26.0466 27.3284 27.7167 26.5614 29.5547C25.7944 31.3927 25.3996 33.3627 25.3996 35.3522C25.3996 37.3416 25.7944 39.3116 26.5614 41.1496C27.3284 42.9876 28.4526 44.6577 29.8698 46.0645C31.287 47.4712 32.9695 48.5871 34.8212 49.3485C36.6729 50.1098 38.6576 50.5016 40.6618 50.5016C44.7096 50.5016 48.5916 48.9055 51.4539 46.0645C54.3161 43.2234 55.9241 39.3701 55.9241 35.3522C55.9241 31.3343 54.3161 27.481 51.4539 24.6399C48.5916 21.7988 44.7096 20.2027 40.6618 20.2027ZM5.04999 70.7009C5.04999 65.0805 9.64392 60.6013 15.2706 60.6013H66.0989C68.7974 60.6013 71.3854 61.6654 73.2935 63.5594C75.2017 65.4535 76.2737 68.0223 76.2737 70.7009C76.2737 79.2402 72.0359 85.6787 65.4121 89.8751C58.89 94.0008 50.099 95.95 40.6618 95.95C31.2247 95.95 22.4337 94.0008 15.9116 89.8751C9.2878 85.6838 5.04999 79.2351 5.04999 70.7009ZM15.2706 65.6511C12.4166 65.6511 10.1374 67.9084 10.1374 70.7009C10.1374 77.3111 13.3018 82.2347 18.6486 85.613C24.0922 89.0621 31.8352 90.9002 40.6618 90.9002C49.4885 90.9002 57.2315 89.0621 62.675 85.613C68.0168 82.2297 71.1863 77.3162 71.1863 70.7009C71.1863 69.3616 70.6503 68.0772 69.6962 67.1302C68.7421 66.1831 67.4481 65.6511 66.0989 65.6511H15.2706Z"
                fill="#28937F"
              />
            </svg>

            <h3 className="text-3xl font-bold">Recommendation</h3>
            <p className="text-lg text-center">
              Ask PapiAdvisor for advice on what to eat and get recommendations
              based on your food n eds
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center min-h-screen bg-primary px-36 gap-24">
        <h2 className="text-5xl text-white font-black">
          Welcome to PapiKatering
        </h2>

        <div className="flex flex-col gap-4 text-2xl text-white">
          <p>
            After living through college, we found that it was quite troublesome
            to <strong>decide on what to eat</strong> each time we wanted to,
            and the lack of structure in our daily meals led to{" "}
            <strong>unhealthy food choices</strong> within our daily lives. Well
            no wonder when we have so many things to do !
          </p>
          <p>
            Thus, PapiKatering was born, a website that helps customers to{" "}
            <strong>subscribe to caterings</strong> and for merchants to sell
            their food packets. We provide customers with the ability to{" "}
            <strong>
              subscribe once and decide how long the subscription lasts
            </strong>{" "}
            so that there will be no extra food from overdued subscription.
            There’s also PapiAdviser, which gives questions to give you a more{" "}
            <strong>personalized recommendation</strong> on your food choices.
            Customers can also <strong>filter out the food</strong> that they
            want, whether it’s halal, vegetarian, or many others!
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center h-screen relative">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXBwZXRpemVyc3xlbnwwfHwwfHw%3D&w=1000&q=80"
          alt=""
          className="object-cover absolute top-0 w-full h-full -z-10"
        />
        <div className="bg-black/[.50] alpha h-full w-full flex flex-col items-center justify-center gap-8">
          <h2 className="text-white text-5xl font-bold w-2/3 text-center leading-[4.5rem]">
            Join Papi's Forces and Make Less <br /> Food Choices Today !
          </h2>
          <button className="py-5  bg-primary text-4xl text-white font-semibold px-24  rounded-md mt-5 hover:opacity-75">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
