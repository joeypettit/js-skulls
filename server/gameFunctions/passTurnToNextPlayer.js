// this function will handle all logic for passing the turn
// to the next player in the players array. It takes a gamestate,
// as its argument and returns an updatedGamestate.

function passTurnToNextPlayer(gameState) {
  // copy of value of gamestate.playerTurnIndex
  let prevPlayerTurnIndex = gameState.playerTurnIndex;

  // reference variable to gamestate.players
  let players = gameState.players;

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // if: we are in the 'Set Round', or 'Play or Bet' gamePhase,
  // turns gets passed normally following order in players array
  if (
    gameState.gamePhase === "Set Round" ||
    gameState.gamePhase === "Play or Bet"
  ) {
    if (prevPlayerTurnIndex < players.length - 1) {
      // if player is NOT the last player in the players array
      // increment gameState's playerTurnIndex
      gameState.playerTurnIndex += 1;

      // else: player is the last in the players array
    } else {
      // set playerTurn index to beginning of players array
      gameState.playerTurnIndex = 0;
    }

    // make previous player isPlayerTurn false
    players[prevPlayerTurnIndex].isPlayerTurn = false;

    // make next player (now at gameState.playerTurnIndex) isPlayerTurn true
    players[gameState.playerTurnIndex].isPlayerTurn = true;

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // else if: if gamePhase is in 'Raise or Pass', we must check each
    // each player following the previous player until we find one that
    // has not yet folded, while skipping the turns of those who have.
  } else if (gameState.gamePhase === "Raise or Pass") {
    let nextPlayerTurnIndex = findNextPlayerTurnIndex();

    while (nextPlayerTurnIndex !== prevPlayerTurnIndex) {
      // if: player has folded, their turn will be skipped until next round
      // increment index to next entry in players array
      if (players[nextPlayerTurnIndex].hasFolded === true) {
        // if: player is NOT the last player in the players array
        if (nextPlayerTurnIndex < players.length - 1) {
          // increment helper variable nextPlayerTurnIndex
          nextPlayerTurnIndex += 1;
          // else: player is the last in the players array
        } else {
          // set nextPlayerTurnIndex to beginning of players array
          nextPlayerTurnIndex = 0;
        }
      } else {
        // set gameState's playerTurnIndex
        gameState.playerTurnIndex = nextPlayerTurnIndex;

        // make previous player isPlayerTurn false
        players[prevPlayerTurnIndex].isPlayerTurn = false;

        // make next player (now at gameState.playerTurnIndex) isPlayerTurn true
        players[gameState.playerTurnIndex].isPlayerTurn = true;

        break;
      }
    }
  }

  function findNextPlayerTurnIndex() {
    // if: player is NOT the last player in the players array,
    if (prevPlayerTurnIndex < players.length - 1) {
      // add one to prevPlayerTurnIndex to find the next
      return prevPlayerTurnIndex + 1;

      // else: player is the last in the players array
    } else {
      // set playerTurn index to beginning of players array
      return 0;
    }
  }
}

module.exports = passTurnToNextPlayer;
