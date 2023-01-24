import React from "react";
import Button from "react-bootstrap/Button";

function PlayOrBetButtons({
  gameState,
  userId,
  setShowBetOffCanvas,
  setShowHand,
}) {
  return (
    <>
      <Button
        className="end-50 w-50"
        variant="info"
        onClick={() => setShowBetOffCanvas(true)}
        disabled={
          gameState.gamePhase === "Play or Bet" &&
          userId === gameState.players[gameState.playerTurnIndex].playerId
            ? false
            : true
        }
      >
        Make a Bet
      </Button>
      <Button
        variant="warning"
        className="start-50 w-50"
        onClick={() => setShowHand(true)}
      >
        Show Hand
      </Button>
    </>
  );
}

export default PlayOrBetButtons;
