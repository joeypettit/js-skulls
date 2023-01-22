const prepNewRound = require("./prepNewRound");

// this function will prepare the gamestate for the start of a new game.
function startNewGame(gameState) {
  // set readyToPlay and inProgress to true
  gameState.readyToPlay = true;
  gameState.inProgress = true;

  // assign a random player to be the first dealer
  const startingPlayerIndex = Math.floor(
    Math.random() * gameState.players.length
  );
  gameState.playerTurnIndex = startingPlayerIndex;
  gameState.startingPlayerIndex = startingPlayerIndex;
  gameState.players[startingPlayerIndex].isPlayerTurn = true;

  // prep for new round
  prepNewRound(gameState);
}

module.exports = startNewGame;
