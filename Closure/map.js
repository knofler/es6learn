const funcList = [
    function sum(head, mid, ...tail) {
        mid == undefined ? head : head += mid
        return tail.length == 0 ? head : sum(head, ...tail)
    },
    function multiple(head, mid, ...tail) {
        mid == undefined ? head : head *= mid
        return tail.length == 0 ? head : multiple(head, ...tail)
    },
    function substruct(head, mid, ...tail) {
        mid == undefined ? head : mid -= head
        return tail.length == 0 ? head : substruct(head, ...tail)
    }
]

//Higher order Functions
const mathConstructorFunction = function (count) {
    function genNum(count) {
        let list = []
        for (var v = 1; v <= count; v++) {
            list.push(v)
            //console.log(v)
        }
        return list
    }
    // return map function that will take all mapped functions as arguments and run with closures genNum function
    return function calcFunc(fn) {
        return fn(...genNum(count))
    }
}

// Call user function with the count to build the map function for array list of functions to be mapped
let calcFunc = mathConstructorFunction(115)

//console.log("get map is ", getmap(test))

console.log(funcList.map(calcFunc))