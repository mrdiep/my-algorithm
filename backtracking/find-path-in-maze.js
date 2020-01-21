
var a_maze = [
    [1, 0, 0 , 0, 0, 1, 2],
    [1, 0, 0 , 0, 0, 1, 0],
    [1, 1, 1 , 1, 0, 1, 0],
    [1, 0, 0 , 1, 0, 1, 0],
    [1, 0, 0 , 1, 1, 1, 0],
    [1, 0, 0 , 1, 0, 0, 0],
    [1, 1, 1 , 1, 0, 0, 0],
    [1, 0, 0 , 1, 1, 1, 0],
    [1, 0, 0 , 1, 0, 1, 0],
    [1, 0, 0 , 1, 0, 1, 0],
    [1, 0, 0 , 0, 0, 1, 0],
    [1, 0, 0 , 0, 0, 0, 0]
]

var result = [
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0]
]

var was_here = [
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0],
    [0, 0, 0 , 0, 0, 0, 0]
]

solve(a_maze, result, 0, 0);
console.log(result);

function solve(maze, result, x, y) {
   if (isMoveValidAt(maze, x , y)) {
      
       if (maze[x][y] === 2) {
        result[x][y] = 2;
        return true;
       }

        if (was_here[x][y]) return false;

       result[x][y] = 1; //try set
       was_here[x][y] = 1;

       console.log('try set :' + x + '-' + y )
       if (solve(maze, result, x + 1, y)) return true;
       if (solve(maze, result, x - 1, y)) return true;
       if (solve(maze, result, x, y + 1)) return true;
       if (solve(maze, result, x, y - 1)) return true;
       console.log('revert :' + x + '-' + y )
       result[x][y] = 0; //revert set, back-stack here
   }

   return false;
}

function isMoveValidAt(maze, x,y)
{
    return (x >= 0 && x < maze.length && y >= 0 && y < maze[0].length && (maze[x][y] == 1 || maze[x][y] == 2));
}