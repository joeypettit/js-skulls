import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function ReorderPlayers() {
  function handleOrdering() {}

  return (
    <Container>
      <Button size="lg" onClick={handleOrdering}></Button>
    </Container>
  );
}

export default ReorderPlayers;
