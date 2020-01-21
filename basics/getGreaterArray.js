//Example: a  =[1,2,3], b = [1,2] => b > a, because the b have the length smaller than a.length
//a = [1,2,3], b = [2,3] => output is array b because first element of b is greater than a;
function sort(a,b) {
  var i = -1;
  var j = -1;
  while (++i < a.length && ++j < b.length) {
    if (a[i] === b[j])
      continue;

    return a[i] > b[j] ? 1 : 2;
  }

  return a.length > b.length ? 1 : 2;
}

console.log(sort([3,2,3], [3,3]))