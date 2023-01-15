import React, { useRef } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import generateId from "../ClientFunctions/generateId";

function LoginPage({ setGameId, userId, setUserId }) {
  // this ref points to game id input on "enter an exisiting game"
  const gameIdEnterExistingRef = useRef();

  // this ref points to the game id input of "Use Device as Public Gameboard"
  const gameIdUseAsGameboard = useRef();

  // this function will enter the player into an exisiting game
  // using the players id, and inputted game id
  function handleEnterGame(e) {
    e.preventDefault();
    // set game id to entered game id
    setGameId(gameIdEnterExistingRef.current.value);
    // if player does not have id, create a new one
    createPlayerId();
  }

  function handleStartNewGame() {
    // generate new room code, set as gameId
    setGameId(generateId());
    // if player does not have id, create a new one
    createPlayerId();
    // open a socket, a request new game
  }

  function handleUseDeviceAsGameboard(e) {
    e.preventDefault();
    setGameId(gameIdUseAsGameboard.current.value);
  }

  function createPlayerId() {
    // if player does not have id, create a new one
    if (userId !== null) {
      console.log("here", userId);
      console.log("here string", "null");
      return;
    } else {
      setUserId(generateId());
    }
  }

  return (
    <Container className="d-flex flex-column alight-items-center justify-content-center">
      <div className="bg-light rounded d-flex flex-column align-items-center my-3">
        <Button onClick={handleStartNewGame} className="my-3">
          Start New Game
        </Button>
        <div>Or</div>
        {/* enter existing game with your id */}
        <Form className="p-2 m-2 text-center" onSubmit={handleEnterGame}>
          <Form.Group>
            <Form.Label>Enter An Existing Game</Form.Label>
            <Form.Control
              type="text"
              ref={gameIdEnterExistingRef}
              required
              placeholder="Enter Game ID"
            ></Form.Control>
          </Form.Group>
          <Button type="submit" className="mt-2 me-2">
            Enter
          </Button>
        </Form>
      </div>
      {/* Use This Device as a Game Gameboard */}
      <Form
        className="bg-light rounded p-2 m-2"
        onSubmit={handleUseDeviceAsGameboard}
      >
        <Form.Group>
          <Form.Label>Use Device as Public Gameboard</Form.Label>
          <Form.Control
            type="text"
            ref={gameIdUseAsGameboard}
            required
            placeholder="Enter Game ID"
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="mt-2 me-2">
          OK
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
