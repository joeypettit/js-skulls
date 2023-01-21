import React from "react";
import TableCards from "./TableCards";

function CardsOnTable({ cards }) {
  return (
    <div className="d-flex flex-row mx-1">
      {cards.map((card, index) => {
        if (card.isInPlay) {
          return <TableCards key={index} card={card} />;
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default CardsOnTable;
