import React from "react";
import LoginPage from "./LoginPage";
import AddPlayersPage from "./AddPlayersPage";
import ReorderPlayers from "./ReorderPlayers";
import { useGameState } from "../Contexts/GameStateProvider";

function SetupComponents({ setGameId, setUserId, userId, gameId }) {
  const { gameState } = useGameState();
  console.log("game id, userid, gamestate", gameId, userId, gameState);

  return (
    <>
      {!gameId && (
        <LoginPage
          setGameId={setGameId}
          setUserId={setUserId}
          userId={userId}
        />
      )}
      {gameId && userId && gameState && (
        <AddPlayersPage gameId={gameId} gameState={gameState} />
      )}
    </>
  );
}

export default SetupComponents;
