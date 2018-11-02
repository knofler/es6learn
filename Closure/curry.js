const _ = require('lodash');

//recursive sum
const recurSum = function (args) {
    var list = args
    console.log(typeof (args))
    if (args.length == 0) {
        // console.log("I am inside out call")
        return 0
    } else {
        // console.log(args[0])
        console.log("slice on args is ", args.slice(1))
        // console.log(args[0] + args.slice(1))
        return args[0] + recurSum(list.slice(1))
    }
}


console.log(recurSum([5, 78, 90]))