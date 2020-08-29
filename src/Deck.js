import React from 'react';
import Card from './Card';
const Deck = ({ cards }) => {
  return (
    <div className='deck'>
      {cards.map((card) => (
        <Card
          key={card.code}
          image={card.image}
          value={card.value}
          suit={card.suite}
          code={card.code}
        />
      ))}
    </div>
  );
};

export default Deck;
