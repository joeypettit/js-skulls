import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useGameState } from "../Contexts/GameStateProvider";

function ReorderPlayers({ gameState, userId }) {
  const { assignPlayerOrderNumber } = useGameState();

  function handleReorder(newIndex) {
    assignPlayerOrderNumber(newIndex);
  }

  return (
    <Container className="d-flex flex-column justify-content-center">
      {gameState.playersReordering && (
        <div className="text-danger">
          <h4>
            The Player to the Left of{" "}
            {gameState.players[gameState.reorderingAt].name}, Press Next
          </h4>
          <Button onClick={() => handleReorder(gameState.reorderingAt + 1)}>
            Next
          </Button>
        </div>
      )}

      {/* {gameState.playersReordering && (
        <div className="text-danger">
          Going counter-clockwise, press the button corresponding to your order
          placement starting with {gameState.players[0].name},
        </div>
      )}
      <ul>
        {gameState.players.map((player, index) => {
          // game owner is always first in array, ordering begin with them
          if (player.isOwner === true) {
            return (
              <li key={index} className="m-1">
                <Button
                  variant={gameState.playersReordering ? "danger" : "secondary"}
                  disabled={gameState.playersReordering ? true : false}
                >
                  {"1: "}
                  {player.name}
                </Button>
              </li>
            );
            // if user is the game owner (first in array), disable all buttons
          } else if (userId === gameState.players[0].playerId) {
            return (
              <li key={index} className="m-1">
                <Button
                  variant={"secondary"}
                  disabled={gameState.playersReordering ? true : false}
                >
                  {index + 1 + ": "}
                  {player.name}
                </Button>
              </li>
            );
            // user cannot click their own button
          } else if (userId === player.playerId) {
            return (
              <li key={index} className="m-1">
                <Button variant={"warning"} disabled>
                  {index + 1 + ": "}
                  {player.name}
                </Button>
              </li>
            );
          } else {
            return (
              <li key={index} className="m-1">
                <Button
                  variant={gameState.playersReordering ? "info" : "secondary"}
                  onClick={() => handleOrdering(index)}
                >
                  {index + 1 + ": "}
                  {player.name}
                </Button>
              </li>
            );
          }
        })}
      </ul> */}
    </Container>
  );
}

export default ReorderPlayers;
