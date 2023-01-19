import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import PlayerHand from "./PlayerHand";
import { useGameState } from "../Contexts/GameStateProvider";

function GameComponents({ gameId, userId }) {
  const { gameState } = useGameState();
  const [showHand, setShowHand] = useState(false);
  console.log("set show hand", showHand);

  return (
    <>
      <Container className="w-auto">
        {gameState && gameState.readyToPlay && gameState.inProgress && (
          <div className="w-auto">
            <PlayerHand
              gameState={gameState}
              userId={userId}
              setShowHand={setShowHand}
              showHand={showHand}
            />
            <Button
              className="position-absolute bottom-0 start-50 translate-middle-x"
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
