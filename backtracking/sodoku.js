var initBoard = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0],
]

solve(initBoard)
console.log(initBoard);

function solve(board) {
  var { x, y, isEmpty } = findEmptyCell(board);
  if (isEmpty) return true;

  for (let i = 1; i <= 9; i++) {
    if (canSet(board, i, x, y)) {
      board[x][y] = i;

      if (solve(board))
        return true;

      else board[x][y] = 0; //back-track here
    }
  }

  return false;
}

function findEmptyCell(board) {
  for (let x = 0; x < board.length; x++)
    for (let y = 0; y < board.length; y++)
      if (!board[x][y]) return { x, y }
  return { isEmpty: true };
}

function canSet(board, number, x, y) {
  return !invalidRow(board, x, number) &&
    !invalidCol(board, y, number) &&
    !invalidSquare(board, number, x - x % 3, y - y % 3);
}

function invalidRow(board, x, number) {
  for (let y = 0; y < board.length; y++)
    if (board[x][y] === number) return true;
  return false;
}

function invalidCol(board, y, number) {
  for (let x = 0; x < board.length; x++)
    if (board[x][y] === number) return true;
  return false;
}

function invalidSquare(board, number, locNumberX, locNumberY) {
  for (var x = 0; x < 3; x++)
    for (var y = 0; y < 3; y++)
      if (board[x + locNumberX][y + locNumberY] === number) return true;
  return false;
}