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
    gamePhase: "Set Round", // Reordering, Set Round, Play or Bet, Raise or Pass, better-will-flip, request-flip, flip-card, scoring
    round: 0,
    firstToPlayIndex: 0, // the first player to play a card this round, will be index of player in players array
    latestBet: {
      numOfCards: null, // number of cards currently being bet
      highestBetter: { playerId: null, name: null }, // player with highest bet
      rosesNeeded: 0,
    },
    playerTurnIndex: 0, // index in players array => shows whos turn it is
    players: [createNewPlayer(playerId, playerName, true)], // all players, they will be in the order of play
  };
  return gameState;
}

module.exports = createNewGameState;
