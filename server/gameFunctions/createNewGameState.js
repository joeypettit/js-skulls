// this function will create a new blank game state
// it will...
// - add the gameId from client
// - add the playerId from client, set name to playerId by default
// -
// it will add the player who create the game
function createNewGameState(playerId, gameId) {
  const gameState = {
    gameId,
    inProgress: false, // is active will be true when game is in play
    gameStage: ["laying", "betting", "flipping", "scoring"], // ,laying, betting, flipping, scoring
    playerOrder: [playerId], // order of play, playerIds, first player in array is the dealer for the round
    round: 0,
    latestBet: {
      numOfCards: null, // number of cards currently being bet
      highestBetter: null, // player with highest bet
    },
    players: [
      {
        name: playerId, // by default this will be playerId
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
        isOwner: true, // if this player created the game, they are the owner
      },
    ],
  };
  return gameState;
}

module.exports = createNewGameState;
