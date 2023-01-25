import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useGameState } from "../Contexts/GameStateProvider";

function RaiseOrPassButtons({ userId, setShowRaiseOffCanvas, setShowHand }) {
  const { gameState, passOnBet } = useGameState();

  function handlePass() {
    passOnBet();
  }

  return (
    <>
      <Button
        className="col col-4"
        variant="danger"
        onClick={handlePass}
        disabled={
          userId === gameState.players[gameState.playerTurnIndex].playerId
            ? false
            : true
        }
      >
        Fold
      </Button>
      <Button
        className="col col-4"
        variant="info"
        onClick={() => setShowRaiseOffCanvas(true)}
        disabled={
          userId === gameState.players[gameState.playerTurnIndex].playerId
            ? false
            : true
        }
      >
        Raise
      </Button>
      <Button
        variant="warning"
        className="col col-4"
        onClick={() => setShowHand(true)}
      >
        Show Hand
      </Button>
    </>
  );
}

export default RaiseOrPassButtons;
