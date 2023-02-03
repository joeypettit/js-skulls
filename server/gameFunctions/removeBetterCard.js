const getPlayerObject = require("./getPlayerObject");

function removeBetterCard(gameState) {
  const betterId = gameState.latestBet.highestBetter.playerId;
  const betterObj = getPlayerObject(gameState, betterId);

  const betterCardCount = betterObj.allCards.length;
  const randomIndex = Math.floor(Math.random() * betterCardCount);
  console.log("randomNum is", randomIndex);

  betterObj.allCards.splice(randomIndex, 1);
}

module.exports = removeBetterCard;
