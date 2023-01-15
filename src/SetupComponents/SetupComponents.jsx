import React from "react";
import LoginPage from "./LoginPage";
import AddPlayersPage from "./AddPlayersPage";

function SetupComponents({ setGameId, setUserId, userId }) {
  return (
    <>
      <LoginPage setGameId={setGameId} setUserId={setUserId} userId={userId} />
      <AddPlayersPage />
    </>
  );
}

export default SetupComponents;
