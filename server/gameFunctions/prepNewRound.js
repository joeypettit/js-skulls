function prepNewRound(gameState) {
  // copy allCards of each player into their cardsInHand, add isRevealed key.
  for (let player of gameState.players) {
    player.allCards.map((card) => {
      const cardForHand = { ...card, isRevealed: false };
      player.cardsInHand.push(cardForHand);
    });
    // shuffle player hand so that the card locations
    // is different each round (to avoid guessing based on
    // button presses)
    player.cardsInHand.sort((a, b) => 0.5 - Math.random());
  }

  // set gamePhase to Set Round
  gameState.gamePhase = "Set Round";
}

module.exports = prepNewRound;