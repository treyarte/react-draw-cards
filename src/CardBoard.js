import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import Deck from './Deck';
import './CardBoard.css';
const DECK_API = 'https://deckofcardsapi.com/api/deck/';

const CardBoard = ({ deckCount }) => {
  const [draw, setDraw] = useState(false);
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({});
  const [complete, setComplete] = useState(false);
  const remaining = useRef();

  remaining.current = deck.hasOwnProperty('remaining') ? deck.remaining : 0;

  useEffect(() => {
    async function shuffleCards() {
      const res = await Axios.get(
        `${DECK_API}new/shuffle/?deck_count=${deckCount}`
      );

      setDeck(() => ({
        ...res.data,
      }));
    }
    shuffleCards();
  }, [setDeck, deckCount]);

  useEffect(() => {
    if (draw) {
      const { deck_id } = deck;
      async function drawCard() {
        const res = await Axios.get(`${DECK_API}${deck_id}/draw/?count=1`);

        if (res.data.remaining !== 0) {
          setCards((card) => [...cards, ...res.data.cards]);
        } else {
          alert('Error: No cards!');
          setComplete(true);
        }
      }

      drawCard();
    }
  }, [setCards, deck, draw, cards]);

  const handleClick = () => {
    if (!complete) {
      const toggleDraw = () => {
        setDraw(!draw);
      };
      toggleDraw();
    } else {
      alert('Error: No Cards!');
    }
  };

  return (
    <div className='card-board'>
      <div className='draw-btn'>
        <button onClick={handleClick}>Draw</button>
      </div>
      <Deck cards={cards} />
    </div>
  );
};

export default CardBoard;
