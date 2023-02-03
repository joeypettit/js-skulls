import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useGameState } from "../Contexts/GameStateProvider";

function WonRoundModal({ showWonRoundModal, setShowWonRoundModal }) {
  const { gameState, setNewRound } = useGameState();

  function handleSetNewRound() {
    setNewRound();
  }

  useEffect(() => {
    if (gameState.gamePhase === "better-won") setShowWonRoundModal(true);
  });

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
        <div>
          <h1>{gameState.latestBet.highestBetter.name} recieves one point!</h1>
          <div>
            <Button onClick={handleSetNewRound}>Begin Next Round</Button>
          </div>
        </div>
        <Button>Continue</Button>
      </Modal.Body>
    </Modal>
  );
}

export default WonRoundModal;
