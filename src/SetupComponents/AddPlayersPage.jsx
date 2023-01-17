import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ReorderPlayers from "./ReorderPlayers";
import { useGameState } from "../Contexts/GameStateProvider";

function AddPlayersPage({ gameId, userId, gameState }) {
  const { toggleReorderPlayers } = useGameState();

  return (
    <Container>
      <h1>Your Game Id is: {gameId}</h1>
      <p>Navigate to URL and Enter Existing Game Using the Game Id</p>
      <p>When All Players Are In, Press Ready</p>
      <p>Players:</p>
      {gameState.playersReordering ? (
        <Button onClick={() => toggleReorderPlayers(gameState.gameId)}>
          Finish Re-Order
        </Button>
      ) : (
        <Button onClick={() => toggleReorderPlayers(gameState.gameId)}>
          Re-order Players
        </Button>
      )}
      <ReorderPlayers gameState={gameState} userId={userId} />
      <ul>
        {gameState.players.map((player, index) => {
          return <li key={index}>{index + 1 + ": " + player.name}</li>;
        })}
      </ul>
      <Button>Ready</Button>
    </Container>
  );
}

export default AddPlayersPage;
