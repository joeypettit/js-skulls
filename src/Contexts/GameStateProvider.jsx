import React, { useState, useContext, useEffect } from "react";
import { useSocket } from "./SocketProvider";

const GameStateContext = React.createContext();

export function useGameState() {
  return useContext(GameStateContext);
}

export function GameStateProvider({ id, children }) {
  const socket = useSocket();
  const [gameState, setGameState] = useState(null);

  function startNewGame() {
    // request new game from server
  }

  // this function will...
  // - create new socket.io room with gameId, add player
  // - create create a new game state with game creators playerId
  // -
  function requestNewGameState(userId, newGameId) {
    // create new game room
    socket.emit("create-gamestate", { userId, gameId: newGameId });
  }

  function updatePlayerName() {
    console.log("okay");
  }

  function updateGameState(gameState) {
    console.log("in update gamestate", gameState);
    // update game state
    // setGameState();
  }

  // set up listeners for gamestate updates
  useEffect(() => {
    // if we do not have a socket, do nothing
    if (socket == null) return;
    // create 'update gamestate' socket event listener
    // when update recieved, pass arguments to updateGameState
    socket.on("update-gamestate", (socket) => console.log("got it"));

    // clean up: remove event listener when client navigates away from page
    return () => {
      socket.off("update-gamestate");
    };
  }, [socket, updateGameState]);

  const value = {
    gameState,
    requestNewGameState,
    startNewGame,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}
