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
      <AllProviders
        gameId={gameId}
        setGameId={setGameId}
        userId={userId}
        setUserId={setUserId}
      >
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
// -Use device as gameboard feature
// -Ensure that when client is disconnected, the game response appropiately
//    -implement list of recent players on server
//    -when client drops, check what their active games were, update gamestate
//    -
// -Possible player order idea...
//    -promt: player two press, player three press, player four press, etc.
// -Add ability to change player name on the add players screen
// -Global "Kath is connected/disconnected" notification messages context
// -Global error messages conext
//
