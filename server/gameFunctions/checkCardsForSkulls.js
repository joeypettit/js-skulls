const getPlayerObject = require("./getPlayerObject");

// this function checks the cardsInPlay hand for cards
// where isSkulls is true AND isRevealed is also true.
// advance gamePhase accordingly

function checkCardsForSkulls(gameState, userId) {
  const thisPlayer = getPlayerObject(gameState, userId);

  let revealedSkullFound = false;

  for (let card of thisPlayer.cardsInPlay) {
    if (card.isRevealed && card.isSkull) {
      revealedSkullFound = true;
    }
  }

  console.log("skulls?", revealedSkullFound);

  if (revealedSkullFound) {
    gameState.gamePhase = "better-lost";
  }
}

module.exports = checkCardsForSkulls;
