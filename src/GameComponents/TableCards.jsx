import Button from "react-bootstrap/Button";

function TableCards({ card }) {
  return (
    <div>
      {/* ~~~~ conditionals renders for in-play cards ~~~~ */}
      {card.isSkull && card.isRevealed && (
        <Button variant="danger" size="lg" className="py-4 px-3 mx-1">
          💀
        </Button>
      )}
      {!card.isSkull && card.isRevealed && (
        <Button variant="success" size="lg" className="py-4 px-3 mx-1">
          🌹
        </Button>
      )}
      {!card.isRevealed && (
        <Button variant="light" size="lg" className="py-4 px-3 mx-1">
          🎴
        </Button>
      )}
    </div>
  );
}

export default TableCards;
