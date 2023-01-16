import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ReorderPlayers from "./ReorderPlayers";

function AddPlayersPage({ gameId, gameState }) {
  const [playersReordering, setPlayersReordering] = useState(false);

  return (
    <Container>
      <h1>Your Game Id is: {gameId}</h1>
      <p>Navigate to URL and Enter Existing Game Using the Game Id</p>
      <p>When All Players Are In, Press Ready</p>
      <p>Players:</p>
      {playersReordering ? (
        <Button onClick={() => setPlayersReordering(false)}>
          Finish Re-Order
        </Button>
      ) : (
        <Button onClick={() => setPlayersReordering(true)}>
          Re-order Players
        </Button>
      )}
      <ReorderPlayers
        gameState={gameState}
        playersReordering={playersReordering}
      />
      <ul>
        {gameState.players.map((player, index) => {
          return <li key={index}>{player.name}</li>;
        })}
      </ul>
      <Button>Ready</Button>
    </Container>
  );
}

export default AddPlayersPage;
