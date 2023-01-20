import { useState } from "react";
import Button from "react-bootstrap/Button";

function PlayerCard({ card }) {
  console.log("this card", card.isSkull);
  return (
    <div>
      {/* ~~~~ conditionals renders for in-hand cards ~~~~ */}
      {card.isSkull && card.isInHand && (
        <Button variant="danger" size="lg" className="py-4 px-4">
          💀
        </Button>
      )}
      {!card.isSkull && card.isInHand && (
        <Button variant="success" size="lg" className="py-4 px-4">
          🌹
        </Button>
      )}

      {/* ~~~~ conditionals renders for in-play cards ~~~~ */}
      {card.isSkull && card.isRevealed && card.isInPlay && (
        <Button variant="danger" size="lg" className="py-4 px-4">
          💀
        </Button>
      )}
      {!card.isSkull && card.isRevealed && card.isInPlay && (
        <Button variant="success" size="lg" className="py-4 px-4">
          🌹
        </Button>
      )}
      {!card.isRevealed && card.isInPlay && (
        <Button variant="light" size="lg" className="py-4 px-4">
          🎴
        </Button>
      )}
    </div>
  );
}

export default PlayerCard;
