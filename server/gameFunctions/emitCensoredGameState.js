const createCensoredGameState = require("./createCensoredGameState");
// this function will take the global game state, and
// censor it for each individual player in the game,
// and emit the unique, censored game state for that player
// it takes a gamestate, and the io instance as its argument.

function emitCensoredGameStates(gameState, io) {
  // emit censored updated gamestate to all players
  for (let player of gameState.players) {
    // censor other players' card info
    const updatedGameState = createCensoredGameState(
      player.playerId,
      gameState
    );
    // send uniquely censored gamestate to each player
    io.in(player.playerId).emit("update-gamestate", updatedGameState);
  }

  for (let player of gameState.eliminatedPlayers) {
    // censor other players' card info
    const updatedGameState = createCensoredGameState(
      player.playerId,
      gameState
    );
    updatedGameState.thisUserNotEliminated = false;
    // send uniquely censored gamestate to each player
    io.in(player.playerId).emit("update-gamestate", updatedGameState);
  }
}

module.exports = emitCensoredGameStates;
