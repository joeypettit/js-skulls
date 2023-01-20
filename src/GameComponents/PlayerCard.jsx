import Button from "react-bootstrap/Button";
import { useGameState } from "../Contexts/GameStateProvider";

function PlayerCard({ card }) {
  const { playCard } = useGameState();

  function handlePlayCard() {
    playCard(card.cardId);
  }

  return (
    <div>
      {/* ~~~~ conditionals renders for in-hand cards ~~~~ */}
      {card.isSkull && card.isInHand && (
        <Button
          variant="danger"
          size="lg"
          className="py-4 px-4"
          onClick={handlePlayCard}
        >
          💀
        </Button>
      )}
      {!card.isSkull && card.isInHand && (
        <Button
          variant="success"
          size="lg"
          className="py-4 px-4"
          onClick={handlePlayCard}
        >
          🌹
        </Button>
      )}

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

export default PlayerCard;
