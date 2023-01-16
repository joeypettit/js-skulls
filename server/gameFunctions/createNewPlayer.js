function createNewPlayer(playerId, playerName) {
  // add new player to gamestate
  const newPlayerObj = {
    name: playerName, // by default this will be playerId
    isPlayersTurn: false,
    playerId, // function will update this to playerId
    isConnected: true,
    allCards: [
      // give player default card hand
      {
        isSkull: true,
        isRevealed: false,
      },
      {
        isSkull: false,
        isRevealed: false,
      },
      {
        isSkull: false,
        isRevealed: false,
      },
      {
        isSkull: false,
        isRevealed: false,
      },
    ],
    cardsInHand: [], // cards that are in the players hand as play progresses
    cardsInPlay: [], // cards currently laid down and in play
    isBetting: false, // is this player participating in this round of betting => true/false
    points: 0, // number of points (rounds) this player has won
    isOwner: false, // if this player created the game, they are the owner
  };
  return newPlayerObj;
}

module.exports = createNewPlayer;
