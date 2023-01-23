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
            <TableHand player={player} />
            <CardsOnTable cards={player.cardsInPlay} />
          </div>
        );
      })}

      {/* {Object.keys(gameState).length !== 0 &&
        gameState.players.map((player, index) => {
          return (
            <div key={index}>
              <h1>{player.name}</h1>
              <div>
                Full Hand:{" "}
                {player.allCards.map((card, index) => {
                  return <GameBoardCard key={index} card={card} />;
                })}
              </div>
            </div>
          );
        })} */}
    </div>
  );
}

export default Gameboard;
