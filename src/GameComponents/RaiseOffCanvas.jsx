import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import svgs from "../ClientFunctions/allSvgs";
import { useGameState } from "../Contexts/GameStateProvider";

function RaiseOffCanvas({
  showRaiseOffCanvas,
  setShowRaiseOffCanvas,
  gameState,
}) {
  const [numOfCardsInput, setNumOfCardsInput] = useState(
    gameState.latestBet.numOfCards
  );

  function handleSetNumOfCardsInput(direction) {
    const currentBetPlusRaise =
      numOfCardsInput + gameState.latestBet.numOfCards;

    if (direction === "up" && currentBetPlusRaise < totalCardsPlayed()) {
      setNumOfCardsInput(numOfCardsInput + 1);
    } else if (
      direction === "up" &&
      currentBetPlusRaise === totalCardsPlayed()
    ) {
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

  function handleRaise() {
    console.log("raise");
  }

  useEffect(() => {
    setNumOfCardsInput(gameState.latestBet.numOfCards);
  }, [gameState.latestBet.numOfCards]);

  return (
    <Offcanvas
      show={showRaiseOffCanvas}
      onHide={() => setShowRaiseOffCanvas(false)}
      placement="bottom"
      name="bottom"
      className="light"
      scroll="true"
    >
      <Offcanvas.Header closeButton className="p-1">
        <Offcanvas.Title className="text-center">Current Bet:</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex flex-row justify-content-between">
          <div className="m-4 text lead">
            {gameState.latestBet.highestBetter} bet
            {gameState.latestBet.numOfCards} cards.
          </div>
          <div>Raise: +{numOfCardsInput}</div>
          <div>
            <Button
              className="m-1 p-3"
              onClick={() => handleSetNumOfCardsInput("up")}
            >
              {svgs.upArrow}
            </Button>
            <Button
              className="m-1 p-3"
              disabled={numOfCardsInput <= 1 ? true : false}
              onClick={() => handleSetNumOfCardsInput("down")}
            >
              {svgs.downArrow}
            </Button>
          </div>
          <Button className="p-3 w-25" onClick={handleRaise}>
            Bet
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default RaiseOffCanvas;
