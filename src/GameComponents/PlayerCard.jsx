import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Card({ card }) {
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
