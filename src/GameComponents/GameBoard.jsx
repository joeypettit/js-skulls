import GameBoardCard from "./GameBoardCard";

function Gameboard({ gameState, userId }) {
  return (
    <div className="gameboard">
      <h1>This is a Gameboard</h1>

      {gameState.players.map((player) => {
        return <div>{player.name}</div>;
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
