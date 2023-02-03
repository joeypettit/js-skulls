function setNewRound(gameState, userId) {
  const newGameState = {
    ...gameState,
    gamePhase: "set-round",
    round: gameState.round + 1,
    firstToPlayIndex: gameState,
  };
}

module.exports = setNewRound;
