import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Card({ card }) {
  return (
    <div>
      {card.isSkull ? (
        <Button variant="danger" size="lg" className="m-2">
          💀
        </Button>
      ) : (
        <Button variant="success" size="lg" className="m-2">
          🌹
        </Button>
      )}
    </div>
  );
}

export default Card;
