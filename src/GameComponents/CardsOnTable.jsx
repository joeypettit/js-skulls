import React from "react";
import TableCards from "./TableCards";

function CardsOnTable({ cards }) {
  return (
    <div className="d-flex flex-row mx-1">
      {cards.map((card, index) => {
        if (card.isInPlay) {
          return <TableCards key={index} card={card} />;
        }
      })}
    </div>
  );
}

export default CardsOnTable;
