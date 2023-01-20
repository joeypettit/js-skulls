function createNewPlayer(playerId, playerName, isGameOwner) {
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
        isInHand: true,
        isInPlay: false,
      },
      {
        isSkull: false,
        isRevealed: false,
        isInHand: true,
        isInPlay: false,
      },
      {
        isSkull: false,
        isRevealed: false,
        isInHand: true,
        isInPlay: false,
      },
      {
        isSkull: false,
        isRevealed: false,
        isInHand: true,
        isInPlay: false,
      },
    ],
    isBetting: false, // is this player participating in this round of betting => true/false
    points: 0, // number of points (rounds) this player has won
    isOwner: isGameOwner, // if this player created the game, they are the owner
  };
  return newPlayerObj;
}

module.exports = createNewPlayer;
