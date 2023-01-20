function UnrevealedHand({ gameState, player }) {
  return (
    <div className="d-flex flex-column p-2">
      <div>{player.name}</div>
      <div className="d-flex flex-row">
        {player.allCards.map((card) => {
          if (card.isRevealed === false) {
            return <div>🎴</div>;
          }
        })}
      </div>
    </div>
  );
}

export default UnrevealedHand;
