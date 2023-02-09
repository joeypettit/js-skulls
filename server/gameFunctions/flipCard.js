const getPlayerObject = require("./getPlayerObject");

function flipCard(gameState, userId) {
  const thisPlayer = getPlayerObject(gameState, userId);

  const nextUnrevealedCard = thisPlayer.cardsInPlay.find((card) => {
    return !card.isRevealed;
  });

  if (nextUnrevealedCard) {
    nextUnrevealedCard.isRevealed = true;
  }

  if (nextUnrevealedCard.isSkull === false) {
    gameState.latestBet.rosesNeeded -= 1;
  }
}

module.exports = flipCard;
