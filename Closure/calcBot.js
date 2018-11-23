"use strict"
//Define application functions

// #Add
function sum(head, mid, ...tail) {
    mid == undefined ? head : head += mid
    return tail.length == 0 ? head : sum(head, ...tail)
}

// Multiple
function multiple(head, mid, ...tail) {
    mid == undefined ? head : head *= mid
    return tail.length == 0 ? head : multiple(head, ...tail)
}
// Prime Number
function primeNumber(from, to) {
    let isPrime = 0;
    if (from < to) {
        return 1
    }
    if (from > 2) {
        for (let i = 2; i < from - 1; i++) {
            if (from % i < 1) {
                isPrime = 1
            }
        }
    }

    if (isPrime == 0) {
        console.log("Prime number is ", from)
    }
    return primeNumber(from - 1, to)
}

//Helper Functions
function genNum(count) {
    let list = []
    for (var v = 1; v <= count; v++) {
        list.push(v)
        //console.log(v)
    }
    return list
}

function filterNumbers() {
    return Array.prototype.filter.call(args,
        element => typeof element === 'number'
    );
}

//user Defined Functions
function sumRecur({
    helperFn,
    calcFn
}) {
    return function publicFn(nums) {
        nums = helperFn(nums)
        return typeof (nums) == "number" ? calcFn(nums) : calcFn(...nums)
    }
}

//User function call
var calculate = sumRecur({
    helperFn: genNum,
    calcFn: multiple
})

console.log(calculate(21))
console.log(primeNumber(100, 1))