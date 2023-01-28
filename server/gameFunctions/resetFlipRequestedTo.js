const getPlayerObject = require("./getPlayerObject");

// this function will reset the flipRequestedTo key to null after each flip so
// the highest better can select a request a new flip.
// if the flipper is the highest better, they must reveal all their cards before
// the flipRequestedTo will be reset.

function resetFlipRequestedTo(gameState, userId) {
  const bettersId = gameState.latestBet.highestBetter.playerId;

  // array of playerIds of players that still have unrevealed cards in play
  const playersWithUnrevealed = [];

  for (let player of gameState.players) {
    for (let card of player.cardsInPlay) {
      if (!card.isRevealed) {
        playersWithUnrevealed.push(player.playerId);
        break;
      }
    }
  }

  console.log("playersWithUnrevealed", playersWithUnrevealed);

  if (bettersId === userId) {
    // better must flip all cards before selecting other player for flip
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
  } else if (
    playersWithUnrevealed.length === 1 &&
    playersWithUnrevealed[0] === userId
  ) {
    gameState.flipRequestedTo = playersWithUnrevealed[0];
  } else {
    gameState.flipRequestedTo = null;
  }
}

module.exports = resetFlipRequestedTo;
