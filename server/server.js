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
const createCensoredGameState = require("./gameFunctions/createCensoredGameState");

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
    socket.join(userId);
    // // create a new gamestate with this gameId
    const newGameState = createNewGameState(userId, gameId, playerName);
    allGameStates.push(newGameState);
    io.in(gameId).emit("update-gamestate", newGameState);
  });

  // add player to a game using gameId and userId
  socket.on("add-player", ({ gameId, playerName }) => {
    console.log("add player", socket.handshake.query.userId);
    const userId = socket.handshake.query.userId;
    const gameStateIndex = allGameStates.findIndex(
      (gameStateObj) => gameStateObj.gameId == gameId
    );

    // if a gamestate matches, join socket, add player to gamestate
    if (gameStateIndex !== -1) {
      const newPlayerObj = createNewPlayer(userId, playerName, false);
      allGameStates[gameStateIndex].players.push(newPlayerObj);
      const updatedGameState = allGameStates[gameStateIndex];
      socket.join(gameId);
      socket.join(userId);
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

    allGameStates[gameStateIndex].reorderingAt = 0;

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
      (gameStateObj) => gameStateObj.gameId === gameId.toString()
    );

    // if gamestate found...
    if (gameStateIndex !== -1) {
      // find the current index of the player that will be reordered
      const playerIndex = allGameStates[gameStateIndex].players.findIndex(
        (playerObj) => {
          return playerObj.playerId === userId;
        }
      );

      if (playerIndex !== newIndex) {
        // remove player object from players array, store in variable
        const playerObj = allGameStates[gameStateIndex].players.splice(
          playerIndex,
          1
        )[0];

        // reinsert player object at updated index
        allGameStates[gameStateIndex].players.splice(newIndex, 0, playerObj);
      }
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
      io.in(gameId).emit("update-gamestate", updatedGameState);
    } else {
      // emit there was an error
    }
  });

  socket.on("start-new-game", (gameId) => {
    // find correct gameState to edit
    const gameStateIndex = allGameStates.findIndex(
      (gameStateObj) => gameStateObj.gameId === gameId.toString()
    );

    // if gamestate found...
    if (gameStateIndex !== -1) {
      // set each readyToPlay and inProgress to true
      allGameStates[gameStateIndex].readyToPlay = true;
      allGameStates[gameStateIndex].inProgress = true;

      // for each player,
      // -move cards into cardsInHand
      // -emit unique gamestate with other player info censored.
      for (let player of allGameStates[gameStateIndex].players) {
        // censor other players' card info
        const updatedGameState = createCensoredGameState(
          player.playerId,
          allGameStates[gameStateIndex]
        );
        // send uniquely censored gamestate to each player
        io.in(player.playerId).emit("update-gamestate", updatedGameState);
      }
      // set player turn index
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
