import React from "react";
import PlayerCard from "./PlayerCard";

function CardsOnTable({ cards }) {
  return (
    <div className="d-flex flex-row mx-1">
      {cards.map((card) => {
        if (card.isInPlay) {
          return <PlayerCard card={card} />;
        }
      })}
    </div>
  );
}

export default CardsOnTable;
