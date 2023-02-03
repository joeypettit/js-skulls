const getPlayerObject = require("./getPlayerObject");

// this function checks the cardsInPlay hand for cards
// where isSkulls is true AND isRevealed is also true.
// advance gamePhase accordingly

function checkForSkullOrRose(gameState, userId) {
  const thisPlayer = getPlayerObject(gameState, userId);

  let revealedSkullFound = false;

  for (let card of thisPlayer.cardsInPlay) {
    if (card.isRevealed && card.isSkull) {
      revealedSkullFound = true;
      const modifiedPlayerObj = {
        playerId: thisPlayer.playerId,
        name: thisPlayer.name,
      };
      gameState.latestBet.revealedSkullWasFrom = thisPlayer;
      break;
    }
  }

  if (revealedSkullFound) {
    gameState.gamePhase = "better-lost";
  } else {
    gameState.latestBet.rosesNeeded = gameState.latestBet.rosesNeeded - 1;
  }
}

module.exports = checkForSkullOrRose;
