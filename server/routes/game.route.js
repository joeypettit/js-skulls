const express = require('express');
const router = express.Router();
const newGame = require('../gameFunctions/newGame');
let gameState = require('../gameState/gameState');
const getPlayerState = require('../gameFunctions/getPlayersState');
const newRound = require('../gameFunctions/newRound');

router.get('/new/', (req, res) => {
  gameState = newGame();
  res.send(gameState);
});

router.get('/player/:playerId', (req, res) => {
  const playerId = req.params.playerId;
  const thisPlayersState = getPlayerState(playerId, gameState);
  res.send(thisPlayersState);
});

// prep game state for new round
router.get('/newround/', (req, res) => {
  newRound(gameState);
})


router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
