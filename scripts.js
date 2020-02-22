(() => {

(function setBoard() {
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
    BOARD.appendChild(GAME_SPACE);
  }
})();

function boardFactory() {

}

})();
