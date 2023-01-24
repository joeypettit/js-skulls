const getPlayerObject = require("./getPlayerObject");

function raiseBet(gameState, userId, numOfCards) {
  let thisPlayerObject = getPlayerObject(gameState, userId);

  gameState.latestBet = {
    numOfCards,
    highestBetter: {
      playerId: thisPlayerObject.playerId,
      name: thisPlayerObject.name,
    },
  };
}

module.exports = raiseBet;
