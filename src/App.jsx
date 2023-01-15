import React, { useState } from "react";
import "./App.css";
import PlayerHand from "./Player/PlayerHand";
import GameBoard from "./Gameboard/GameBoard";
import Header from "./Header/Header";
import LoginPage from "./Login/LoginPage";
import useLocalStorage from "./hooks/useLocalStorage";
import Container from "react-bootstrap/Container";
import { SocketProvider } from "./Contexts/SocketProvider";
import { GameStateProvider } from "./Contexts/GameStateProvider";

function App() {
  const [gameId, setGameId] = useState();
  const [userId, setUserId] = useLocalStorage("userId", null);
  console.log(userId);
  return (
    <>
      <Header gameId={gameId} userId={userId} />

      {gameId && userId ? (
        <SocketProvider userId={userId} gameId={gameId}>
          <GameStateProvider>
            <Container>
              <PlayerHand userId={userId} />
              <GameBoard />
            </Container>
          </GameStateProvider>
        </SocketProvider>
      ) : (
        <LoginPage
          setGameId={setGameId}
          setUserId={setUserId}
          userId={userId}
        />
      )}
    </>
  );
}

export default App;
