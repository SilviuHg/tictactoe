const playerFactory = (mark) => {
  return { mark };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setMark = (index, mark) => {
    board[index] = mark;
  };

  const getCell = (index) => {
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { setMark, getCell, reset };
})();

const gameController = (() => {
  const playerOne = playerFactory("X");
  const playerTwo = playerFactory("O");
  let isOver = false;
  let round = 1;

  let activePlayer = playerOne;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const getActivePlayer = () => activePlayer;

  const playRound = (cellIndex) => {
    // Restrict placing a mark over another mark or restrict placing a mark if the game is over
    if (gameBoard.getCell(cellIndex) !== "" || getIsOver()) return;
    // Place a mark for the current player
    gameBoard.setMark(cellIndex, getActivePlayer().mark);
    checkWinner();
    // Check for a draw
    if (round === 10) {
      displayController.setGameResult("Draw");
    }
  };

  const reset = () => {
    activePlayer = playerOne;
    isOver = false;
    round = 1;
  };

  const checkWinner = () => {
    if (
      gameBoard.getCell(0) === gameBoard.getCell(1) &&
      gameBoard.getCell(1) === gameBoard.getCell(2) &&
      gameBoard.getCell(2) === getActivePlayer().mark
    ) {
      displayController.setGameResult(getActivePlayer().mark);
      isOver = true;
    } else if (
      gameBoard.getCell(3) === gameBoard.getCell(4) &&
      gameBoard.getCell(4) === gameBoard.getCell(5) &&
      gameBoard.getCell(5) === getActivePlayer().mark
    ) {
      displayController.setGameResult(getActivePlayer().mark);
      isOver = true;
    } else if (
      gameBoard.getCell(6) === gameBoard.getCell(7) &&
      gameBoard.getCell(7) === gameBoard.getCell(8) &&
      gameBoard.getCell(8) === getActivePlayer().mark
    ) {
      displayController.setGameResult(getActivePlayer().mark);
      isOver = true;
    } else if (
      gameBoard.getCell(0) === gameBoard.getCell(3) &&
      gameBoard.getCell(3) === gameBoard.getCell(6) &&
      gameBoard.getCell(6) === getActivePlayer().mark
    ) {
      displayController.setGameResult(getActivePlayer().mark);
      isOver = true;
    } else if (
      gameBoard.getCell(1) === gameBoard.getCell(4) &&
      gameBoard.getCell(4) === gameBoard.getCell(7) &&
      gameBoard.getCell(7) === getActivePlayer().mark
    ) {
      displayController.setGameResult(getActivePlayer().mark);
      isOver = true;
    } else if (
      gameBoard.getCell(2) === gameBoard.getCell(5) &&
      gameBoard.getCell(5) === gameBoard.getCell(8) &&
      gameBoard.getCell(8) === getActivePlayer().mark
    ) {
      displayController.setGameResult(getActivePlayer().mark);
      isOver = true;
    } else if (
      gameBoard.getCell(0) === gameBoard.getCell(4) &&
      gameBoard.getCell(4) === gameBoard.getCell(8) &&
      gameBoard.getCell(8) === getActivePlayer().mark
    ) {
      displayController.setGameResult(getActivePlayer().mark);
      isOver = true;
    } else if (
      gameBoard.getCell(2) === gameBoard.getCell(4) &&
      gameBoard.getCell(4) === gameBoard.getCell(6) &&
      gameBoard.getCell(6) === getActivePlayer().mark
    ) {
      displayController.setGameResult(getActivePlayer().mark);
      isOver = true;
    } else {
      round++;
      switchPlayerTurn();
      displayController.setTurnMessage(
        `Player ${getActivePlayer().mark}'s turn`
      );
    }
  };

  const getIsOver = () => {
    return isOver;
  };

  return {
    playRound,
    reset,
  };
})();

const displayController = (() => {
  const cellElements = document.querySelectorAll(".cell");
  const roundMessage = document.querySelector(".message");
  const restartButton = document.querySelector(".restart-button");

  cellElements.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      gameController.playRound(parseInt(e.target.dataset.index));
      updateScreen();
    });
  });

  // Render the array elements to the screen
  const updateScreen = () => {
    for (let i = 0; i < cellElements.length; i++) {
      cellElements[i].textContent = gameBoard.getCell(i);
    }
  };

  const setGameResult = (winner) => {
    if (winner === "Draw") {
      setTurnMessage("It's a draw!");
    } else {
      setTurnMessage(`Player ${winner} has won!`);
    }
  };

  const setTurnMessage = (message) => {
    roundMessage.textContent = message;
  };

  restartButton.addEventListener("click", (e) => {
    gameBoard.reset();
    gameController.reset();
    updateScreen();
    setTurnMessage("Player X's turn");
  });

  return {
    setTurnMessage,
    setGameResult,
  };
})();
