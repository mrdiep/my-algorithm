Forrest Gump runs in a circle shaped road. Because he will run too much, he wants to have breaks several times. He loves shrimp too much, so he wants to eat shrimps to recover his energy. There is `n` restaurants on that road where Forrest will have breaks. Running one mile he uses `1` unit of energy and eating `1` shrimp he recovers `1` unit of energy. At the start Forrest have `0` units of energy. Units of energy he have can not be negative. Now he wants to know where to start to have enough energy to run one lap. 
**Example** 
* For `dist = [1, 2, 3]` and `shrimp = [1, 2, 3]`, the output should be `runForerstRun(dist, shrimp) = 1`. All three points satisfy the condition so the minimal one is the answer. 

* For `dist = [1, 1, 1]` and `shrimp = [0, 0, 3]`, the output should be `runForerstRun(dist, shrimp) = 3`. If he starts from `1<sup>st</sup>` or `2<sup>nd</sup>` restaurant, he can't run, because he have no energy. So he starts from `3<sup>rd</sup>` one, fills his energy to `3` units and runs whole circle. 

**Input/Output** 
* **[time limit] 4000ms (js)** 
* **[input] array.integer dist** 
Distances between `i<sup>th</sup>` and `(i + 1)<sup>th</sup>` restaurants. The same as `dist[i]` he have to run from `i<sup>th</sup>` restaurant to reach the next one. _Guaranteed constraints:_ `2 ≤ dist.length ≤ 10<sup>6</sup>`, `1 ≤ dist[i] ≤ 10<sup>9</sup>`. 
* **[input] array.integer shrimp** Maximum number of shrimps Forrest can eat in `i<sup>th</sup>` restaurant. _Guaranteed constraints:_ `shrimp.length = dist.length`, `0 ≤ shrimp[i] ≤ 10<sup>9</sup>`, `sum(shrimp) = sum(dist)`. 
* **[output] integer** Index of the restaurant to start from. If there are several answers, return the smallest one. 
More detailed: https://codefights.com/challenge/BBaA2sx6hpWcCkWvN