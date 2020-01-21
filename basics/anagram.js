//interview: dectect how many difference of 2 text
//ex: abc and acb => result is 0
//abc and acd => result is 1

function anagram(a, b) {
  let pairResult = a.split('').reduce((a, e) => {
    a[e] = a[e] || { inA: 0, inB: 0 };
    a[e].inA++;

    return a;
  }, {});

  pairResult = b.split('').reduce((a, e) => {
    a[e] = a[e] || { inA: 0, inB: 0 };
    a[e].inB++;

    return a;
  }, pairResult);
  
  //pairResult for sample ab and bc: { "a" : { inA: 1, inB: 0 } , "b" : { inA: 1, inB: 1 } , "c" : { inA: 0, inB: 1 } }

  return Object.values(pairResult)
    .map(x=> Math.abs(x.inA - x.inB))
    .reduce((a,e) => a += e, 0) / 2;
}

console.log(anagram(
  "abcdefhhhh",
  "abdeeggggf"
)); //expect = 5: c h h h h