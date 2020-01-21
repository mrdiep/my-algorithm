function wordBoggle(board, words) {
  let results = [];

  for (const startFrom of getStartFrom(board, words)) {
    const row = startFrom[0];
    const col = startFrom[1];

    const startWords = [board[row][col]];
    const markerBoard = genEmptyBoard(board);
    markerBoard[row][col] = true;

    solve(board, words, results, markerBoard, startFrom, startWords);
  }
  
  results = Object.keys(results.reduce((a, e) => { a[e] = 1; return a;}, {}));
  results.sort();

  return results;
}

function solve(board, words, results, marker, startFrom, state) {
  const posRow = startFrom[0];
  const posCol = startFrom[1];
  const boardRowMaxLength = board.length - 1;
  const boardColMaxLength = board[0].length - 1;

  //search arround number as square of 9
  for (let row = posRow - 1; row <= posRow + 1; row++) {
    for (let col = posCol - 1; col <= posCol + 1; col++) {

      var isValidPosition = 0 <= row && row <= boardRowMaxLength && 0 <= col && col <= boardColMaxLength;
      if (!isValidPosition) continue;
      if (marker[row][col]) continue;

      var word = board[row][col];
      var {
        canMake,
        isFullWord
      } = canMakeWord(state, words, word);

      if (canMake) {
        marker[row][col] = true;
        state.push(word);
        if (isFullWord) {
          results.push(state.join(''))
        }

        solve(board, words, results, marker, [row, col], state);

        state.pop(); //state back-track
        marker[row][col] = false; //state back-track
      }
    }
  }
}

function getStartFrom(board, words) {
  const arr = [];
  const boardRowMaxLength = board.length - 1;
  const boardColMaxLength = board[0].length - 1;

  for (let row = 0; row <= boardRowMaxLength; row++) {
    for (let col = 0; col <= boardColMaxLength; col++) {
      arr.push([row, col]);
    }
  }

  return arr;
}


function genEmptyBoard(board) {
  const rowLength = board.length;
  const colLength = board[0].length;
  const arr = [];
  for (let row = 0; row < rowLength; row++) {
    const arr2 = [];
    arr.push(arr2);
    for (let col = 0; col < colLength; col++) {
      arr2.push(false);
    }
  }

  return arr;
}

function canMakeWord(state, words, word) {
  const newWord = state.join('') + word;
  if (words.indexOf(newWord) !== -1) return {
    canMake: true,
    isFullWord: true
  }

  if (words.findIndex(w => w.startsWith(newWord)) !== -1) return {
    canMake: true,
    isFullWord: false
  }

  return {
    canMake: false,
    isFullWord: false
  }
}

console.log(wordBoggle([
  ["S","A"], 
  ["M","O"], 
  ["W","E"], 
  ["H","R"]],
[
  "SOME", 
  "DRONE", 
  "WHERE", 
  "SOMEWHERE", 
  "WORD", 
  "WE", 
  "MORE"]))