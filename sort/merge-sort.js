console.log(sort([2,3,7,1,9,3,7,5,2,9,5,7,3,8,3,0]));
//console.log(sort([4,3]))
function mergeSort(a) {
  if (a.length === 1)
    return a;

  if (a.length === 2)
    return a[0] < a[1] ? [a[0], a[1]] : [a[1], a[0]];

  var rightArr = a.splice(a.length / 2);
  var leftArr = a;

  return merge(sort(leftArr), sort(rightArr));
}

function merge(arr1,arr2) {
  var newArr = [];
  var i = j = 0;

  while(i < arr1.length && j < arr2.length) {
    newArr.push(arr1[i] < arr2[j] ? arr1[i++] : arr2[j++]);
  }

  while (i<arr1.length) newArr.push(arr1[i++]);
  while (j<arr2.length) newArr.push(arr2[j++]);

  return newArr;
}