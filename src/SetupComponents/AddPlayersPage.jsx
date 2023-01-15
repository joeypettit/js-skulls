import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function AddPlayersPage({ gameId }) {
  return (
    <Container>
      <h1>Your Game Id is: {gameId}</h1>
      <p>Navigate to URL and Enter Existing Game Using the Game Id</p>
      <p>When All Players Are In, Press Ready</p>
      <Button>Ready</Button>
    </Container>
  );
}

export default AddPlayersPage;
