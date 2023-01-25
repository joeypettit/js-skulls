import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import PlayerHand from "./PlayerHand";
import GameBoard from "./GameBoard";
import BetOffCanvas from "./BetOffCanvas";
import RaiseOrPassButtons from "./RaiseOrPassButtons";
import PlayOrBetButtons from "./PlayOrBetButtons";
import RaiseOffCanvas from "./RaiseOffCanvas";
import { useGameState } from "../Contexts/GameStateProvider";

function GameComponents({ gameId, userId }) {
  const { gameState } = useGameState();
  // state to open/close player hand off canvas
  const [showHand, setShowHand] = useState(false);
  const [showBetOffCanvas, setShowBetOffCanvas] = useState(false);
  const [showRaiseOffCanvas, setShowRaiseOffCanvas] = useState(false);

  console.log("gamestate is", gameState);

  return (
    <>
      <Container fluid className="p-0 w-auto h-100">
        {gameState && gameState.readyToPlay && gameState.inProgress && (
          <>
            <GameBoard gameState={gameState} userId={userId} />
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

            <div className="d-flex flex-row position-fixed bottom-0 w-100">
              {(gameState.gamePhase === "Set Round" ||
                gameState.gamePhase === "Play or Bet") && (
                <PlayOrBetButtons
                  gameState={gameState}
                  setShowBetOffCanvas={setShowBetOffCanvas}
                  setShowHand={setShowHand}
                  userId={userId}
                />
              )}
              {gameState.gamePhase === "Raise or Pass" && (
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
