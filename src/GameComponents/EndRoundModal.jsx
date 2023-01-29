import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useGameState } from "../Contexts/GameStateProvider";

function EndGameModal() {
  const { setNewRound } = useGameState();

  function handleSetNewRound() {
    setNewRound();
  }
  return (
    <Modal
      show={showFlipModal}
      onHide={() => setShowFlipModal(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>
          {gameState.gamePhase === "better-won" && (
            <span>{gameState.latestBet.highestBetter.name} won the bet!</span>
          )}
          {gameState.gamePhase === "better-lost" && (
            <span>{gameState.latestBet.highestBetter.name} lost the bet!</span>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {gameState.gamePhase === "better-won" && (
          <div>
            <h1>
              {gameState.latestBet.highestBetter.name} recieves one point!
            </h1>
            <div>
              <Button onClick={handleSetNewRound}>Begin Next Round</Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default EndGameModal;
