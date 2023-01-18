import React from "react";
import PlayerHand from "./PlayerHand";
import { useGameState } from "../Contexts/GameStateProvider";

function GameComponents({ gameId, userId }) {
  const { gameState } = useGameState();

  return (
    <>
      <PlayerHand />
    </>
  );
}

export default GameComponents;
