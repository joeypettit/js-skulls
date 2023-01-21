import TableHand from "./TableHand";
import CardsOnTable from "./CardsOnTable";

function Gameboard({ gameState, userId }) {
  function findWhoseTurn() {
    let whoseTurn = gameState.players.find((player) => player.isPlayerTurn);
    whoseTurn = whoseTurn.name;
    return whoseTurn;
  }

  return (
    <div className="bg-warning p-2">
      <div className="text-center">It is {findWhoseTurn()}'s turn.</div>
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
            <TableHand gameState={gameState} player={player} />
            <CardsOnTable cards={player.allCards} />
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
