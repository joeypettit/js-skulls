import React from "react";
import { useGameState } from "../Contexts/GameStateProvider";

function GameComponents({ gameId, userId }) {
  const { gameState } = useGameState();

  return (
    <>
      <div>Game Components Here</div>
    </>
  );
}

export default GameComponents;
