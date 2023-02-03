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
  }, [gameState.gamePhase, gameState.flipRequestedTo]);

  return (
    <div className="p-2">
      <div className="d-flex justify-content-between">
        <div>
          It is {whoseTurn.playerId === userId ? "your" : whoseTurn.name + "'s"}{" "}
          turn.
        </div>
        <div>GamePhase: {gameState.gamePhase}</div>
      </div>
      {gameState.gamePhase === "Raise or Pass" && (
        <div className="m-1 text lead text-center">
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
      {gameState.players.map((player) => {
        return <PlayerTableBox player={player} userId={userId} />;
      })}
    </div>
  );
}

export default Gameboard;
