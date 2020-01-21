//put N chess queens on an N×N chessboard so that no each queens attack each other
var board = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0]
];

//should result is
//   [ 1, 0, 0, 0, 0, 0, 0, 0 ]
//   [ 0, 0, 0, 0, 0, 0, 1, 0 ]
//   [ 0, 0, 0, 0, 1, 0, 0, 0 ]
//   [ 0, 0, 0, 0, 0, 0, 0, 1 ]
//   [ 0, 1, 0, 0, 0, 0, 0, 0 ]
//   [ 0, 0, 0, 1, 0, 0, 0, 0 ]
//   [ 0, 0, 0, 0, 0, 1, 0, 0 ]
//   [ 0, 0, 1, 0, 0, 0, 0, 0 ]

solve(board, 0);
console.log(board);

//loop each col
function solve(board, colIndex) {
    if (colIndex === board.length) return true;

    for(var rowIndex = 0; rowIndex < board.length;rowIndex++) {
        if (canPutAQueenAt(board, rowIndex, colIndex)) {
            board[rowIndex][colIndex] = 1;

            if (solve(board, colIndex + 1)) return true;

            board[rowIndex][colIndex] = 0; //reset
        }
    }

    return false;
}

function canPutAQueenAt(board, rowIndex, colIndex)
{
    var i, j;
 
    for (i = 0; i < colIndex; i++)
        if (board[rowIndex][i])
            return false;
 
    for (i=rowIndex, j=colIndex; i>=0 && j>=0; i--, j--)
        if (board[i][j])
            return false;

    for (i=rowIndex, j=colIndex; j>=0 && i<board.length; i++, j--)
        if (board[i][j])
            return false;
    return true;
}