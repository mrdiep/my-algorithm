function checker(grid) {
    for(var i = 0;i<9;i++) {
        if (!isValidRow(grid, i)
           || !isValidCol(grid, i)
           || !isValidSquare(grid, i))
            
            return false;
    }
      
      return true;
  }
  
  function isValidRow(grid, rowIndex) {
      var set = new Set();
      
      for(var colIndex = 0;colIndex < grid.length;colIndex++)
          if (!addSet(set, grid[rowIndex][colIndex])) return false;
      
      return true;
  }
  
  function isValidCol(grid, colIndex) {
      var set = new Set();
      
      for(var rowIndex = 0;rowIndex < grid.length;rowIndex++)
          if (!addSet(set, grid[rowIndex][colIndex])) return false;
      
      return true;
  }
  
  function isValidSquare(grid, squareIndex) {
       var set = new Set();
      var startRow = squareIndex - squareIndex % 3;
      var startCol = (squareIndex * 3 ) % 9;
      for(var rowIndex = startRow; rowIndex < startRow + 3;rowIndex++)
          for(var colIndex = startCol; colIndex < startCol + 3;colIndex++)
             if (!addSet(set, grid[rowIndex][colIndex])) return false;
      
      return true;
  }

  function addSet(set, value) {
    var num = parseNumber(value);
    if (!isNaN(num) && num > 0) {
        if (set.has(value))
            return false;
        set.add(value);
    }
    
    return true;
}