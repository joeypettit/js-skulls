import { useState } from "react";
import Button from "react-bootstrap/Button";

function Card({ card }) {
  console.log("this card", card.isSkull);
  return (
    <div>
      {card.isSkull ? (
        <Button variant="danger" size="lg" className="py-4 px-4">
          💀
        </Button>
      ) : (
        <Button variant="success" size="lg" className="py-4 px-4">
          🌹
        </Button>
      )}
    </div>
  );
}

export default Card;
