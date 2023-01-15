// this function will...
// 1) copy cards from fullHand to cardsInHand for each player
// 2) determine player that begins next round, set whose turn and isPlayersTurn accordingly
// 3) change game stage to 'laying'
// 4) change latestBet object keys to null values
// 5) change isBetting of all player to false


// it takes the game state as an argument
function newRound(gameState) {
  // 1) copy cards from fullHand to cardsInHand for each player  
  for (let player of gameState.players) {
    player.cardsInHand = [...player.allCards];
  }

  // 2) determine player that deals this new round, set playerOrder and isPlayersTurn accordingly
  // when new game begins, round is set to 0
  // if round is greater than 0, take first person in playerOrder 
  // array (the previous dealer) and move them to back of array
  if (gameState.round > 0) {
    const lastStarter = gameState.playerOrder.shift();
    gameState.playerOrder.push(lastStarter);
  }
  for(let player of gameState.players){
    if(player.name === gameState.playerOrder[0]){
        player.isPlayersTurn = true;
    } else {
        player.isPlayersTurn = false;
    }
  }

  // 3) change game stage to 'laying'
  gameState.gameStage = 'laying';

  // 4) changes latestBet object keys to null values
  gameState.latestBet.numOfCards = null;
  gameState.latestBet.highestBetter = null;

  // 5) change isBetting of all players to false
  for(let player of gameState.players){
    player.isBetting = false;
  }



}

module.exports = newRound;
