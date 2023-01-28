import { useMemo } from "react";
import PlayerCard from "./PlayerCard";
import Offcanvas from "react-bootstrap/Offcanvas";

function PlayerHand({ gameState, userId, setShowHand, showHand }) {
  // pull this user out of players array
  const thisPlayer = useMemo(() => {
    return gameState.players.find((player) => {
      return player.playerId === userId;
    });
  }, [gameState, userId]);

  console.log("this player is", thisPlayer);

  return (
    <Offcanvas
      show={showHand}
      onHide={() => setShowHand(false)}
      placement="bottom"
      name="bottom"
      className="light"
    >
      <Offcanvas.Header closeButton className="p-1">
        <Offcanvas.Title>Your Hand:</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-row justify-content-around">
        {thisPlayer.cardsInHand.map((card, index) => {
          return (
            <PlayerCard
              key={index}
              card={card}
              isPlayerTurn={thisPlayer.isPlayerTurn}
              setShowHand={setShowHand}
            />
          );
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
