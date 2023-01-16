const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 5000;

// Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // body parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // body parser middleware

// game logic imports
const allGameStates = require("./gameFunctions/allGameStates");
const createNewGameState = require("./gameFunctions/createNewGameState");
const createNewPlayer = require("./gameFunctions/createNewPlayer");

// Route includes
// const gameRouter = require("./routes/game.route");
// Routes
// app.use("/api/game", gameRouter);

// Socket.io
io.on("connection", (socket) => {
  console.log("connected");

  socket.on("create-gamestate", ({ userId, gameId, playerName }) => {
    // create new room based on gameId
    socket.join(gameId);
    // // create a new gamestate with this gameId
    const newGameState = createNewGameState(userId, gameId, playerName);
    allGameStates.push(newGameState);
    console.log("updating gamestate");
    io.in(gameId).emit("update-gamestate", newGameState);
  });

  // add player to a game using gameId and playerId
  socket.on("add-player", ({ playerId, gameId, playerName }) => {
    const gameStateIndex = allGameStates.findIndex(
      (gameStateObj) => gameStateObj.gameId === gameId
    );

    // if a gamestate matches, join socket, add player to gamestate
    if (gameStateIndex !== -1) {
      const newPlayerObj = createNewPlayer(playerId, playerName);
      allGameStates[gameStateIndex].players.push(newPlayerObj);
      const updatedGameState = allGameStates[gameStateIndex];
      socket.join(gameId);
      io.in(gameId).emit("update-gamestate", updatedGameState);
    } else {
      // emit there was an error
    }
    //
  });

  socket.on("disconnect", (socket) => {
    console.log("disconnected");
  });
});

// Serve static files
app.use(express.static("build"));

server.listen(PORT, () => {
  console.log("listening on PORT 5000");
});
