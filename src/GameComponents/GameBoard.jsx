import { useEffect } from "react";
import PlayerTableBox from "./PlayerTableBox";

function Gameboard({ gameState, userId, setShowFlipModal, showFlipModal }) {
  // get player object of the player whose turn it is
  let whoseTurn = gameState.players[gameState.playerTurnIndex];

  // this use effect should be put up in its the game components, but
  // was placed here to make sure gameState is available to it.
  // fix this later...
  useEffect(() => {
    if (gameState.gamePhase === "flip-cards" && gameState.flipRequestedTo) {
      setShowFlipModal(true);
    } else {
      if (showFlipModal === true) {
        setShowFlipModal(false);
      }
    }
  }, [
    gameState.gamePhase,
    gameState.flipRequestedTo,
    setShowFlipModal,
    showFlipModal,
  ]);

  return (
    <div className="p-2">
      {gameState.gamePhase === "set-round" ||
        gameState.gamePhase === "Play or Bet" ||
        (gameState.gamePhase === "Raise or Pass" && (
          <div className="m-2 text-center lead bg-warning rounded shadow border border-warning p-1">
            It is{" "}
            {whoseTurn.playerId === userId ? "your" : whoseTurn.name + "'s"}{" "}
            turn.
          </div>
        ))}
      {gameState.gamePhase === "flip-cards" && (
        <div className="m-2 text-center lead bg-warning rounded shadow border border-warning p-1">
          {gameState.latestBet.highestBetter.name} is the highest better.
        </div>
      )}

      {gameState.gamePhase === "Raise or Pass" && (
        <div className="m-2 text lead text-center bg-light rounded p-1 border border-warning">
          ⭐{" "}
          <strong>
            {gameState.latestBet.highestBetter.playerId === userId
              ? "You"
              : gameState.latestBet.highestBetter.name}
          </strong>{" "}
          bet {gameState.latestBet.numOfCards}{" "}
          {gameState.latestBet.numOfCards === 1 ? "card" : "cards"} ⭐
        </div>
      )}
      {gameState.players.map((player, index) => {
        return <PlayerTableBox key={index} player={player} userId={userId} />;
      })}
    </div>
  );
}

export default Gameboard;
