const createNewPlayer = require("./createNewPlayer");
// this function will create a new blank game state
// it will...
// - add the gameId from client
// - add the playerId from client gameowner, set name to playerId by default
// -
// it will add the player who create the game
function createNewGameState(playerId, gameId, playerName) {
  const gameState = {
    gameId,
    playersReordering: false, // helper boolean for rendering player reorder
    reorderingAt: 0, // helpful for tracking reordering progression
    inProgress: false, // is active will be true when game is in play
    readyToPlay: false, // initates play, may be false on error/player disconnecting, etc.
    gamePhase: ["laying", "betting", "flipping", "scoring"], // ,laying, betting, flipping, scoring
    round: 0,
    latestBet: {
      numOfCards: null, // number of cards currently being bet
      highestBetter: null, // player with highest bet
    },
    playerTurnIndex: 0, // index in players array => shows whos turn it is
    players: [createNewPlayer(playerId, playerName, true)], // all players, they will be in the order of play
  };
  return gameState;
}

module.exports = createNewGameState;
