function prepPlayerHands(gameState) {
  // copy allCards of each player into their cardsInHand, add isRevealed key.
  for (let player of gameState.players) {
    // clear cardsInHand and cardsInPlay
    player.cardsInHand = [];
    player.cardsInPlay = [];

    player.allCards.map((card) => {
      const cardForHand = { ...card, isRevealed: false };
      player.cardsInHand.push(cardForHand);
    });
    // shuffle player hand so that the card locations
    // is different each round (to avoid guessing based on
    // button presses)
    player.cardsInHand.sort((a, b) => 0.5 - Math.random());

    // set values to default
    player.hasFolded = false;
    player.isPlayerTurn = false;

    if (
      gameState.nextToStart &&
      gameState.nextToStart.playerId === player.playerId
    ) {
      player.isPlayerTurn = true;
    }
  }
}

module.exports = prepPlayerHands;
