import { useGameState } from "../Contexts/GameStateProvider";

function TableHand({ player, userId }) {
  const { gameState } = useGameState();

  return (
    <div className="d-flex flex-column p-2">
      <div className="bg-light rounded text-center p-1">
        {player.name}{" "}
        {gameState.latestBet.highestBetter.playerId === player.playerId && "⭐"}
        {player.hasFolded && (
          <span className="text-muted">
            <em>-(Out)-</em>
          </span>
        )}
      </div>
      <div className="d-flex flex-row">
        {player.cardsInHand.map((card, index) => {
          if (card.isRevealed === false) {
            return (
              <div key={index} className="m-1 bg-secondary">
                🎴
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default TableHand;
