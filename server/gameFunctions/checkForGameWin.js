const getPlayerObject = require("./getPlayerObject");

function checkForGameWin(gameState) {
  const possibleWinner = getPlayerObject(
    gameState,
    gameState.latestBet.highestBetter.playerId
  );

  if (possibleWinner.points >= 2) {
    gameState.gamePhase = "game-over";
    gameState.gameWinner = {
      playerId: possibleWinner.playerId,
      name: possibleWinner.name,
    };
  }
}

module.exports = checkForGameWin;
