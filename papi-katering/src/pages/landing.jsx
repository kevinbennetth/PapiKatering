import React from 'react';
import logo from '../assets/logo-papi.png'
import bento1 from '../assets/bento1.png'
import catering from '../assets/catering.jpeg'
import refresh from '../assets/refresh.png'
import house from '../assets/house.png'
import call from '../assets/call.png'
import '../styles/landing.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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


function landing() {
  return (
    <div>
    <section>
        <header className="logopapi">
            <a href="#"><img src={logo} className="logo"/></a>
            <h1 className="title">PAPI CATERING</h1>
        </header>
        <div className="circle"></div>
        <div className="content1">
            <div className="textBox">
                <h1 className="head1">TODAY'S FAVOURITE</h1>
                
                <h2 className="head2">Freshness <br/>in every Bite!</h2> <br/>


                <p className="p1">Have yourself a bento with <br/> 
                variety of beef, chicken, sushi, seafood, and salads!</p>
                <div className="buton">
                  <button>Login to PapiKatering</button>
                </div>
                <div className="buton1">
                  <button>or register here!</button>
                </div>
               
            </div>

            <div className="imgBox">
                <img src={bento1} className="papi"/>
            </div>
        </div>


    </section>

    <div className="header5">
        <h5>PapiKatering's Core Features</h5>
    </div>

    <div className="row">
    <div className="container">
        <div className="box">
            <div className="icon"><img src={refresh}/></div>
            <div className="content">
                <h3>Subscription</h3>
                <p>Subscribe to a catering package and  relieve yourself from repetitive food decisions</p>
            </div>
        </div>
    </div>
    
    <div className="container">
        <div className="box">
        <div className="icon"><img src={house}/></div>
            <div className="content">
                <h3>Marketplace</h3>
                <p>Make your catering known by selling packages for customers to subscribe</p>
            </div>
        </div>
    </div>

    <div className="container">
        <div className="box">
        <div className="icon"><img src={call}/></div>
            <div className="content">
                <h3>Recommendation</h3>
                <p>Ask PapiAdvisor for advice on what to eat and get recommendations based on your food n eds</p>
            </div>
        </div>
    </div>

    </div>

    <div className="greenbox">
        <div className="title1"><h4>Welcome to PapiKatering</h4></div>
        <div className="para"><p>
            After living through college, we found that it was quite troublesome to decide on what to eat each 
            time we wanted to, and the lack of structure in our daily meals led to unhealthy food choices within our 
            daily lives. Well no wonder when we have so many things to do ! 
        </p>
        <div className="para2">
            <p>Thus, PapiKatering was born, a website 
                that helps customers to subscribe to caterings and for merchants to sell their food packets. We provide customers 
                with the ability to subscribe once and decide how long the subscription lasts so that there will be no extra food from overdued subscription. 
                There’s also PapiAdviser, which gives questions to give you a more personalized recommendation on your food choices. Customers can also 
                filter out the food that they want, whether it’s halal, vegetarian, or many others!</p>
        </div>
        </div>
    </div>

    <div className="boxword">
        <div className="overlay">
        <img src={catering} alt="Food" className="foodpic1"/>
        <p className="para3">Join Papi's forces and make less food choices today!</p>
      <button className="buton">Register</button>

      </div>

    </div>


    

    </div>
  );
}

export default landing;
