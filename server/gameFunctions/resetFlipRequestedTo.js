const getPlayerObject = require("./getPlayerObject");

// this function will reset the flipRequestedTo key to null after each flip so
// the highest better can select a request a new flip.
// if the flipper is the highest better, they must reveal all their cards before
// the flipRequestedTo will be reset.

function resetFlipRequestedTo(gameState, userId) {
  const bettersId = gameState.latestBet.highestBetter.playerId;

  if (bettersId === userId) {
    const bettersObj = getPlayerObject(gameState, bettersId);
    const bettersUnrevealedCards = bettersObj.cardsInPlay.filter((card) => {
      return !card.isRevealed;
    });
    console.log("better unrevealed", bettersUnrevealedCards);
    if (bettersUnrevealedCards.length > 0) {
      gameState.flipRequestedTo = bettersId;
    } else {
      gameState.flipRequestedTo = null;
    }
  } else {
    gameState.flipRequestedTo = null;
  }
}

module.exports = resetFlipRequestedTo;
