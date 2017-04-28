$(function() {

function attachListeners() {}

var turn = 0

function doTurn() {
  turn ++
  updateState()
  checkWinner()
}

function player() {
  if (turn % 2 = 0) {
    "X"
  } else {
    "O"
  }
}

function updateState() {
  player()
}

function checkWinner() {
  // Checks if X or O is present in any of the following configurations:
  // Top row: 00, 01, 02
  // Middle row: 10, 11, 12
  // Bottom row: 20, 21, 22
  //
  // Left column: 00, 10, 20
  // Middle column: 01, 11, 21
  // Right column: 02, 12, 22
  //
  // Diagonal upper left: 00, 11, 22
  // Diagonal upper right: 02, 11, 20
}

function message() {}


})
