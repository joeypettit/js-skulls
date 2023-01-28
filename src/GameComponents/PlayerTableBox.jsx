import React from "react";
import { useGameState } from "../Contexts/GameStateProvider";
import TableHand from "./TableHand";
import CardsOnTable from "./CardsOnTable";

function PlayerTableBox({ player, userId }) {
  const { gameState } = useGameState();

  function flipRequestActivated() {
    const bettersId = gameState.latestBet.highestBetter.playerId;

    // if this user is the highest better and they have laid all of their cards,
    // (and the game is in the "flip-cards phase") return true, else false.
    if (
      gameState.gamePhase === "flip-cards" &&
      gameState.flipRequestedTo !== bettersId &&
      bettersId === userId
    ) {
      return true;
    } else {
      return false;
    }
  }

  function handleRequestFlip() {}

  return (
    <div
      key={player.playerId}
      className={
        player.isPlayerTurn
          ? `d-flex flex-row justify-content-between py-3 my-1 rounded bg-info shadow ${
              flipRequestActivated() && `border border-primary border-3`
            }`
          : `d-flex flex-row justify-content-between py-3 my-1 rounded bg-light shadow ${
              flipRequestActivated() && `border border-primary border-3`
            }`
      }
      onClick={
        flipRequestActivated() ? () => handleRequestFlip(player.playerId) : null
      }
    >
      <TableHand player={player} userId={userId} />
      <CardsOnTable cards={player.cardsInPlay} />
    </div>
  );
}

export default PlayerTableBox;
