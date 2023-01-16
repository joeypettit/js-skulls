import React, { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import SetupComponents from "./SetupComponents/SetupComponents";
import GameComponents from "./GameComponents/GameComponents";
import useLocalStorage from "./hooks/useLocalStorage";
import AllProviders from "./Contexts/AllProviders";

function App() {
  const [gameId, setGameId] = useState();
  const [userId, setUserId] = useLocalStorage("userId", null);
  return (
    <>
      <Header gameId={gameId} userId={userId} />
      <AllProviders gameId={gameId} userId={userId} setUserId={setUserId}>
        <GameComponents gameId={gameId} userId={userId} />
        <SetupComponents
          setGameId={setGameId}
          setUserId={setUserId}
          userId={userId}
          gameId={gameId}
        />
      </AllProviders>
    </>
  );
}

export default App;

// TODO:
// -create function to start new game and connect to client
