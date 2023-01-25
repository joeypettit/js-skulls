function TableHand({ player }) {
  return (
    <div className="d-flex flex-column p-2">
      <div className="bg-light rounded text-center">
        {player.name}{" "}
        {player.hasFolded && (
          <span className="text-muted">
            <em>-(folded)-</em>
          </span>
        )}
      </div>
      <div className="d-flex flex-row">
        {player.cardsInHand.map((card, index) => {
          if (card.isRevealed === false) {
            return (
              <div key={index} className="m-1 bg-light">
                🎴
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default TableHand;
