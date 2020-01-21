const minesweeper = (m) => {
  var tr = m.length;
  var tc = m[0].length;
  var rs = Array(tr).fill(0).map(x=>Array(tc).fill(0));
  for (var row = 0; row < tr; row++)
    for (var col = 0; col < tc; col++)
      if (m[row][col]) solve(row, col, rs);

  return rs;
}

const solve = (ri, ci, rs) => {
  for (var r of [ri-1, ri, ri+1].filter(x => x >= 0 && x < rs.length))
    for(var c of [ci-1, ci, ci+1].filter(x=> x >= 0 && x < rs[0].length))
      if (!(r === ri && c === ci)) rs[r][c]++;
}