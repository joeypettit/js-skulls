import React from "react";
import { GameStateProvider } from "./GameStateProvider";
import { SocketProvider } from "./SocketProvider";
import useLocalStorage from "../hooks/useLocalStorage";

function AllProviders({ children }) {
  return (
    <SocketProvider userId={userId} gameId={gameId}>
      <GameStateProvider>{children}</GameStateProvider>
    </SocketProvider>
  );
}

export default AllProviders;
