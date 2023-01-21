import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import PlayerHand from "./PlayerHand";
import GameBoard from "./GameBoard";
import { useGameState } from "../Contexts/GameStateProvider";

function GameComponents({ gameId, userId }) {
  const { gameState } = useGameState();
  // state to open/close player hand off canvas
  const [showHand, setShowHand] = useState(false);

  console.log("gamestate is", gameState);

  return (
    <>
      <Container fluid className="p-0 w-auto">
        {gameState && gameState.readyToPlay && gameState.inProgress && (
          <div className="w-auto">
            <GameBoard gameState={gameState} userId={userId} />
            <PlayerHand
              gameState={gameState}
              userId={userId}
              setShowHand={setShowHand}
              showHand={showHand}
            />
            <div className="d-flex flex-row position-absolute bottom-0 w-100">
              <Button className="end-50 w-50">Bet</Button>
              <Button
                variant="warning"
                className="start-50 w-50"
                onClick={() => setShowHand(true)}
              >
                Show Hand
              </Button>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default GameComponents;
