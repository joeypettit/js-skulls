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
  // skip gamePhase to "Flip Cards"
  // else: move to "Raise or Pass" gamePhase
  if (gameState.latestBet.numOfCards === totalCardsPlayed()) {
    gameState.gamePhase = "Flip Cards";
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
    console.log("user id is", userId);
    const playerObj = gameState.players.find((player) => {
      return player.playerId === userId;
    });
    console.log("playerObj is", playerObj);
    return playerObj;
  }
}

module.exports = initiateBetting;
