import React from "react";
import Container from "react-bootstrap/Container";
import PlayerHand from "./PlayerHand";
import { useGameState } from "../Contexts/GameStateProvider";

function GameComponents({ gameId, userId }) {
  const { gameState } = useGameState();

  return (
    <>
      <Container>
        {gameState && gameState.readyToPlay && gameState.inProgress && (
          <PlayerHand gameState={gameState} userId={userId} />
        )}
      </Container>
    </>
  );
}

export default GameComponents;
