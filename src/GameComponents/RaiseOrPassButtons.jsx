import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function RaiseOrPassButtons({ setShowRaiseOffCanvas, setShowHand }) {
  return (
    <>
      <Button className="col col-4" variant="danger">
        Pass
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
