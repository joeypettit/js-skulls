function createNewPlayer(playerId, playerName, isGameOwner) {
  // randomize card ids order to avoid other players guessing
  // card based on id in the console
  const cardIds = [1, 2, 3, 4];
  cardIds.sort((a, b) => 0.5 - Math.random());

  // add new player to gamestate
  const newPlayerObj = {
    name: playerName, // by default this will be playerId
    isPlayerTurn: false,
    playerId, // function will update this to playerId
    isConnected: true,
    allCards: [
      // give player default card hand
      {
        cardId: cardIds[0],
        isSkull: false,
      },
      {
        cardId: cardIds[1],
        isSkull: true,
      },
      {
        cardId: cardIds[2],
        isSkull: false,
      },
      {
        cardId: cardIds[3],
        isSkull: false,
      },
    ],
    cardsInHand: [], // subset of allCards
    cardsInPlay: [], // subset of allCards
    hasFolded: false, // is this player participating in this round of betting => true/false
    points: 0, // number of points (rounds) this player has won
    isOwner: isGameOwner, // if this player created the game, they are the owner
  };
  return newPlayerObj;
}

module.exports = createNewPlayer;
