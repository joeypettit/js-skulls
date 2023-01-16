import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function ReorderPlayers({ gameState, playersReordering }) {
  function handleOrdering() {}

  return (
    <Container className="d-flex flex-column justify-content-center">
      {playersReordering && (
        <div className="text-danger">
          Starting with {gameState.players[0].name}, input your order,
          counter-clockwise.
        </div>
      )}
      <ul>
        {gameState.players.map((player, index) => {
          if (player.isOwner === true) {
            return (
              <li key={index} className="m-1">
                <Button variant={playersReordering ? "danger" : "secondary"}>
                  {"1: "}
                  {player.name}
                </Button>
              </li>
            );
          }
          return (
            <li key={index} className="m-1">
              <Button
                variant={playersReordering ? "info" : "secondary"}
                onClick={() => handleOrdering(index)}
              >
                {index + 1 + ": "}
                {player.name}
              </Button>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

export default ReorderPlayers;
