// this function will handle all logic for passing the turn
// to the next player in the players array. It takes a gamestate,
// as its argument and returns an updatedGamestate.

function passTurnToNextPlayer(gameState) {
  // copy of value of gamestate.playerTurnIndex
  let lastPlayerTurnIndex = gameState.playerTurnIndex;
  // reference variable to gamestate.players
  let players = gameState.players;

  // if player is NOT the last player in the players array
  if (lastPlayerTurnIndex < players.length - 1) {
    // increment gameState's playerTurnIndex
    gameState.playerTurnIndex += 1;

    // else: player is the last in the players array
  } else {
    // set playerTurn index to beginning of players array
    gameState.playerTurnIndex = 0;
  }

  // make previous player isPlayerTurn false
  players[lastPlayerTurnIndex].isPlayerTurn = false;

  // make next player (now at gameState.playerTurnIndex) isPlayerTurn true
  players[gameState.playerTurnIndex].isPlayerTurn = true;
}

module.exports = passTurnToNextPlayer;
