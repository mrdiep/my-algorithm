function runForerstRun(dist, shrimp) {
  var circleLength = dist.length;

  for(let index =0; index < circleLength; index++) {
    if (canForerstRunAsCircular(index, dist, shrimp)) return index + 1;
  }
}

function canForerstRunAsCircular(index, dist, shrimp) {
  var energy = runCounter = 0, currentStartIndex = index;
  var circleLength = dist.length;
  while(runCounter < circleLength) {
    
    energy += shrimp[currentStartIndex] - dist[currentStartIndex];
    
    if (energy < 0)
      return 0;

    currentStartIndex = ++currentStartIndex % circleLength;
    runCounter++;
  }
  
  return runCounter === circleLength;
}