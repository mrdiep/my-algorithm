
console.log(solve([
    [0, 1, 1, 1], //node 1: connect to node 2, 3, 4
    [1, 0, 1, 0], //node 2: connect to node 1, 3, so on for node 3, 4
    [1, 1, 0, 1], 
    [1, 0, 1, 0],
], 3)); 
//result is : colorIndex [ 1, 2, 3, 2 ]

function solve(graph, numberOfColor) {
    var result = new Array(graph.length + 1).join('0').split('');

    if (coloring(graph, numberOfColor, result, 0)) {
        return result;
    }

    return [];
}

function coloring(graph, numberOfColor, resultChain, resultNodeLocation) {
  if (resultNodeLocation === graph.length)
      return true; //find all path

  for(let colorIndex = 1; colorIndex <= numberOfColor; colorIndex++) { //loop for each step in the current path
    console.log('check the step at node ['+ resultNodeLocation +'] is valid or not for color value: ' + colorIndex);
    if (isResultChainValid(graph, resultChain, colorIndex, resultNodeLocation)) { // if next put is valid, try set and move next
        resultChain[resultNodeLocation] = colorIndex; //try set
        console.log('try set at node [' + (resultNodeLocation + 1) + '] color : ' + colorIndex);
        if (coloring(graph, numberOfColor, resultChain, resultNodeLocation + 1)) return true;

        resultChain[resultNodeLocation] = 0; //revert, back-traking here
        console.log('revert setted value at node [' + (resultNodeLocation + 1) + '] color : ' + colorIndex);
    }
  }

  return false;
}


function isResultChainValid(graph, resultChain, colorIndex, resultNodeLocation) {
    for(var i = 0;i < graph[0].length;i++) {
        if (graph[resultNodeLocation][i] === 1 //check the connected node
        && resultChain[i] === colorIndex) //check connected node must diff to resultNode
          return false;
    }

    return true;
}
