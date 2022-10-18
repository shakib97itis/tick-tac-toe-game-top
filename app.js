(function () {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let currentPlayer = "X";

  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  let running = true;

  // Cache DOM
  const board = document.getElementById("board");
  const cells = board.querySelectorAll(".cell");
  const resetBtn = document.getElementById("reset");
  const statusBoard = document.getElementById("board-status");

  // Initialize game
  cells.forEach((cell) => {
    cell.addEventListener("click", cellClicked, { once: true });
  });
  resetBtn.addEventListener("click", resetGame);
  updateMessage(`${currentPlayer}'s Turn`);

  function cellClicked(e) {
    if (running) {
      updateGameBoard(e);
      checkWinner();
      swapTurn();
    }
  }

  function updateGameBoard(e) {
    let DOMlocation = e.target;
    let boardLocation = e.target.dataset.cell;
    gameBoard[boardLocation] = currentPlayer;
    DOMlocation.innerText = currentPlayer;
    console.log(gameBoard);
  }

  function updateMessage(message) {
    statusBoard.innerText = message;
  }

  function checkWinner() {
    for (let i = 0; i < winCondition.length; i++) {
      let conA = winCondition[i][0];
      let conB = winCondition[i][1];
      let conC = winCondition[i][2];

      if (
        (gameBoard[conA] === currentPlayer) &
        (gameBoard[conB] === currentPlayer) &
        (gameBoard[conC] === currentPlayer)
      ) {
        console.log("something");
        updateMessage(`${currentPlayer} is winner`);
        running = false;
        return;
      }
    }

    if (!gameBoard.includes("")) {
      updateMessage("Game is Draw");
      running = false;
      return;
    }
  }

  function swapTurn() {
    if (running) {
      currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
      6;
      updateMessage(`${currentPlayer}'s turn`);
    }
  }

  function resetGame() {
    cells.forEach((cell) => {
      cell.innerText = "";
      cell.addEventListener("click", cellClicked, { once: true });
    });

    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = "";
    }

    currentPlayer = "X";
    updateMessage(`${currentPlayer}'s turn`);
    running = true;
  }
})();
