// this function will move a player card from the players hand and lay
// it on the table (unrevealed). It accepts a gameState object and a
// cardId (card to be played) as its argument.

function playCard(gameState, cardId) {
  // player who is playing the card
  const thisPlayer = gameState.players[gameState.playerTurnIndex];

  // find index of card to play in cardsInHand array
  const cardToPlayIndex = thisPlayer.cardsInHand.findIndex((card) => {
    return card.cardId === cardId;
  });

  // splice from cardsInHand
  const cardToPlay = thisPlayer.cardsInHand.splice(cardToPlayIndex, 1);

  // add to beginning of cardsInPlay array
  thisPlayer.cardsInPlay.unshift(cardToPlay[0]);
}

module.exports = playCard;
