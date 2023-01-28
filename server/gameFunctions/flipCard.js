const getPlayerObject = require("./getPlayerObject");

function flipCard(gameState, userId) {
  const thisPlayer = getPlayerObject(gameState, userId);

  const nextUnrevealedCard = thisPlayer.cardsInPlay.find((card) => {
    return !card.isRevealed;
  });

  if (nextUnrevealedCard) {
    nextUnrevealedCard.isRevealed = true;
  }
}

module.exports = flipCard;
