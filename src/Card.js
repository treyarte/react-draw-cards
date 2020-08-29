import React, { useState } from 'react';
import './Card.css';
const random = (min = 0, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const Card = ({ image, value, suite, code }) => {
  const [{ rotate, xPos, yPos }] = useState({
    rotate: random(100, 180),
    xPos: random(20, 50),
    yPos: random(20, 50),
  });

  const transform = `translate(${xPos}px, ${yPos}px) rotate(${rotate}deg)`;

  return (
    <img
      className='card'
      src={image}
      alt={`${value} of ${suite}`}
      id={code}
      style={{ transform }}
    />
  );
};

export default Card;
