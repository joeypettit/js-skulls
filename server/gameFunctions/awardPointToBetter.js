const getPlayerObject = require("./getPlayerObject");

function awardPointToBetter(gameState) {
  const pointRecipient = getPlayerObject(
    gameState,
    gameState.latestBet.highestBetter.playerId
  );

  pointRecipient.points = pointRecipient.points + 1;
}

module.exports = awardPointToBetter;
