import { useEffect } from "react";
import TableHand from "./TableHand";
import CardsOnTable from "./CardsOnTable";

function Gameboard({ gameState, userId, setShowFlipModal }) {
  // get player object of the player whose turn it is
  let whoseTurn = gameState.players[gameState.playerTurnIndex];

  function flipRequestActivated() {
    const bettersId = gameState.latestBet.highestBetter.playerId;

    // if this user is the highest better and they have laid all of their cards,
    // (and the game is in the "flip-cards phase") return true, else false.
    if (
      gameState.gamePhase === "flip-cards" &&
      gameState.flipRequestedTo !== bettersId &&
      bettersId === userId
    ) {
      return true;
    } else {
      return false;
    }
  }

  function handleRequestFlip() {}

  // this use effect should be put up in its the game components, but
  // was placed here to make sure gameState is available to it.
  // fix this later...
  useEffect(() => {
    if (gameState.gamePhase === "flip-cards" && gameState.flipRequestedTo) {
      setShowFlipModal(true);
    } else {
      setShowFlipModal(false);
    }
  }, [gameState.gamePhase]);

  return (
    <div className="bg-light p-2">
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
        return (
          <div
            key={player.playerId}
            className={
              player.isPlayerTurn
                ? `d-flex flex-row justify-content-between py-3 my-1 rounded bg-info shadow ${
                    flipRequestActivated() && `border border-primary border-3`
                  }`
                : `d-flex flex-row justify-content-between py-3 my-1 rounded bg-light shadow ${
                    flipRequestActivated() && `border border-primary border-3`
                  }`
            }
            onClick={
              flipRequestActivated()
                ? () => handleRequestFlip(player.playerId)
                : null
            }
          >
            <TableHand player={player} userId={userId} />
            <CardsOnTable cards={player.cardsInPlay} />
          </div>
        );
      })}
    </div>
  );
}

export default Gameboard;
