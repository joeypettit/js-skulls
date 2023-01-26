import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useGameState } from "../Contexts/GameStateProvider";

function FlipModal({ showFlipModal, setShowFlipModal }) {
  const { gameState } = useGameState();

  function countRevealedCards() {
    // count number of cards currently in play
    let revealedCardCount = 0;
    for (let player of gameState.players) {
      const revealedInThisHand = player.cardsInPlay
        .map((card) => {
          return card.isRevealed;
        })
        .flat().length;
      revealedCardCount += revealedInThisHand;
    }
    return revealedCardCount;
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
          <Modal.Title>
            {gameState.latestBet.highestBetter.name} needs{" "}
            {gameState.latestBet.numOfCards} roses to win!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Challenger!</Modal.Body>
      </Modal>
    </>
  );
}

export default FlipModal;
