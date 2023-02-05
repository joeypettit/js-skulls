const prepPlayerHands = require("./prepPlayerHands");

// this function will prepare the gamestate for the start of a new game.
function startNewGame(gameState) {
  // set readyToPlay and inProgress to true
  gameState.readyToPlay = true;
  gameState.inProgress = true;

  // prep for new round
  prepPlayerHands(gameState);

  // assign a random player to be the first dealer
  const firstToPlayIndex = Math.floor(Math.random() * gameState.players.length);
  gameState.playerTurnIndex = firstToPlayIndex;
  gameState.players[firstToPlayIndex].isPlayerTurn = true;
  gameState.firstToPlayIndex = firstToPlayIndex;
  gameState.gamePhase = "set-round";
}

module.exports = startNewGame;
