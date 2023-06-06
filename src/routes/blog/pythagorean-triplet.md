---
title: Pythagorean triplets
date: 2023-6-5
author: Tyler
---


From [project euler question 9](https://projecteuler.net/problem=9):

> A Pythagorean triplet is a set of three natural numbers, `A<B<C`, for which, `a^2+b^2=c^2`.
> 
> For example, 3^2+4^2=9+16=25=5^2.
> 
> There exists exactly one Pythagorean triplet for which `a+b+c=1000`.  
> 
> Find the product `ABC`.


### Code that is used for all versions
I use this code across all three versions, It is where I define my target (this is useful for debugging and running checking performance at larger size) and the shared code for checking if a triplet is a Pythagorean triplet.

```js
const checkIfPythagTriplet = (a, b, c) => (c * c) === (a * a) + (b * b)
const targetSum = 1000
```



### First version
My first goal is always get something that solves the problem. You learn a lot through the through making mistakes and getting something to show. In hindsight this one is horrible. I am not totally sure what big O notation is, but I think this is O^3. If the target is 1000 then the inner loop runs `165,170,996` times. That is the point of solving the problem scrappy at first and then improving though.

```js
let a = 1;
let b = 1;
let c = 2;
for (c = 2; c + b + a <= targetSum; c++) {
    for (b = 1; b < c; b++) {
        for (a = 1; a < b; a++) {
            if (a + b + c === targetSum && checkIfPythagTriplet(a, b, c)) {
                console.log(`a: ${a},b: ${b},c:${c}, product: ${a + b + c}`);
            }
        }
        a = 1;
    }
    b = 1;
}
```





### Second version
One thing I realized during the first pass is that I don't need to cycle ALL of `c` instead I can just do `c = targetsum-a-b` this removes one of my loops, so now we are just o^2 with that simple fix. Still not great, but it works. I also stop checking `a` when it reaches ~1/3 of the `targetsum` and `b` when it reaches ~1/2 of the `targetSum`. This one only runs the inner check 81675 times. or ~2000x better. Headed in the right direction
  
```js
for (let a = 3; a < (targetSum - 3) / 3; a++) {
    for (let b = a + 1; b < (targetSum - a - 1) / 2; b++) {
        const c = targetSum - a - b;
        if (checkIfPythagTriplet(a, b, c)) {
            console.log(`HIT: a: ${a},b: ${b},c:${c}, product: ${a + b + c}`);
        }
    }
}
```


  
### Third version
I wanted to see if I could solve this problem with recursion. This version takes a lot of lessons learned from the second version to solve the problem, but perhaps comes with some downsides I didn't expect. There are two major things I dislike about this compared to the previous. 
1. Magic numbers. If you look at the lines where I recursively call the number I am setting `c` as `targetSum-a-b-1` and `targetSum - a - a - 3` the `-1` and `-3` are to offset the counts going up. I feel like this is a little unintuitive looking at a glance. 
2. I need to wrap some of the recursive calls in a `setTimeout(,0)` to allow the engine to grab control for a moment. This makes the program run slower, but allows it to not exceed the max stack size. This might not be an issue with other languages, but it looks gross in JS.
Because of those tradeoffs I don't think recursion is the right choice.



<!-- <code class="prettyprint" language="lang-js"> -->

```js
const lookForPythagTriplet = (a, b, c, targetSum) => {
    if (checkIfPythagTriplet(a, b, c)) {
        console.log(`HIT: a: ${a},b: ${b},c:${c}, product: ${a + b + c}`);
    }
  
    if (b < (targetSum - a - 1) / 2) {
        lookForPythagTriplet(a, b + 1, targetSum - a - b - 1, targetSum)

    } else if (a < (targetSum - 3) / 3) {
        // this set timeout needs to stop stack size max limits
        setTimeout(function () {
            lookForPythagTriplet(a + 1, a + 2, targetSum - a - a - 3, targetSum)
        }, 0);
    }
}

lookForPythagTriplet(2, 3, 5, targetSum)
```

<!-- </code> -->