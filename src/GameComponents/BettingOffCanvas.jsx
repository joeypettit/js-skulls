import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import svgs from "../ClientFunctions/allSvgs";

function BettingOffCanvas({ gameState, showBetting, setShowBetting }) {
  // state to manage number of cards input
  const [numOfCards, setNumOfCards] = useState(gameState.players.length);

  return (
    <Offcanvas
      show={showBetting}
      onHide={() => setShowBetting(false)}
      placement="bottom"
      name="bottom"
      className="light"
    >
      <Offcanvas.Header closeButton className="p-1">
        <Offcanvas.Title className="text-center">
          How Many Cards?
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex flex-row justify-content-between">
          <div className="m-4 text lead">{numOfCards}</div>
          <div>
            <Button
              className="m-1 p-3"
              onClick={() => setNumOfCards(numOfCards + 1)}
            >
              {svgs.upArrow}
            </Button>
            <Button
              className="m-1 p-3"
              onClick={() => setNumOfCards(numOfCards - 1)}
            >
              {svgs.downArrow}
            </Button>
          </div>
          <Button className="p-3 w-25">Bet</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default BettingOffCanvas;
