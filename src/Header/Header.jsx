import React from "react";

function Header({ gameId, userId }) {
  return (
    <header className="App-header containe-fluid">
      <div className="row w-100">
        <span className="col-4 text-start">Game Id: {gameId}</span>
        <span className="col-4 text-center">💀💀 & 🌹🌹</span>
        <span className="col-4 text-end">Player Id: {userId}</span>
      </div>
    </header>
  );
}

export default Header;
