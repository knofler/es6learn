function add(x, y) {
    return x + y
}

function constant(v) {
    return function () {
        return v;
    }
}

//reduce a list to smaller list reducing duplicate digits
const sum = [1, 2, 3, 4, 5, 6, 3, 5, 6, 325, 3, 5, ].reduce(function (newlist, n) {
    if (newlist.indexOf(n) == -1) newlist.push(n)
    return newlist
}, [])

//reduce list using functions from outside
let getData = [1, 2, 3, 4].reduce(function (a, b) {
    return add(a, b)
});


function add2(fn0, fn1) {
    return fn0() + fn1()
}


function addn([fn0, fn1, ...fns]) {
    if (fns.length > 0) {
        return addn(
            [
                function () {
                    return add2(fn0, fn1)
                },
                ...fns
            ])
    }
    return add2(fn0, fn1)

}
console.log(addn([constant(4), constant(5), constant(23), constant(6), constant(8)]))

console.log(sum)
console.log(getData)