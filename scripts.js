(function domSetup() {
  const board = document.querySelector(".gameboard");

  for (let i = 0; i < 9; i++) {
    const gameSpace = document.createElement("div");
    gameSpace.classList.add("gamespace");
    gameSpace.setAttribute("id", `space${i}`);
    gameSpace.addEventListener("click", e => {
      game.handleEvent(e.target.id);
    });
    board.appendChild(gameSpace);
  }
})();

function playerFactory(name, symbol) {
  function setSymbol(s) {this.symbol = s};
  return {name, symbol, setSymbol};
}

function gameFactory(playerOne, playerTwo) {
  const players = [playerOne, playerTwo];
  const board = Array(9);
  let currentPlayer = players[0];
  function turn(move) {
    board[move[5]] = currentPlayer;
    document.querySelector(`#${move}`).textContent = currentPlayer;
    victoryCheck(move) ? endGame(currentPlayer) : currentPlayer = players[(players.indexOf(currentPlayer) + 1) % 2];
  }

  function endGame(winner) {
    currentPlayer = "ended";
    winner === "Draw" ? console.log("It's a draw!") : console.log(`${winner} wins!`);
  }

  function handleEvent(gamespace) {
    return board[gamespace[5]] || currentPlayer === "ended" ? null : turn(gamespace);
  }

  function victoryCheck(lastMove) {
    if (board.filter(space => !!space).length < 5) {
      return false;
    } else {
      let haveWinner;
      switch (+lastMove[5]) {
        case 0:
          haveWinner = (board[0] === board[1] && board[1] === board[2] ||
                        board[0] === board[3] && board[3] === board[6] ||
                        board[0] === board[4] && board[4] === board[8] );
          break;
        case 1:
          haveWinner = (board[1] === board[0] && board[1] === board[2] ||
                        board[1] === board[4] && board[4] === board[7] );
          break;
        case 2:
          haveWinner = (board[2] === board[1] && board[1] === board[0] ||
                        board[2] === board[5] && board[5] === board[8] ||
                        board[2] === board[4] && board[4] === board[6] );
          break;
        case 3:
          haveWinner = (board[3] === board[0] && board[0] === board[6] ||
                        board[3] === board[4] && board[4] === board[5] );
          break;
        case 4:
          haveWinner = (board[4] === board[0] && board[0] === board[8] ||
                        board[4] === board[1] && board[1] === board[7] ||
                        board[4] === board[2] && board[2] === board[6] ||
                        board[4] === board[3] && board[3] === board[5] );
          break;
        case 5:
          haveWinner = (board[5] === board[2] && board[2] === board[8] ||
                        board[5] === board[4] && board[4] === board[3] );
          break;
        case 6:
          haveWinner = (board[6] === board[3] && board[3] === board[0] ||
                        board[6] === board[4] && board[4] === board[2] ||
                        board[6] === board[7] && board[7] === board[8] );
          break;
        case 7:
          haveWinner = (board[7] === board[4] && board[4] === board[1] ||
                        board[7] === board[6] && board[6] === board[8] );
          break;
        case 8:
          haveWinner = (board[8] === board[5] && board[5] === board[2] ||
                        board[8] === board[4] && board[4] === board[0] ||
                        board[8] === board[7] && board[7] === board[6] );
          break;
      };
      return !haveWinner && board.filter(space => !!space).length == 9 ? endGame("Draw") : haveWinner;
    };
  }

  return {handleEvent};
}

let game = gameFactory("X", "O");

/* Now I am thinking that I need a few objects for data storage.  A game object
*  to hold the data for each indiviual game, including the players and the board,
*  perhaps with a UUID so each game can be stored and retrieved.
*  The AI will be handled by a funciton that simply returns a move.
*  It seems most efficient to check for wins using firstIndexOf() to eliminate
*  a few possibilities before brute force checking.*/
