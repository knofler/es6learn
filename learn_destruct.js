// Default value paradox

var x = 5  

function foo(x=3,f=function(){return x}){
	var x = 4
	console.log(f())
}

//foo()

// gather

var a =[2,3,5];
var b = [6,7,8]

function arrFlatReturn(...rest){
	return [...rest]
}
console.log(arrFlatReturn(...a,...b))

// array destruct
var [d,e=42,f] = arrFlatReturn(...a,...b)
console.log("d : ",d," e: ", e, " f: ", f)


//nested array destruct
function arrReturn(x,y){
	return [...x,y]
}
console.log(arrReturn(a,b))

var r= [x,y,,[t,,k]] = arrReturn(a,b)
console.log("nested array destruct is : ", x, y,t,k)
console.log("nested array assigned destruct is : ", r)


function foo([a,b,c]= []){
	console.log(a,b,c)
}

foo([1,3,5])


// named arguments

function bar({a,b,c} ={}){
	console.log(a,b,c)
}

bar({
	a:345,
	b:5343,
	c:644
});

//practical example

//parameters order is matter
function sayName(name,sound){
	sound(name)
}

function sayNameArg({name,talk,sound,callMeMobile,fii} ={}){
	var phone = 042649744
	sound(name)
	talk() 
	callMeMobile(phone)
	fii()
}

function talk(speech){
	console.log("talk:::: this is concise methods")
}

//normal call
//sayName(sound,"whoo whoo")

//arguments call not following the parameter orders
var makeFn = 'callMe'
sayNameArg({
	talk,
	//concise methods
	sound(voice){console.log(voice)},
	name:'This is passed on inline sound function :::: whoo whoo',
	//computed properties for method names
	[makeFn+"Mobile"](number){
		console.log(
			"This is computed function ",
			2*number, ' and this is',
			[makeFn+"Mobile"]
			)
		},
	*fii(){console.log("this is generator")}
})


//object destruct

var f = 'hello';

var objPass ={
	l:'This is first',
	m:{
		g:'inside variable'
	},
	o:'299',
	p: [
		'Array','inside','object'
	 ],
	 //computed variables inside object
	[f.toUpperCase()]: 'hello to Uppercase by compute variables inside object, then hold this value inside HELLO'
	}

function objDestrct(obj){
	console.log("Obj is : ", obj)
	return obj	
} 

var o;
var {
	l,
	m:{
		g
	} = {},
	n ="default value is 334",
	o:X = "X is default to 42",
	p: [
		i,j,k
	] = [],
	q = 'q doesn\'t exist in object,that is why this is default value',
	r = 'r showing default value',
	HELLO = 42
} = objDestrct(objPass) || {}

console.log("object destruct resutlt is : \n",
	'l: ', l ,'\n',
	//'m: ', m ,'\n',
	'g: ', g ,'\n',
	'n: ', n ,'\n',
	'o: ', o ,'\n',
	//'p: ', p ,'\n',
	'i: ', i ,'\n',
	'j: ', j ,'\n',
	'k: ', k ,'\n',	
	'q: ', q ,'\n',
	'r: ', r ,'\n',
	'X: ', X ,'\n',
	"HELLO is : ", HELLO
	)








