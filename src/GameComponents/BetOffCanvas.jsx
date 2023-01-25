import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import svgs from "../ClientFunctions/allSvgs";
import { useGameState } from "../Contexts/GameStateProvider";

function BetOffCanvas({ gameState, showBetOffCanvas, setShowBetOffCanvas }) {
  // state to manage number of cards input
  const [numOfCardsInput, setNumOfCardsInput] = useState(
    gameState.players.length
  );

  const { initiateBetting } = useGameState();

  function handleSetNumOfCards(direction) {
    if (direction === "up" && numOfCardsInput < totalCardsPlayed()) {
      setNumOfCardsInput(numOfCardsInput + 1);
    } else if (direction === "up" && numOfCardsInput === totalCardsPlayed()) {
      return;
    } else if (direction === "down" && numOfCardsInput <= 1) {
      return;
    } else {
      setNumOfCardsInput(numOfCardsInput - 1);
    }

    // count how many total cards have been played
    function totalCardsPlayed() {
      let cardCounter = 0;
      for (let player of gameState.players) {
        cardCounter += player.cardsInPlay.length;
      }
      console.log(cardCounter);
      return cardCounter;
    }
  }

  function handleBet() {
    initiateBetting(numOfCardsInput);
    setShowBetOffCanvas(false);
  }

  useEffect(() => {
    setNumOfCardsInput(gameState.players.length);
  }, [gameState.players]);

  return (
    <Offcanvas
      show={showBetOffCanvas}
      onHide={() => setShowBetOffCanvas(false)}
      placement="bottom"
      name="bottom"
      className="light"
      scroll="true"
    >
      <Offcanvas.Header closeButton className="p-1">
        <Offcanvas.Title className="text-center">
          How Many Cards?
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex flex-row justify-content-between">
          <div className="m-4 text lead">{numOfCardsInput}</div>
          <div>
            <Button
              className="m-1 p-3"
              onClick={() => handleSetNumOfCards("up")}
            >
              {svgs.upArrow}
            </Button>
            <Button
              className="m-1 p-3"
              onClick={() => handleSetNumOfCards("down")}
              disabled={numOfCardsInput <= 1 ? true : false}
            >
              {svgs.downArrow}
            </Button>
          </div>
          <Button
            className="p-3 w-25"
            onClick={handleBet}
            disabled={!showBetOffCanvas}
          >
            Bet
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default BetOffCanvas;
