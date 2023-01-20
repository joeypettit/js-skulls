import { useEffect, useMemo } from "react";
import PlayerCard from "./PlayerCard";
import Offcanvas from "react-bootstrap/Offcanvas";

function PlayerHand({ gameState, userId, setShowHand, showHand }) {
  // pull this user out of players array
  const thisPlayer = useMemo(() => {
    for (let player of gameState.players) {
      if (player.playerId === userId) {
        return player;
      }
    }
  }, [userId, gameState.players]);

  console.log("this player", thisPlayer);

  useEffect(() => {
    // shuffle player hand so that the skull always
    // appears on a different location on the screen
    // (to avoid other players guessing based on your
    // button press location)
    thisPlayer.allCards.sort((a, b) => 0.5 - Math.random());
  }, [thisPlayer, gameState.round]);

  return (
    <Offcanvas
      show={showHand}
      onHide={() => setShowHand(false)}
      placement="bottom"
      name={"bottom"}
      className="bg-warning"
    >
      <Offcanvas.Header closeButton className="p-1">
        <Offcanvas.Title>Your Hand:</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-row justify-content-around">
        {thisPlayer.allCards.map((card, index) => {
          if (card.isInHand) {
            return <PlayerCard key={index} card={card} />;
          } else {
            return null;
          }
        })}
      </Offcanvas.Body>
    </Offcanvas>

    // <h1>Your Hand:</h1>
    // <Container className="d-flex flex-row justify-content-around">
    //   <div className="d-flex flex-row justify-content-around bg-primary">
    //     {thisPlayer.cardsInHand.map((card, index) => {
    //       return <PlayerCard key={index} card={card} />;
    //     })}
    //   </div>
    // </Container>
  );
}

export default PlayerHand;
