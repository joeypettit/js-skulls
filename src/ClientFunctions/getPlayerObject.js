// this function takes a gameState and a userId and returns
// the object of the player with the matching playerId

function getPlayerObject(gameState, userId) {
  let playerObj = gameState.players.find((player) => {
    return player.playerId === userId;
  });

  if (playerObj) {
    return playerObj;
  } else {
    playerObj = gameState.eliminatedPlayers.find((player) => {
      return player.playerId === userId;
    });
    return playerObj;
  }
}

module.exports = getPlayerObject;
