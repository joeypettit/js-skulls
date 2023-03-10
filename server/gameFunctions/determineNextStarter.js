function determineNextStarter(gameState) {
  const randomIndex = Math.floor(Math.random() * gameState.players.length);

  if (gameState.betterWasEliminated === true) {
    if (
      gameState.latestBet.revealedSkullWasFrom.playerId ===
      gameState.latestBet.highestBetter.playerId
    ) {
      const randomPlayerObj = gameState.players[randomIndex];
      const modifiedPlayerObj = {
        playerId: randomPlayerObj.playerId,
        name: randomPlayerObj.name,
      };
      gameState.nextToStart = modifiedPlayerObj;
    } else {
      gameState.nextToStart = gameState.latestBet.revealedSkullWasFrom;
    }
  } else {
    // if better was not eliminated, they start next round
    gameState.nextToStart = gameState.latestBet.highestBetter;
  }
}

module.exports = determineNextStarter;
