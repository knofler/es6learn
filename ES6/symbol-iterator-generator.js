//Symbol

var x = Symbol('whatever is name')

var obj = {
	id: 42
	//[x]:'secret value I am putting here'

}

obj[x] ="this is symbol value "

console.log(obj);
console.log("getOwnPropertyNames ",Object.getOwnPropertyNames(obj))
console.log("getOwnPropertySymbols ",Object.getOwnPropertySymbols(obj))


//iterator

var arr = [1,2,3], 
	str = 'pencil';

var [x,y,...rest] = [...str]

console.log("first 2 charecter of str is ", x,y)
console.log('And rest is ', rest)
var it = arr[Symbol.iterator]();

console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())

//for loop
	for (let v=0;v<arr.length;v++){
		console.log("for", v)
	}
// for in loop 
	for (let k in str){
		console.log("for in ", k, " =>", str[k])
	}
//for of loop
	for (let v of str){
		console.log("for of ", v)
	}

var newArr = "This is a string but will be treated as an array and iterate over using both for of and basic iterator function";

var itMe = newArr[Symbol.iterator]();

for (let v in newArr ) console.log(itMe.next())

//for (let v of newArr) console.log(v)



































