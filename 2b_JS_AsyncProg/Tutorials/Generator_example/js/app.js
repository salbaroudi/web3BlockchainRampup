"use strict";

//We can set this up with a generator.
const fibonacci = function *(len, nums = [0,1]) {
    let num1 = nums[0],
        num2 = nums[1],
        next,
        cnt = 2;

    //Where to put the yield?
    while (cnt < len) {
        next = num1 + num2;
        num1 = num2;
        num2 = next;
        nums.push(next);
        cnt++;
        yield nums;
    }

    return nums;
};

//What benefit do we get from making this a generator??

// We can define fibonacci (VERY LARGE NUMBER), and run it incrementally
// Without blowing up our memory. With a regular funciton, we could crash
// the JS engine with ill-conditioned or exponential calcualtions.
