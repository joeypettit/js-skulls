import PlayerCard from "./PlayerCard";
import Container from "react-bootstrap/Container";

function PlayerHand({ gameState, userId }) {
  // pull player cards out of array
  let thisPlayer = {};
  gameState.players.map((player) => {
    if (player.playerId === userId) {
      thisPlayer = player;
    }
  });

  // shuffle player hand so that the skull always
  // appears on a different location on the screen
  // (to avoid other players guessing based on your
  // button press location)
  thisPlayer.cardsInHand.sort((a, b) => 0.5 - Math.random());

  console.log("thisPlayer", thisPlayer);
  return (
    <div className="player-hands">
      <h1>Your Hand:</h1>
      <Container className="d-flex flex-row justify-content-between">
        {thisPlayer.cardsInHand.map((card, index) => {
          return <PlayerCard key={index} card={card} />;
        })}
      </Container>
    </div>
  );
}

export default PlayerHand;
