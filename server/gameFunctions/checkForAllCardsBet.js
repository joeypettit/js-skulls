// this function will check to see if all cards have been bet.
// if there are no more cards availabe to bet on, gamePhase
// moves on to 'better-will-flip'

function checkForAllCardsBet(gameState, userId) {
  // count number of cards currently in play
  const numOfCardsInPlay = gameState.players
    .map((player) => {
      return player.cardsInPlay;
    })
    .flat().length;

  if (gameState.latestBet.numOfCards === numOfCardsInPlay) {
    gameState.gamePhase = "better-will-flip";
    gameState.players.map((player) => {
      if (player.playerId !== userId) player.hasFolded = true;
    });
  }
}

module.exports = checkForAllCardsBet;
