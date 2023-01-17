import React, { useState, useContext, useEffect, useCallback } from "react";
import { useSocket } from "./SocketProvider";

const GameStateContext = React.createContext();

export function useGameState() {
  return useContext(GameStateContext);
}

export function GameStateProvider({ children, gameId, setGameId }) {
  const socket = useSocket();
  const [gameState, setGameState] = useState(null);

  function startNewGame() {
    // request new game from server
  }

  // this function will...
  // - create new socket.io room with gameId, add player
  // - create create a new game state with game creators playerId
  // -
  function requestNewGameState(userId, newGameId, playerName) {
    // create new game room
    socket.emit("create-gamestate", { gameId: newGameId, playerName });
  }

  function requestAddPlayerToGame(gameId, playerName) {
    socket.emit("add-player", { gameId, playerName });
  }

  function toggleReorderPlayers(gameToToggle) {
    socket.emit("toggle-reorder-players", gameToToggle);
  }

  // this function accepts the order index number of the
  // user and places them accordingly in the gameState obj
  function assignPlayerOrderNumber(orderIndex) {
    socket.emit("assign-order-number", orderIndex);
  }

  // update gameState in state
  const updateGameState = useCallback(
    (newGameState) => {
      console.log("in callback");
      if (newGameState.gameId !== gameId) {
        setGameId(newGameState.gameId);
      }
      setGameState(newGameState);
    },
    [setGameId, setGameState, gameId]
  );

  // set up listeners for gamestate updates
  useEffect(() => {
    // if we do not have a socket, do nothing
    if (socket == null) return;
    // create 'update gamestate' socket event listener
    // when update recieved, pass arguments to updateGameState
    socket.on("update-gamestate", (newGameState) =>
      updateGameState(newGameState)
    );

    // clean up: remove event listener when client navigates away from page
    return () => {
      socket.off("update-gamestate");
    };
  }, [socket, updateGameState]);

  const value = {
    gameState,
    requestNewGameState,
    requestAddPlayerToGame,
    toggleReorderPlayers,
    assignPlayerOrderNumber,
    startNewGame,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}
