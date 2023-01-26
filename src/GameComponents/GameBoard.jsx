import TableHand from "./TableHand";
import CardsOnTable from "./CardsOnTable";

function Gameboard({ gameState, userId }) {
  // get player object of the player whose turn it is
  let whoseTurn = gameState.players[gameState.playerTurnIndex];

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
                ? "d-flex flex-row justify-content-between py-3 my-1 rounded bg-primary"
                : "d-flex flex-row justify-content-between py-3 my-1 rounded bg-secondary"
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
