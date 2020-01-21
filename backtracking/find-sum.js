const removeDuplicatedElements = arr => Object.keys(arr.reduce((a, e) => { a[e] = 1; return a; }, {})).map(x => Number.parseInt(x));

function combinationSum(arr, num) {
    if (!arr.length) return [];

    var result = [];

    solve(removeDuplicatedElements(arr), num, result);

    return result;
}

function solve(arr, num, result = [], sum = 0, state = []) {
    for (let i = 0; i < arr.length; i++) {
        var value = arr[i];
        if (sum + value > num) continue;

        sum += value; //try set
        state.push(value); //try set

        if (sum === num) {
            result.push([...state]);
        } else {
            solve(arr.slice(i), num, result, sum, state);
        }

        state.pop(); //back-track
        sum -= value; //back-track
    }
}

//Example:
//For a = [2, 3, 5, 9] and sum = 9, the output should be
//combinationSum(a, sum) = "(2 2 2 3)(2 2 5)(3 3 3)(9)".