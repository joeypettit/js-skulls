import Button from "react-bootstrap/Button";
import { useGameState } from "../Contexts/GameStateProvider";

function PlayerCard({ card, isPlayerTurn, setShowHand }) {
  const { playCard } = useGameState();

  function handlePlayCard() {
    playCard(card.cardId);
    setShowHand(false);
  }

  return (
    <div>
      {/* ~~~~ conditionals renders for in-hand cards ~~~~ */}
      {card.isSkull && (
        <Button
          variant="danger"
          size="lg"
          className="py-4 px-4"
          onClick={handlePlayCard}
          disabled={isPlayerTurn ? false : true}
        >
          💀
        </Button>
      )}
      {!card.isSkull && (
        <Button
          variant="success"
          size="lg"
          className="py-4 px-4"
          onClick={handlePlayCard}
          disabled={isPlayerTurn ? false : true}
        >
          🌹
        </Button>
      )}
    </div>
  );
}

export default PlayerCard;
