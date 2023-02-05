const getPlayerIndex = require("./getPlayerIndex");
const prepPlayerHands = require("./prepPlayerHands");

function resetGameStateForNewRound(gameState) {
  let newFirstToPlayIndex = getPlayerIndex(
    gameState,
    gameState.nextToStart.playerId
  );

  prepPlayerHands(gameState);

  gameState.gamePhase = "set-round";
  gameState.round = gameState.round + 1;
  gameState.firstToPlayIndex = newFirstToPlayIndex;
  gameState.latestBet = {
    numOfCards: null,
    highestBetter: { playerId: null, name: null },
    rosesNeeded: 0,
    revealedSkullWasFrom: null,
  };
  gameState.flipRequestedTo = null;
  gameState.playerTurnIndex = newFirstToPlayIndex;
  gameState.betterWasEliminated = false;
  gameState.nextToStart = null;
}
module.exports = resetGameStateForNewRound;
