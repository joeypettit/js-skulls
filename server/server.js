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
const passTurnToNextPlayer = require("./gameFunctions/passTurnToNextPlayer");
const playCard = require("./gameFunctions/playCard");
const startNewGame = require("./gameFunctions/startNewGame");
const emitCensoredGameStates = require("./gameFunctions/emitCensoredGameState");
const initiateBetting = require("./gameFunctions/initiateBetting");
const raiseBet = require("./gameFunctions/raiseBet");
const foldHand = require("./gameFunctions/foldHand");
const checkReadyForBetterFlipPhase = require("./gameFunctions/checkReadyForBetterFlipPhase");
const checkReadyForPlayOrBetPhase = require("./gameFunctions/checkReadyForPlayOrBetPhase");
const checkForAllCardsBet = require("./gameFunctions/checkForAllCardsBet");
const flipCard = require("./gameFunctions/flipCard");
const checkForSkullOrRose = require("./gameFunctions/checkForSkullOrRose");
const checkForRoundWin = require("./gameFunctions/checkForRoundWin");
const resetFlipRequestedTo = require("./gameFunctions/resetFlipRequestedTo");
const resetGameStateForNewRound = require("./gameFunctions/resetGameStateForNewRound");
const removeBetterCard = require("./gameFunctions/removeBetterCard");
const checkForElimination = require("./gameFunctions/checkForElimination");
const determineNextStarter = require("./gameFunctions/determineNextStarter");
const checkForGameWin = require("./gameFunctions/checkForGameWin");
const awardPointToBetter = require("./gameFunctions/awardPointToBetter");

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
    const thisGameState = allGameStates.find((gameState) => {
      return gameState.gameId === gameId;
    });

    // if gamestate found...
    if (thisGameState) {
      // prepare gamestate for the start of a new game
      startNewGame(thisGameState);
      // use io instance to pass unique censored gamestate to all players individually
      emitCensoredGameStates(thisGameState, io);
    } else {
      // emit there was an error
    }
  });

  socket.on("play-card", ({ cardId, gameId }) => {
    const userId = socket.handshake.query.userId;
    // find correct gameState to edit
    const thisGameState = allGameStates.find((gameState) => {
      return gameState.gameId === gameId;
    });

    if (thisGameState) {
      playCard(thisGameState, cardId);
      passTurnToNextPlayer(thisGameState);
      if (thisGameState.gamePhase === "set-round") {
        checkReadyForPlayOrBetPhase(thisGameState);
      }

      // use io instance to pass unique censored gamestate to all players individually
      emitCensoredGameStates(thisGameState, io);
    } else {
      // emit there was an error
    }
  });

  socket.on("initiate-betting", (gameId, numOfCards) => {
    const userId = socket.handshake.query.userId;

    // find correct gameState to edit
    const thisGameState = allGameStates.find((gameState) => {
      return gameState.gameId === gameId;
    });

    if (thisGameState) {
      initiateBetting(thisGameState, userId, numOfCards);
      checkForAllCardsBet(thisGameState, userId);
      passTurnToNextPlayer(thisGameState);
      emitCensoredGameStates(thisGameState, io);
    } else {
      // emit there was an error
    }
  });

  socket.on("raise-bet", (gameId, numOfCards) => {
    const userId = socket.handshake.query.userId;

    // find correct gameState to edit
    const thisGameState = allGameStates.find((gameState) => {
      return gameState.gameId === gameId;
    });

    if (thisGameState) {
      raiseBet(thisGameState, userId, numOfCards);
      checkForAllCardsBet(thisGameState, userId);
      passTurnToNextPlayer(thisGameState);
      emitCensoredGameStates(thisGameState, io);
    } else {
      //emit error
    }
  });

  socket.on("pass-on-bet", (gameId) => {
    const userId = socket.handshake.query.userId;

    // find correct gameState to edit
    const thisGameState = allGameStates.find((gameState) => {
      return gameState.gameId === gameId;
    });

    if (thisGameState) {
      foldHand(thisGameState, userId);
      passTurnToNextPlayer(thisGameState);
      checkReadyForBetterFlipPhase(thisGameState);
      emitCensoredGameStates(thisGameState, io);
    } else {
    }
  });

  socket.on("flip-card", (gameId) => {
    const userId = socket.handshake.query.userId;

    // find correct gameState to edit
    const thisGameState = allGameStates.find((gameState) => {
      return gameState.gameId === gameId;
    });

    if (thisGameState) {
      // flip card and emit back to clients
      flipCard(thisGameState, userId);
      thisGameState.flipButtonDisabled = true;
      emitCensoredGameStates(thisGameState, io);

      // after several seconds, check for impact of flip on
      // gameState and update accordingly, emit update to client.
      // this allows the flip modal to stay open for several seconds
      // after the flip, rather than close immediately on flip
      setTimeout(() => {
        checkForSkullOrRose(thisGameState, userId);
        checkForRoundWin(thisGameState, userId);
        resetFlipRequestedTo(thisGameState, userId);
        thisGameState.flipButtonDisabled = false;
        emitCensoredGameStates(thisGameState, io);
      }, 1800);
    }
  });

  // sent by highest better to initiate flip from another player
  socket.on("request-flip", (gameId, playerToFlipId) => {
    const userId = socket.handshake.query.userId;

    // find correct gameState to edit
    const thisGameState = allGameStates.find((gameState) => {
      return gameState.gameId === gameId;
    });

    thisGameState.flipRequestedTo = playerToFlipId;
    emitCensoredGameStates(thisGameState, io);
  });

  socket.on("remove-better-card", (gameId) => {
    // find correct gameState to edit
    const thisGameState = allGameStates.find((gameState) => {
      return gameState.gameId === gameId;
    });
    removeBetterCard(thisGameState);
    checkForElimination(thisGameState);
    determineNextStarter(thisGameState);
    emitCensoredGameStates(thisGameState, io);
  });

  socket.on("award-point", (gameId) => {
    const thisGameState = allGameStates.find((gameState) => {
      return gameState.gameId === gameId;
    });

    awardPointToBetter(thisGameState);
    checkForGameWin(thisGameState);
    determineNextStarter(thisGameState);
    emitCensoredGameStates(thisGameState, io);
  });

  socket.on("set-new-round", (gameId) => {
    const thisGameState = allGameStates.find((gameState) => {
      return gameState.gameId === gameId;
    });

    resetGameStateForNewRound(thisGameState);
    emitCensoredGameStates(thisGameState, io);
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
