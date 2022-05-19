import React from 'react';
import logo from '../assets/bento1.png'
import {popularList} from '../HELPERS/popularList';
import {trendingList} from '../HELPERS/trendingList';
import PopularItem from '../components/popularItem';
import TrendingItem from '../components/trendingItem';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../styles/Home.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};



function Home() {
  return (
    <div>
      <div className="content">
            <div className="textBox">
                <h1>TODAY'S FAVOURITE</h1>
                
                <h2>Freshness in every Bite!</h2> 


                <p>Have yourself a bento with  
                variety of beef, chicken, sushi, seafood, and salads!</p>
                <div className="visit">
                    <button>Visit Merchant Page</button>
                </div> 
            </div>

            <div className="imgBox">
               <img src={logo} alt="Logo" />
            </div>
        </div>
      <div className="home">
        <div className="judul">
          <h2 className="recom">PAPI'S RECOMMENDATION</h2>
          <button>Retake Quiz</button>
        </div>

      
            <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={false}
            autoPlay={false}
            className="trendingList"
              >
                {trendingList.map((trendingItem, key) => {
                    return (
                    <TrendingItem 
                    key={key}
                    image={trendingItem.image} 
                    name={trendingItem.name} 
                    place={trendingItem.place} 
                    rate={trendingItem.rate}
                    fee={trendingItem.fee}
                    />
                    );
                })}
            </Carousel>

          <h1 className="mostPopular">MOST POPULAR MERCHANTS</h1>
          <div className="popularList">
                {popularList.map((popularItem, key) => {
                    return (
                    <PopularItem 
                    key={key}
                    image={popularItem.image} 
                    name={popularItem.name} 
                    place={popularItem.place} 
                    rate={popularItem.rate}
                    />
                    );
                })}
          </div>
          <h2 className="trending">TRENDING TODAY</h2>
            <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={false}
            autoPlay={false}
            className="trendingList"
              >
                {trendingList.map((trendingItem, key) => {
                    return (
                    <TrendingItem 
                    key={key}
                    image={trendingItem.image} 
                    name={trendingItem.name} 
                    place={trendingItem.place} 
                    rate={trendingItem.rate}
                    fee={trendingItem.fee}
                    />
                    );
                })}
            </Carousel>
          
      </div>
    </div>
  );
}

export default Home;
