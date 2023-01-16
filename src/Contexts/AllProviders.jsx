import React from "react";
import { GameStateProvider } from "./GameStateProvider";
import { SocketProvider } from "./SocketProvider";
import useLocalStorage from "../hooks/useLocalStorage";

function AllProviders({ children, userId, setUserId, gameId, setGameId }) {
  return (
    <SocketProvider userId={userId} setUserId={setUserId} gameId={gameId}>
      <GameStateProvider gameId={gameId} setGameId={setGameId}>
        {children}
      </GameStateProvider>
    </SocketProvider>
  );
}

export default AllProviders;
