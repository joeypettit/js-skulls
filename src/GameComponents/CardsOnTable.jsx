import React from "react";
import TableCards from "./TableCards";

function CardsOnTable({ cards }) {
  return (
    <div className="d-flex flex-row mx-1">
      {cards.map((card) => {
        if (card.isInPlay) {
          return <TableCards card={card} />;
        }
      })}
    </div>
  );
}

export default CardsOnTable;
