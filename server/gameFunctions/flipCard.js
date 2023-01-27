const getPlayerObject = require("./getPlayerObject");

function flipCard(gameState, userId) {
  const thisPlayer = getPlayerObject(gameState, userId);

  const nextUnrevealedCard = thisPlayer.cardsInPlay.find((card) => {
    return !card.isRevealed;
  });

  nextUnrevealedCard.isRevealed = true;
}

module.exports = flipCard;
