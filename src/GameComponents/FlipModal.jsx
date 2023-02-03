import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import getPlayerIndex from "../ClientFunctions/getPlayerIndex";
import { useGameState } from "../Contexts/GameStateProvider";

function FlipModal({ userId, showFlipModal, setShowFlipModal }) {
  const { gameState, flipCard } = useGameState();

  const highestBettersId = gameState.latestBet.highestBetter.playerId;
  const highestBettersName = gameState.latestBet.highestBetter.name;

  const flipRequestedTo = gameState.flipRequestedTo;

  let indexOfPlayerThatWillFlip = "";

  if (flipRequestedTo) {
    indexOfPlayerThatWillFlip = getPlayerIndex(gameState, flipRequestedTo);
  }

  function determineCardPresentation(card) {
    if (card.isSkull && card.isRevealed) {
      return (
        <Button variant="danger" size="lg" className="py-4 px-3 mx-1">
          💀
        </Button>
      );
    } else if (!card.isSkull && card.isRevealed) {
      return (
        <Button variant="success" size="lg" className="py-4 px-3 mx-1">
          🌹
        </Button>
      );
    } else if (!card.isRevealed) {
      return (
        <Button variant="light" size="lg" className="py-4 px-3 mx-1">
          🎴
        </Button>
      );
    }
  }

  function handleFlipCard() {
    flipCard();
  }

  return (
    <>
      <Modal
        show={showFlipModal}
        onHide={() => setShowFlipModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title>FLIP MODAL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {gameState.gamePhase === "flip-cards" && (
            <div>
              <div>
                {highestBettersId === userId
                  ? "You need "
                  : highestBettersName + " needs "}
                {gameState.latestBet.rosesNeeded} roses to win!
              </div>

              <div className="d-flex flex-row">
                {indexOfPlayerThatWillFlip &&
                  gameState.players[indexOfPlayerThatWillFlip].cardsInPlay.map(
                    (card) => {
                      return determineCardPresentation(card);
                    }
                  )}
              </div>
              {flipRequestedTo && flipRequestedTo === userId && (
                <div>
                  <Button onClick={handleFlipCard}>Flip</Button>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FlipModal;
