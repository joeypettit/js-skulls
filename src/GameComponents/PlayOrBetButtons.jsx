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
        className="col col-6"
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
        className="col col-6"
        onClick={() => setShowHand(true)}
      >
        Show Hand
      </Button>
    </>
  );
}

export default PlayOrBetButtons;
