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

// Route includes
const gameRouter = require("./routes/game.route");

// Routes
app.use("/api/game", gameRouter);

// Socket.io
io.on("connection", (socket) => {
  console.log(socket.handshake.query, "connected");

  socket.on("disconnect", (socket) => {
    console.log("disconnected");
  });
});

// Serve static files
app.use(express.static("build"));

server.listen(PORT, () => {
  console.log("listening on PORT 5000");
});
