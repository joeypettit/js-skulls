import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import svgs from "../ClientFunctions/allSvgs";
import { useGameState } from "../Contexts/GameStateProvider";

function BettingOffCanvas({ gameState, showBetting, setShowBetting }) {
  // state to manage number of cards input
  const [numOfCards, setNumOfCards] = useState(gameState.players.length);
  const [raiseNumOfCard, setRaiseNumOfCards] = useState(
    gameState.latestBet.numOfCards
  );

  const { initiateBetting } = useGameState();

  function handleSetNumOfCards(direction) {
    if (direction === "up" && numOfCards < totalCardsPlayed()) {
      setNumOfCards(numOfCards + 1);
    } else if (direction === "up" && numOfCards === totalCardsPlayed()) {
      return;
    } else if (direction === "down" && numOfCards <= 1) {
      return;
    } else {
      setNumOfCards(numOfCards - 1);
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
    initiateBetting(numOfCards);
  }

  useEffect(() => {
    setRaiseNumOfCards(gameState.latestBet.numOfCards);
  }, [gameState.latestBet.numOfCards]);

  useEffect(() => {
    setNumOfCards(gameState.players.length);
  }, [gameState.players]);

  return (
    <Offcanvas
      show={showBetting}
      onHide={() => setShowBetting(false)}
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
        {gameState.gamePhase === "Play or Bet" && (
          <div className="d-flex flex-row justify-content-between">
            <div className="m-4 text lead">{numOfCards}</div>
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
                disabled={numOfCards <= 1 ? true : false}
              >
                {svgs.downArrow}
              </Button>
            </div>
            <Button className="p-3 w-25" onClick={handleBet}>
              Bet
            </Button>
          </div>
        )}
        {gameState.gamePhase === "Raise or Pass" && (
          <div className="d-flex flex-row justify-content-between">
            <div className="m-4 text lead">
              {gameState.latestBet.highestBetter} bet
              {gameState.latestBet.numOfCards} cards.
            </div>
            <div>
              <Button className="m-1 p-3">{svgs.upArrow}</Button>
              <Button
                className="m-1 p-3"
                disabled={numOfCards <= 1 ? true : false}
              >
                {svgs.downArrow}
              </Button>
            </div>
            <Button className="p-3 w-25" onClick={handleBet}>
              Bet
            </Button>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default BettingOffCanvas;
