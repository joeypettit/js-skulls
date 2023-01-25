function checkReadyForPlayOrBetPhase(gameState) {
  // if gamePhase is 'Set Round' and playerTurnIndex === firstToPlayIndex,
  // move gamePhase to the next round ('Play or Bet')
  // this will be triggered once all players have laid one card down
  if (gameState.playerTurnIndex === gameState.firstToPlayIndex) {
    // move on to Play or Bet round
    gameState.gamePhase = "Play or Bet";
  }
}

module.exports = checkReadyForPlayOrBetPhase;
