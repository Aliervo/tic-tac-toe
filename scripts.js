(function boardSetup() {
  const BOARD = document.querySelector(".gameboard");
  const CELL_NAMES = new Map([
    [9,"a3"],[8,"b3"],[7,"c3"],
    [6,"a2"],[5,"b2"],[4,"c2"],
    [3,"a1"],[2,"b1"],[1,"c1"]
  ]);

  for (let i = 9; i > 0; i--) {
    const GAME_SPACE = document.createElement("div");
    GAME_SPACE.classList.add("gamespace");
    GAME_SPACE.setAttribute("id", CELL_NAMES.get(i));
    GAME_SPACE.addEventListener("click", e => {takeTurn(gameBoard, PLAYERS,
      e.target.id)});
    BOARD.appendChild(GAME_SPACE);
  }
})();

const gameBoard = ( (a1=null, a2=null, a3=null,
                     b1=null, b2=null, b3=null,
                     c1=null, c2=null, c3=null) => {
  return {a1, a2, a3, b1, b2, b3, c1, c2, c3};
})();

function playerFactory(name, symbol) {
  function setSymbol(s) {this.symbol = s};
  return {name, symbol, setSymbol};
}

const PLAYERS = [playerFactory("p1", "X"), playerFactory("p2", "O")];

function takeTurn(board, players, space) {
  board[space] = board[space] ? board[space] : players[Object.values(board)
    .filter(value => value === null).length % 2].symbol;
  renderToBoard(board);
  checkWin(board);
}

function renderToBoard(board) {
  const SPACES = document.querySelectorAll(".gamespace");
  for (let i = SPACES.length; i > 0; i--) {
    const SPACE = SPACES[i - 1];
    SPACE.textContent = board[SPACE.id];
  }
}

function checkWin(board) {
  const SYMBOL_ONE = Object.keys(board).filter(space => board[space] === "X");
  const SYMBOL_TWO = Object.keys(board).filter(space => board[space] === "O");
  const UNCLAIMED  = Object.keys(board).filter(space => board[space] === null);
  const WIN_CONDITIONS = [["a1", "a2", "a3"],
                          ["a1", "b1", "c1"],
                          ["b1", "b2", "b3"],
                          ["a2", "b2", "c2"],
                          ["a1", "b2", "c3"],
                          ["a3", "b2", "c1"],
                          ["c1", "c2", "c3"],
                          ["a3", "b3", "c3"]];

  WIN_CONDITIONS.forEach(condition => {
    if (condition.every(space => SYMBOL_ONE.includes(space))) {
      console.log("X wins!");
    } else if (condition.every(space => SYMBOL_TWO.includes(space))) {
      console.log("O wins!");
    } else if (UNCLAIMED.length === 0) {
      console.log("Tie!");
    }
  });
}
