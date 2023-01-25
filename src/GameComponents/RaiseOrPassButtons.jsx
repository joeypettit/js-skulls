import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useGameState } from "../Contexts/GameStateProvider";

function RaiseOrPassButtons({ setShowRaiseOffCanvas, setShowHand }) {
  const { passOnBet } = useGameState();

  function handlePass() {
    passOnBet();
  }

  return (
    <>
      <Button className="col col-4" variant="danger" onClick={handlePass}>
        Fold
      </Button>
      <Button
        className="col col-4"
        variant="info"
        onClick={() => setShowRaiseOffCanvas(true)}
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
