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
  console.log("connected", socket.handshake.query.userId);

  socket.on("create-gamestate", ({ gameId, playerName }) => {
    const userId = socket.handshake.query.userId;
    // create new room based on gameId
    socket.join(gameId);
    // // create a new gamestate with this gameId
    const newGameState = createNewGameState(userId, gameId, playerName);
    allGameStates.push(newGameState);
    console.log("updating gamestate");
    io.in(gameId).emit("update-gamestate", newGameState);
  });

  // add player to a game using gameId and userId
  socket.on("add-player", ({ gameId, playerName }) => {
    console.log("add player", socket.handshake.query.userId);
    const userId = socket.handshake.query.userId;
    const gameStateIndex = allGameStates.findIndex(
      (gameStateObj) => gameStateObj.gameId == gameId
    );
    console.log(allGameStates);
    console.log("adding player", userId, gameId, gameStateIndex);

    // if a gamestate matches, join socket, add player to gamestate
    if (gameStateIndex !== -1) {
      const newPlayerObj = createNewPlayer(userId, playerName);
      allGameStates[gameStateIndex].players.push(newPlayerObj);
      const updatedGameState = allGameStates[gameStateIndex];
      socket.join(gameId);
      io.in(gameId).emit("update-gamestate", updatedGameState);
    } else {
      // emit there was an error
    }
    //
  });

  socket.on("toggle-reorder-players", (gameId) => {
    const gameStateIndex = allGameStates.findIndex(
      (gameStateObj) => gameStateObj.gameId === gameId
    );

    if (gameStateIndex !== -1) {
      allGameStates[gameStateIndex].playersReordering =
        !allGameStates[gameStateIndex].playersReordering;
      const updatedGameState = allGameStates[gameStateIndex];
      io.in(gameId).emit("update-gamestate", updatedGameState);
    } else {
      // emit there was an error
    }
  });

  socket.on("assign-order-index", ({ gameId, newIndex }) => {
    const userId = socket.handshake.query.userId;
    console.log("in assign order index", gameId, newIndex);

    // find correct gameState to edit
    const gameStateIndex = allGameStates.findIndex(
      (gameStateObj) => gameStateObj.gameId === gameId
    );

    // if gamestate found...
    if (gameStateIndex !== -1) {
      // find the current index of the player that will be reordered
      const playerIndex = allGameStates[gameStateIndex].players.findIndex(
        (playersObj) => {
          playersObj.playerId === userId;
        }
      );
      // remove player object from players array, store in variable
      const playerObj = allGameStates[gameStateIndex].players.splice(
        playerIndex,
        1
      )[0];

      console.log("playerObj", playerObj);
      // reinsert player object at updated index
      allGameStates[gameStateIndex].players.splice(newIndex, 0, playerObj);

      // add one to helper counter
      allGameStates[gameStateIndex].reorderingAt += 1;

      // if helper counter "reorderingAt" is greater than length of players array...
      if (
        allGameStates[gameStateIndex].reorderingAt >=
        allGameStates[gameStateIndex].players.length - 1
      ) {
        // reset the counter to 0, and flip "playersReordering" to false
        allGameStates[gameStateIndex].reorderingAt = 0;
        allGameStates[gameStateIndex].playersReordering = false;
      }

      // return updated gamestate to clients
      const updatedGameState = allGameStates[gameStateIndex];
      console.log("updatedgamestate", updatedGameState);
      io.in(gameId).emit("update-gamestate", updatedGameState);
    } else {
      // emit there was an error
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnect user", socket.rooms);
    const disconnectedId = socket.handshake.query.userId;
  });
});

// Serve static files
app.use(express.static("build"));

server.listen(PORT, () => {
  console.log("listening on PORT 5000");
});
