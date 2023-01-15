// this function takes a player id and the full game's state,
// pulls out, and returns the state of the player with the matching id
function getPlayerState(playerId, gameState){
    const allPlayers = gameState.players;
    let thisPlayerState;
    for(let player of allPlayers){
        if(Number(player.playerId) === Number(playerId)){
            thisPlayerState = player;
        }
    }
    return thisPlayerState;
}

module.exports = getPlayerState;