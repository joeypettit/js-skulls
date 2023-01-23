import React from "react";
import Button from "react-bootstrap/Button";

function RaiseOrPassButtons({ setShowBetting, setShowHand }) {
  return (
    <>
      <Button>Pass</Button>
      <Button
        className="end-50 w-50"
        variant="info"
        onClick={() => setShowBetting(true)}
      >
        Raise
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

export default RaiseOrPassButtons;
