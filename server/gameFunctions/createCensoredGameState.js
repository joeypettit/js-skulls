// this function takes a playerId and a gamestate as arguements
// it then constructs a new game state with the information
// about other players censored.

function createCensoredGameState(playerId, fullGameState) {
  // edit players array to exclude all sensitive info about other players
  // exclude allCards, cardsInHand, and the 'isSkull' attribute of any
  // cardsInPlay where 'isRevealed' is false.
  const newPlayersArray = [];
  for (let player of fullGameState.players) {
    // if playerId matches playerId in object, push to array
    if (player.playerId === playerId) {
      newPlayersArray.push(player);
    } else {
      // function accepts a player "hand" object
      // (such as allCards, cardsInHand, or cardsInPlay),
      // and censors them
      const censorHand = (hand) => {
        const newHand = [];
        for (let card of hand) {
          const newCard = { ...card };
          if (newCard.isRevealed === false) {
            newCard.isSkull = "hidden";
          }
          newHand.push(newCard);
        }
        return newHand;
      };
      // create
      const censoredPlayerObject = {
        ...player,
        allCards: censorHand(player.allCards),
        cardsInHand: censorHand(player.cardsInHand),
        cardsInPlay: censorHand(player.cardsInPlay),
      };
      newPlayersArray.push(censoredPlayerObject);
    }
  }

  // create shallow copy of gamestate, insert editted players array
  const censoredGameState = {
    ...fullGameState,
    players: newPlayersArray,
  };

  return censoredGameState;
}

module.exports = createCensoredGameState;
