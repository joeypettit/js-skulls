import Button from "react-bootstrap/Button";

function TableCards({ card }) {
  return (
    <div>
      {/* ~~~~ conditionals renders for in-play cards ~~~~ */}
      {card.isSkull && card.isRevealed && card.isInPlay && !card.isInHand && (
        <Button variant="danger" size="lg" className="py-4 px-3 mx-1">
          💀
        </Button>
      )}
      {!card.isSkull && card.isRevealed && card.isInPlay && !card.isInHand && (
        <Button variant="success" size="lg" className="py-4 px-3 mx-1">
          🌹
        </Button>
      )}
      {!card.isRevealed && card.isInPlay && !card.isInHand && (
        <Button variant="light" size="lg" className="py-4 px-3 mx-1">
          🎴
        </Button>
      )}
    </div>
  );
}

export default TableCards;
