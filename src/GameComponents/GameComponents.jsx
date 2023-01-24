import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
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
      <Container fluid className="p-0 w-auto">
        {gameState && gameState.readyToPlay && gameState.inProgress && (
          <div className="w-auto">
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

            <Container
              fluid
              className="d-flex flex-row position-sticky bottom-0"
            >
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
                  setShowRaiseOffCanvas={setShowRaiseOffCanvas}
                  setShowHand={setShowHand}
                />
              )}
            </Container>
          </div>
        )}
      </Container>
    </>
  );
}

export default GameComponents;
