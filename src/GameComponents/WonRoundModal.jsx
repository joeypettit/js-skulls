import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useGameState } from "../Contexts/GameStateProvider";

function WonRoundModal({ showWonRoundModal, setShowWonRoundModal }) {
  const { gameState, setNewRound, awardPoint } = useGameState();
  const [showSecondView, setShowSecondView] = useState(false);

  function handleSetNewRound() {
    setNewRound();
    setShowWonRoundModal(false);
    setShowSecondView(false);
  }

  function handleAwardPoint() {
    awardPoint();
  }

  useEffect(() => {
    if (gameState.gamePhase === "better-won") setShowWonRoundModal(true);
  }, [gameState.gamePhase]);

  useEffect(() => {
    if (gameState.nextToStart) {
      setShowSecondView(true);
    }
  }, [gameState.nextToStart]);

  return (
    <Modal
      show={showWonRoundModal}
      onHide={() => setShowWonRoundModal(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>
          <span>{gameState.latestBet.highestBetter.name} won the bet!</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!showSecondView && (
          <div>
            <h1>
              {gameState.latestBet.highestBetter.name} recieves one point!
            </h1>
            <div>
              <Button onClick={handleAwardPoint}>Continue</Button>
            </div>
          </div>
        )}
        {showSecondView && (
          <div>
            {gameState.gameWinner && (
              <h1>🎉{gameState.gameWinner.name} won the game!🎉</h1>
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

export default WonRoundModal;
