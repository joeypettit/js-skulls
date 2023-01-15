// this function will create a gameState object based on the number of players
function newGame() {
  const gameState = {
    gameId: 0,
    gameStage: "laying", // , laying, betting, flipping, scoring
    playerOrder: ["Joey", "David", "Kath"], // order of play, first player in array is the dealer for the round
    round: 0,
    latestBet: {
      numOfCards: null, // number of cards currently being bet
      highestBetter: null, // player with highest bet
    },
    players: [
      {
        name: "Joey",
        isPlayersTurn: false,
        playerId: 1,
        allCards: [{
            isSkull: true,
            isRevealed: false
        }, {
            isSkull: false,
            isRevealed: false
        },{
            isSkull: false,
            isRevealed: false
        },{
            isSkull: false,
            isRevealed: false
        }],
        cardsInHand: [],    // cards that are in the players hand as play progresses
        cardsInPlay: [],    // cards currently laid down and in play
        isBetting: false,   // is this player participating in this round of betting => true/false
        points: 0,          // number of points (rounds) this player has won
        isOwner: true       // if this player created the game, they are the owner
      },
      {
        name: "Kath",
        isPlayersTurn: false,
        playerId: 2,
        allCards: [{
            isSkull: false,
            isRevealed: false
        }, {
            isSkull: true,
            isRevealed: false
        },{
            isSkull: false,
            isRevealed: false
        },{
            isSkull: false,
            isRevealed: false
        }],
        cardsInHand: [],    // cards that are in the players hand as play progresses
        cardsInPlay: [],    // cards currently laid down and in play
        isBetting: false,   // is this player participating in this round of betting => true/false
        points: 0,          // number of points (rounds) this player has won
        isOwner: true       // if this player created the game, they are the owner
      },
      {
        name: "David",
        isPlayersTurn: false,
        playerId: 3,
        allCards: [{
            isSkull: false,
            isRevealed: false
        }, {
            isSkull: false,
            isRevealed: false
        },{
            isSkull: false,
            isRevealed: false
        },{
            isSkull: true,
            isRevealed: false
        }],
        cardsInHand: [],    // cards that are in the players hand as play progresses
        cardsInPlay: [],    // cards currently laid down and in play
        isBetting: false,   // is this player participating in this round of betting => true/false
        points: 0,          // number of points (rounds) this player has won
        isOwner: true       // if this player created the game, they are the owner
      },
    ],
  };

  // each player will have a hand with four cards (isSkull? => false, false, false, true)
//   for (let i = 0; i < numOfPlayers; i++) {
//     gameState.hands.push([false, false, false, true]);
//   }

  return gameState;
}

module.exports = newGame;
