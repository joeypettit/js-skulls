import React from "react";
import { useGameState } from "../Contexts/GameStateProvider";

function GameComponents({ gameId, userId }) {
  const { gameState } = useGameState();

  return <>{gameState.inProgress ? <div>Game Components Here</div> : null}</>;
}

export default GameComponents;
