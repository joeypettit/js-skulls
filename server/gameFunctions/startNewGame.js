const prepNewRound = require("./prepNewRound");

// this function will prepare the gamestate for the start of a new game.
function startNewGame(gameState) {
  // set readyToPlay and inProgress to true
  gameState.readyToPlay = true;
  gameState.inProgress = true;

  // prep for new round
  prepNewRound(gameState);

  // assign a random player to be the first dealer
  const firstToPlayIndex = Math.floor(Math.random() * gameState.players.length);
  gameState.playerTurnIndex = firstToPlayIndex;
  gameState.players[firstToPlayIndex].isPlayerTurn = true;
  gameState.firstToPlayIndex = firstToPlayIndex;
}

module.exports = startNewGame;
