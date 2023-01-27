function checkForWin(gameState) {
  if (gameState.latestBet.rosesNeeded === 0) {
    gameState.gamePhase = "better-won";
  }
}

module.exports = checkForWin;
