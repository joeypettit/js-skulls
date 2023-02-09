import React from "react";
import LoginPage from "./LoginPage";
import AddPlayersPage from "./AddPlayersPage";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGameState } from "../Contexts/GameStateProvider";
import Container from "react-bootstrap/Container";

function SetupComponents({ setGameId, gameId, userId, setUserId }) {
  const { gameState } = useGameState();
  // use local storage to grab/store player name
  const [playerName, setPlayerName] = useLocalStorage("name", null);
  console.log("game id, userid, gamestate", gameId, userId, gameState);

  return (
    <>
      <Container>
        {!gameId && (
          <LoginPage
            setGameId={setGameId}
            setUserId={setUserId}
            userId={userId}
            playerName={playerName}
            setPlayerName={setPlayerName}
          />
        )}
        {gameId && userId && gameState && !gameState.readyToPlay && (
          <AddPlayersPage
            gameId={gameId}
            gameState={gameState}
            userId={userId}
            playerName={playerName}
          />
        )}
      </Container>
    </>
  );
}

export default SetupComponents;
