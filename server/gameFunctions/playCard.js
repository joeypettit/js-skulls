// this function will move a player card from the players hand and lay
// it on the table (unrevealed). It accepts a gameState object and a
// cardId (card to be played) as its argument.

function playCard(gameState, cardId) {
  // player who is playing the card
  const thisPlayer = gameState.players[gameState.playerTurnIndex];
  console.log("inPlayCard, this player is", thisPlayer);
  console.log("gamestate", gameState);

  // set the played card => isInPlay === true
  thisPlayer.allCards.map((card) => {
    if (card.cardId === cardId) {
      card.isInPlay = true;
      card.isInHand = false;
    }
  });
}

module.exports = playCard;
