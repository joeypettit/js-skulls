import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ReorderPlayers from "./ReorderPlayers";
import { useGameState } from "../Contexts/GameStateProvider";

function AddPlayersPage({ gameId, userId, gameState }) {
  const { toggleReorderPlayers, startNewGame } = useGameState();

  function initiatePlayerReorder() {
    console.log("initiatePlayerReorder");
    toggleReorderPlayers(gameState.gameId);
  }

  function handleReadyToPlay() {
    console.log("ready to play");
    startNewGame();
  }

  return (
    <Container>
      <h1>Welcome </h1>
      <h1>Your Game Id is: {gameId}</h1>
      {userId === gameState.players[0].playerId ? (
        <h1>You are the game owner</h1>
      ) : (
        <h1>{gameState.players[0].name} is the game owner</h1>
      )}
      <p>
        Ask other players navigate to URL and Enter Game using the Game Id
        above.
      </p>
      {!gameState.playersReordering &&
        userId === gameState.players[0].playerId && (
          <Button onClick={initiatePlayerReorder}>Re-order Players</Button>
        )}
      {gameState.playersReordering &&
        userId === gameState.players[0].playerId && (
          <Button onClick={initiatePlayerReorder}>Cancel ReOrder</Button>
        )}
      <ReorderPlayers gameState={gameState} userId={userId} />
      <p>Order Of Play:</p>
      <ul>
        {gameState.players.map((player, index) => {
          return <li key={index}>{index + 1 + ": " + player.name}</li>;
        })}
      </ul>

      {userId === gameState.players[0].playerId ? (
        <div>
          <div>When the group is ready, press "Ready"</div>
          <Button
            disabled={gameState.playersReordering ? true : false}
            onClick={() => handleReadyToPlay()}
          >
            Ready
          </Button>
        </div>
      ) : (
        <div>
          When the group is ready, {gameState.players[0].name} will press
          "Ready"
        </div>
      )}
    </Container>
  );
}

export default AddPlayersPage;
