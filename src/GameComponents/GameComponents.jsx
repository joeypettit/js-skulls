import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import PlayerHand from "./PlayerHand";
import GameBoard from "./GameBoard";
import BettingOffCanvas from "./BettingOffCanvas";
import RaiseOrPassButtons from "./RaiseOrPassButtons";
import PlayOrBetButtons from "./PlayOrBetButtons";
import { useGameState } from "../Contexts/GameStateProvider";

function GameComponents({ gameId, userId }) {
  const { gameState } = useGameState();
  // state to open/close player hand off canvas
  const [showHand, setShowHand] = useState(false);
  const [showBetting, setShowBetting] = useState(false);

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
            <BettingOffCanvas
              showBetting={showBetting}
              setShowBetting={setShowBetting}
              gameState={gameState}
            />
            <div className="d-flex flex-row position-sticky bottom-0 w-100">
              {(gameState.gamePhase === "Set Round" ||
                gameState.gamePhase === "Play or Bet") && (
                <PlayOrBetButtons
                  gameState={gameState}
                  setShowBetting={setShowBetting}
                  setShowHand={setShowHand}
                  userId={userId}
                />
              )}
              {gameState.gamePhase === "Raise Or Pass" && (
                <RaiseOrPassButtons
                  setShowBetting={setShowBetting}
                  setShowHand={setShowHand}
                />
              )}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default GameComponents;
