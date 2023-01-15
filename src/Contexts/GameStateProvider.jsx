import React, { useState, useContext, useEffect } from "react";
import { useSocket } from "./SocketProvider";

const GameStateContext = React.createContext();

export function useGameState() {
  return useContext(GameStateContext);
}

export function GameStateProvider({ id, children }) {
  const socket = useSocket();

  function updateGameState() {
    // update game state
  }

  // set up listeners for gamestate updates
  useEffect(() => {
    // if we do not have a socket, do nothing
    if (socket == null) return;
    // create recieve message socket event listener
    // when message recieve pass arguments to addMessageToConversation
    socket.on("update-gamestate", updateGameState);

    // clean up: remove event listener when
    return () => {
      socket.off("update-gamestate");
    };
  }, [socket, addMessageToConversation]);

  const gameState = {};
  return (
    <GameStateContext.Provider value={gameState}>
      {children}
    </GameStateContext.Provider>
  );
}
