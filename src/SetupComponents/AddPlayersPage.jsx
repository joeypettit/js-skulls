import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ReorderPlayers from "./ReorderPlayers";
import { useGameState } from "../Contexts/GameStateProvider";

function AddPlayersPage({ gameId, userId, gameState }) {
  const { toggleReorderPlayers } = useGameState();

  function initiatePlayerReorder() {
    console.log("initiatePlayerReorder");
    toggleReorderPlayers(gameState.gameId);
  }

  return (
    <Container>
      <h1>Your Game Id is: {gameId}</h1>
      <p>Navigate to URL and Enter Existing Game Using the Game Id</p>
      <p>When All Players Are In, Press Ready</p>
      <p>Players:</p>
      {!gameState.playersReordering &&
        userId === gameState.players[0].playerId && (
          <Button onClick={initiatePlayerReorder}>Re-order Players</Button>
        )}
      {gameState.playersReordering &&
        userId === gameState.players[0].playerId && (
          <Button onClick={initiatePlayerReorder}>Cancel ReOrder</Button>
        )}
      <ReorderPlayers gameState={gameState} userId={userId} />
      <ul>
        {gameState.players.map((player, index) => {
          return <li key={index}>{index + 1 + ": " + player.name}</li>;
        })}
      </ul>
      <Button disabled={gameState.playersReordering ? true : false}>
        Ready
      </Button>
    </Container>
  );
}

export default AddPlayersPage;
