import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useGameState } from "../Contexts/GameStateProvider";

function EndRoundModal({ showEndRoundModal, setShowEndRoundModal }) {
  const { gameState, setNewRound } = useGameState();

  function handleSetNewRound() {
    setNewRound();
  }

  useEffect(() => {
    if (
      gameState.gamePhase === "better-won" ||
      gameState.gamePhase === "better-lost"
    )
      setShowEndRoundModal(true);
  });

  return (
    <Modal
      show={showEndRoundModal}
      onHide={() => setShowEndRoundModal(false)}
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
        {gameState.gamePhase === "better-lost" && (
          <div>
            <h1>{gameState.latestBet.highestBetter.name} loses a card!</h1>
            <div>
              <h4>Game Over</h4>
            </div>
            <div>
              <Button onClick={handleSetNewRound}>Begin Next Round</Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default EndRoundModal;
