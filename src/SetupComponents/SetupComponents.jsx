import React from "react";
import LoginPage from "./LoginPage";
import AddPlayersPage from "./AddPlayersPage";

function SetupComponents({ setGameId, setUserId, userId, gameId }) {
  return (
    <>
      {!gameId && (
        <LoginPage
          setGameId={setGameId}
          setUserId={setUserId}
          userId={userId}
        />
      )}
      {}

      <AddPlayersPage gameId={gameId} />
    </>
  );
}

export default SetupComponents;
