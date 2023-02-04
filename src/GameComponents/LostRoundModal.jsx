import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useGameState } from "../Contexts/GameStateProvider";

function LostRoundModal({ showLostRoundModal, setShowLostRoundModal }) {
  const { gameState, setNewRound, removeBetterCard } = useGameState();
  const [showSecondView, setShowSecondView] = useState(false);

  function handleSetNewRound() {
    setNewRound();
    setShowLostRoundModal(false);
    setShowSecondView(false);
  }

  function handleRemoveBetterCard() {
    removeBetterCard();
  }

  useEffect(() => {
    if (gameState.gamePhase === "better-lost") setShowLostRoundModal(true);
  }, [gameState.gamePhase]);

  useEffect(() => {
    if (gameState.nextToStart) {
      setShowSecondView(true);
    }
  }, [gameState.nextToStart]);

  return (
    <Modal
      show={showLostRoundModal}
      onHide={() => setShowLostRoundModal(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>
          <span>{gameState.latestBet.highestBetter.name} lost the bet!</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!showSecondView && (
          <div>
            <h1>{gameState.latestBet.highestBetter.name} loses a card!</h1>
            <div>
              {gameState.latestBet.highestBetter.name} loses a one of his cards.
            </div>
            <div>
              <Button onClick={handleRemoveBetterCard}>Continue</Button>
            </div>
          </div>
        )}
        {showSecondView && (
          <div>
            {gameState.betterWasEliminated && (
              <h1>{gameState.latestBet.highestBetter.name} was eliminated!</h1>
            )}
            {gameState.nextToStart !== null && (
              <>
                <div>{gameState.nextToStart.name} will begin next round.</div>
                <div>
                  <Button onClick={handleSetNewRound}>Begin Next Round</Button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default LostRoundModal;
