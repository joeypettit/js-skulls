// this function will begin a round of betting
// it will...
// -move gamephase to betting
// -set latest bet object

function initiateBetting(gameState, userId, numOfCards) {
  let thisPlayerObject = getPlayerObject();

  gameState.latestBet = {
    numOfCards,
    highestBetter: {
      playerId: thisPlayerObject.playerId,
      name: thisPlayerObject.name,
    },
  };

  // if player bets highest possible number of cards,
  // skip gamePhase to "flip-cards"
  // else: move to "Raise or Pass" gamePhase
  if (gameState.latestBet.numOfCards === totalCardsPlayed()) {
    gameState.gamePhase = "flip-cards";
  } else {
    gameState.gamePhase = "Raise or Pass";
  }

  function totalCardsPlayed() {
    let cardCounter = 0;
    for (let player of gameState.players) {
      cardCounter += player.cardsInPlay.length;
    }
    return cardCounter;
  }

  function getPlayerObject() {
    const playerObj = gameState.players.find((player) => {
      return player.playerId === userId;
    });
    return playerObj;
  }
}

module.exports = initiateBetting;
