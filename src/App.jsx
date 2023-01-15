import React, { useState } from "react";
import "./App.css";
import PlayerHand from "./Player/PlayerHand";
import GameBoard from "./Gameboard/GameBoard";
import Header from "./Header/Header";
import LoginPage from "./Login/LoginPage";
import AddPlayersPage from "./Login/AddPlayersPage";
import useLocalStorage from "./hooks/useLocalStorage";
import Container from "react-bootstrap/Container";
import { SocketProvider } from "./Contexts/SocketProvider";
import { GameStateProvider, useGameState } from "./Contexts/GameStateProvider";

function App() {
  const [gameId, setGameId] = useState();
  const [userId, setUserId] = useLocalStorage("userId", null);
  const { gameState } = useGameState();
  console.log(userId);
  return (
    <>
      <SocketProvider userId={userId} gameId={gameId}>
        <GameStateProvider>
          <Header gameId={gameId} userId={userId} />
          {gameId && userId && gameState ? (
            <Container>
              <PlayerHand userId={userId} />
              <GameBoard />
            </Container>
          ) : (
            <Container>
              <LoginPage
                setGameId={setGameId}
                setUserId={setUserId}
                userId={userId}
              />
              <AddPlayersPage />
            </Container>
          )}
        </GameStateProvider>
      </SocketProvider>
    </>
  );
}

export default App;

// TODO:
// -create function to start new game and connect to client
