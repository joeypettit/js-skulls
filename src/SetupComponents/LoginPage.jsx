import React, { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import generateId from "../ClientFunctions/generateId";
import { useGameState } from "../Contexts/GameStateProvider";

function LoginPage({ setGameId, userId, playerName, setPlayerName }) {
  // import function from GameStateProvider
  const { requestNewGameState, requestAddPlayerToGame } = useGameState();
  // this ref points to game id input on "enter an exisiting game"
  const gameIdEnterExistingRef = useRef();
  // this ref points to the game id input of "Use Device as Public Gameboard"
  const gameIdUseAsGameboard = useRef();
  // this ref points to the player name input
  const playerNameInputRef = useRef();
  // true when name has been confirmed => render start new/enter game
  const [nameConfirmed, setNameConfirmed] = useState(false);

  function handleChangeName() {
    const newPlayerName = playerNameInputRef.current.value;
    setPlayerName(newPlayerName);
  }

  function handleNameConfirm() {
    setNameConfirmed(true);
  }

  function handleStartNewGame() {
    const newGameId = generateId();
    // generate new room code, set as gameId

    // request new game state from server
    requestNewGameState(userId, newGameId, playerName);
  }

  // this function will enter the player into an exisiting game
  // using the players id, and inputted game id
  function handleEnterGame(e) {
    e.preventDefault();
    console.log("here");
    // send request to be added to game in 'enter game id' field
    const existingGameId = gameIdEnterExistingRef.current.value;
    requestAddPlayerToGame(existingGameId, playerName);
  }

  function handleUseDeviceAsGameboard(e) {
    e.preventDefault();
    setGameId(gameIdUseAsGameboard.current.value);
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center bg-light p-5 rounded">
      <div className="text-center">
        {playerName && !nameConfirmed && (
          <div>
            <h1>Welcome {playerName}</h1>
            <Button onClick={handleNameConfirm}>Continue</Button>
            <Button variant="secondary" onClick={() => setPlayerName(null)}>
              Change Name
            </Button>
          </div>
        )}
        {!playerName && (
          <div>
            <h1>Enter Your Name:</h1>
            <Form className="p-2 m-2 text-center" onSubmit={handleChangeName}>
              <Form.Group>
                <Form.Label>Enter Your Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={playerNameInputRef}
                  required
                  placeholder="Enter Your Name"
                ></Form.Control>
              </Form.Group>
              <Button type="submit" className="mt-2 me-2">
                Enter
              </Button>
            </Form>
          </div>
        )}
      </div>
      {playerName && nameConfirmed && (
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
      )}
      {/* Use This Device as a Game Gameboard */}
      {/* <Form
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
      </Form> */}
    </Container>
  );
}

export default LoginPage;
