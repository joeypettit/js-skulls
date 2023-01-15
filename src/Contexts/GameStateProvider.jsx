import React, { useState, useContext, useEffect } from "react";

const GameStateContext = React.createContext();

export function useGameState() {
  return useContext(GameStateContext);
}

export function GameStateProvider({ id, children }) {
  const gameState = {};
  return (
    <GameStateContext.Provider value={gameState}>
      {children}
    </GameStateContext.Provider>
  );
}
