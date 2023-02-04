const getPlayerIndex = require("./getPlayerIndex");

function resetGameStateForNewRound(gameState) {
  let newFirstToPlayIndex = getPlayerIndex(
    gameState,
    gameState.nextToStart.playerId
  );

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
  gameState.players = createNewPlayersArray();
  gameState.betterWasEliminated = false;
  gameState.nextToStart = null;

  function createNewPlayersArray() {
    const newArray = [];
    for (let player of gameState.players) {
      newPlayerObj = {
        ...player,
        isPlayerTurn:
          gameState.nextToStart.playerId === player.playerId ? true : false,
        cardsInHand: [],
        cardsInPlay: [],
      };
      newArray.push(newPlayerObj);
    }
    return newArray;
  }
}
module.exports = resetGameStateForNewRound;
