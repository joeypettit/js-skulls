const getPlayerObject = require("./getPlayerObject");
const getPlayerIndex = require("./getPlayerIndex");

function checkForElimination(gameState) {
  const betterId = gameState.latestBet.highestBetter.playerId;
  const betterIndex = getPlayerIndex(gameState, betterId);
  const betterObj = getPlayerObject(gameState, betterId);

  if (betterObj.allCards.length <= 0) {
    const eliminatedPlayerObj = gameState.players.splice(betterIndex, 1)[0];
    gameState.eliminatedPlayers.push(eliminatedPlayerObj);
    gameState.betterWasEliminated = true;
  }
}

module.exports = checkForElimination;
