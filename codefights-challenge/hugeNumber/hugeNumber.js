function hugeNumber(nums) {
  var results = [];
  
  for(var i = 0; i < nums.length;i++) {
   var state = [nums[i]];
   var arr = [...nums.slice(0, i), ...nums.slice(i + 1, nums.length)];
   solve(arr, results, state);
  }
  
  var max = 0;
  for(var num of results) {
    var parsedNumber = parseInt(num);
    if (parsedNumber > max) max =parsedNumber;
  }

  return max;
 }
 
 function solve(arr, results, state) {
  var arrayLength = arr.length;
  
  if (arrayLength === 0)
    results.push(state.join(''));

  for(var i = 0; i< arrayLength;i++) {
   state.push(arr[i]);
   solve([...arr.slice(0, i), ...arr.slice(i + 1, arrayLength)], results, state)
   state.pop();
  }
 }
 
 console.log(hugeNumber(["796", "7967", "7103"]));