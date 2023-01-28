// this function takes a gameState and a userId and returns
// the index of that player in the players array.

function getPlayerIndex(gameState, userId) {
  const playerIndex = gameState.players.findIndex((player) => {
    return player.playerId === userId;
  });
  return playerIndex;
}

module.exports = getPlayerIndex;
