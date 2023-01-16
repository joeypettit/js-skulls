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

// Route includes
// const gameRouter = require("./routes/game.route");
// Routes
// app.use("/api/game", gameRouter);

// Socket.io
io.on("connection", (socket) => {
  console.log("connected");

  socket.on("create-gamestate", ({ userId, gameId }) => {
    // create new room based on gameId
    let newGameRoom = gameId;
    socket.join(newGameRoom);
    // // create a new gamestate with this gameId
    const newGameState = createNewGameState(userId, gameId);
    allGameStates.push(newGameState);
    socket.emit("update-gamestate", newGameState);
  });

  // add player to a game using gameId and playerId
  socket.on("add-player", ({ playerId, gameId }) => {
    // find gameState with matching gameId
    const gameToJoin = allGameStates.find((object) => object.gameId === gameId);

    // if a gamestate matches18
    if (gameToJoin) {
      socket.join(gameToJoin);
    }
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
