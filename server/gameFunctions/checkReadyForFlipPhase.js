// this function checks how many players are still playing.
// If only one player remains, move game on to better-will-flip phase.

function checkReadyForFlipPhase(gameState) {
  const remainingPlayerCount = gameState.players.filter((player) => {
    return !player.hasFolded;
  }).length;

  if (gameState.gamePhase === "Raise or Pass" && remainingPlayerCount <= 1) {
    gameState.gamePhase = "better-will-flip";
  }
}

module.exports = checkReadyForFlipPhase;
