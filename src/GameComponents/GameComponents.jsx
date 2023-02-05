import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import PlayerHand from "./PlayerHand";
import GameBoard from "./GameBoard";
import BetOffCanvas from "./BetOffCanvas";
import RaiseOrPassButtons from "./RaiseOrPassButtons";
import PlayOrBetButtons from "./PlayOrBetButtons";
import RaiseOffCanvas from "./RaiseOffCanvas";
import FlipModal from "./FlipModal";
import WonRoundModal from "./WonRoundModal";
import LostRoundModal from "./LostRoundModal";
import { useGameState } from "../Contexts/GameStateProvider";

function GameComponents({ gameId, userId }) {
  const { gameState } = useGameState();

  // state to open/close player hand off canvas
  const [showHand, setShowHand] = useState(false);
  const [showBetOffCanvas, setShowBetOffCanvas] = useState(false);
  const [showRaiseOffCanvas, setShowRaiseOffCanvas] = useState(false);
  const [showFlipModal, setShowFlipModal] = useState(false);
  const [showWonRoundModal, setShowWonRoundModal] = useState(false);
  const [showLostRoundModal, setShowLostRoundModal] = useState(false);

  return (
    <>
      <Container fluid className="p-0 w-auto h-100">
        {gameState && gameState.readyToPlay && gameState.inProgress && (
          <>
            <GameBoard
              gameState={gameState}
              userId={userId}
              setShowFlipModal={setShowFlipModal}
              showFlipModal={showFlipModal}
            />
            {gameState.thisUserNotEliminated && (
              <>
                <PlayerHand
                  gameState={gameState}
                  userId={userId}
                  setShowHand={setShowHand}
                  showHand={showHand}
                />
                <BetOffCanvas
                  showBetOffCanvas={showBetOffCanvas}
                  setShowBetOffCanvas={setShowBetOffCanvas}
                  gameState={gameState}
                />
                <RaiseOffCanvas
                  showRaiseOffCanvas={showRaiseOffCanvas}
                  setShowRaiseOffCanvas={setShowRaiseOffCanvas}
                  gameState={gameState}
                />
              </>
            )}
            <FlipModal
              userId={userId}
              showFlipModal={showFlipModal}
              setShowFlipModal={setShowFlipModal}
            />
            <WonRoundModal
              showWonRoundModal={showWonRoundModal}
              setShowWonRoundModal={setShowWonRoundModal}
            />
            <LostRoundModal
              showLostRoundModal={showLostRoundModal}
              setShowLostRoundModal={setShowLostRoundModal}
            />

            <div className="d-flex flex-row position-fixed bottom-0 w-100">
              {((gameState.thisUserNotEliminated &&
                gameState.gamePhase === "set-round") ||
                gameState.gamePhase === "Play or Bet") && (
                <PlayOrBetButtons
                  gameState={gameState}
                  setShowBetOffCanvas={setShowBetOffCanvas}
                  setShowHand={setShowHand}
                  userId={userId}
                />
              )}
              {gameState.thisUserNotEliminated &&
                gameState.gamePhase === "Raise or Pass" && (
                  <RaiseOrPassButtons
                    userId={userId}
                    setShowRaiseOffCanvas={setShowRaiseOffCanvas}
                    setShowHand={setShowHand}
                  />
                )}
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default GameComponents;
