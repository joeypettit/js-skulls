import UnrevealedCardDeck from "./UnrevealedHand";
import CardsOnTable from "./CardsOnTable";

function Gameboard({ gameState, userId }) {
  return (
    <div className="bg-warning p-2">
      {gameState.players.map((player) => {
        return (
          <div className="d-flex flex-row justify-content-between py-3 my-1 bg-secondary rounded">
            <UnrevealedCardDeck gameState={gameState} player={player} />
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
