const getPlayerObject = require("./getPlayerObject");

function foldHand(gameState, userId) {
  const playerToFold = getPlayerObject(gameState, userId);

  playerToFold.hasFolded = true;
}

module.exports = foldHand;
