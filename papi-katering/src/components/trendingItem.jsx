import React from 'react';
import {AiFillStar} from 'react-icons/ai';

function trendingItem({image, name, place, rate, fee}) {
  return (
    <div className="trendingItem">
      <div style={{ backgroundImage: `url(${image})` }}></div>
      <h1>{name}</h1>
      <p>{place} <AiFillStar/>{rate}</p>
      <p>{fee}</p>
      <p></p>
    </div>
  );
}

export default trendingItem;