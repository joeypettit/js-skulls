import React, { useState, useEffect } from "react";
import { useGameState } from "../Contexts/GameStateProvider";
import TableHand from "./TableHand";
import CardsOnTable from "./CardsOnTable";

function PlayerTableBox({ player, userId }) {
  const { gameState, requestFlip } = useGameState();
  const [flipSelectorActive, setFlipSelectActive] = useState();
  const bettersId = gameState.latestBet.highestBetter.playerId;

  function handleRequestFlip() {
    requestFlip(player.playerId);
  }

  useEffect(() => {
    // if this user is the highest better and they have laid all of their cards,
    // (and the game is in the "flip-cards phase") return true, else false.
    let unrevealedCards = player.cardsInPlay.filter((card) => {
      return !card.isRevealed;
    });

    if (
      gameState.gamePhase === "flip-cards" &&
      gameState.flipRequestedTo !== bettersId &&
      bettersId === userId &&
      player.playerId !== bettersId &&
      unrevealedCards.length !== 0
    ) {
      setFlipSelectActive(true);
    } else {
      setFlipSelectActive(false);
    }
  }, [gameState]);
  return (
    <div
      key={player.playerId}
      className={
        player.isPlayerTurn
          ? `d-flex flex-row justify-content-between py-3 my-1 rounded bg-info shadow ${
              flipSelectorActive && `border border-primary border-3`
            }`
          : `d-flex flex-row justify-content-between py-3 my-1 rounded bg-light shadow ${
              flipSelectorActive && `border border-primary border-3`
            }`
      }
      onClick={
        flipSelectorActive && player.playerId !== userId
          ? () => handleRequestFlip(player.playerId)
          : null
      }
    >
      <TableHand player={player} userId={userId} />
      <CardsOnTable cards={player.cardsInPlay} />
    </div>
  );
}

export default PlayerTableBox;
