import React from "react";
import PlayerCard from "./PlayerCard";

function CardsOnTable({ cards }) {
  return (
    <div>
      {cards.map((card) => {
        if (card.isRevealed && card.isInPlay) {
          return <PlayerCard card={card} />;
        }
      })}
    </div>
  );
}

export default CardsOnTable;
