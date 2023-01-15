function GameBoardCard({ card }) {
  return <span>{card.isSkull ? <span>💀</span> : <span>🌹</span>}</span>;
}

export default GameBoardCard;
