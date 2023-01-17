import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useGameState } from "../Contexts/GameStateProvider";

function ReorderPlayers({ gameState, userId }) {
  const { assignPlayerOrderNumber } = useGameState();
  const [userAddedToOrder, setUserAddedToOrder] = useState(false);

  function handleReorder(newIndex) {
    assignPlayerOrderNumber(newIndex);
    setUserAddedToOrder(true);
  }

  useEffect(() => {
    setUserAddedToOrder(false);
  }, [gameState.playersReordering]);

  return (
    <Container className="d-flex flex-column justify-content-center">
      {gameState.playersReordering && (
        <div className="text-danger">
          <h4>
            The Player to the Left of{" "}
            {gameState.players[gameState.reorderingAt].name}, Press Next
          </h4>
          {!(userId === gameState.players[0].playerId) && (
            <Button
              size="lg"
              onClick={() => handleReorder(gameState.reorderingAt + 1)}
              disabled={userAddedToOrder ? true : false}
            >
              {userAddedToOrder ? "Added" : "Next"}
            </Button>
          )}
        </div>
      )}
    </Container>
  );
}

export default ReorderPlayers;
