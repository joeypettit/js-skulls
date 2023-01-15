// import PlayerCard from "./PlayerCard";

function PlayerHand({ playerNum }) {
  return (
    <div className="player-hands">
      <h1>Player Hands:</h1>
      {/* <h3>{Object.keys(playerState).length !== 0 && playerState.name}</h3>
      <h4>Hand is:</h4>
      {Object.keys(playerState).length !== 0 &&
        playerState.cardsInHand.map((card) => {
          return <PlayerCard card={card} />;
        })} */}

      <button>Update</button>
    </div>
  );
}

export default PlayerHand;
