import React from 'react';
import {AiFillStar} from 'react-icons/ai';

function popularItem({image, name, place, rate}) {
  return (
    <div className="popularItem">
      <div style={{ backgroundImage: `url(${image})` }}></div>
      <h1>{name}</h1>
      <p>{place}</p>
      <p><AiFillStar/>{rate}</p>
    </div>
  );
}

export default popularItem;
