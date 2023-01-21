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
      <Container className="w-auto">
        {gameState && gameState.readyToPlay && gameState.inProgress && (
          <div className="w-auto">
            <GameBoard gameState={gameState} userId={userId} />
            <PlayerHand
              gameState={gameState}
              userId={userId}
              setShowHand={setShowHand}
              showHand={showHand}
            />
            <Button
              variant="warning"
              className="position-absolute bottom-0 start-50 translate-middle-x w-100"
              onClick={() => setShowHand(true)}
            >
              Show Hand
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}

export default GameComponents;
