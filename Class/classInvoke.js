var me = require('./Me.js')
var EventClass = require('./EventClass.js')
var PCL = require('./protoClass.js')

var pcl = new PCL();

console.log("pcl is: ", pcl)

//define all global variables
var a= [1,2,3],
	b= [5,6,7],
	c= [31,42,433],
	d= [34,[5,6,7,[34,4,5,6]],31,22];

var arrVal = [3,35,52,25,2];

console.log("Me Module as function prototype is : \n", me)
console.log("EventClass Module as Class export is : \n", EventClass)

//invoke Myclass methods
console.log(
	"me.add: ",me.add(44,33,33,4343,3),"\n",
	"me.destruct: ",me.destruct(...a,...b,...c),"\n",
	"me.combine: ", me.add(...me.destruct(...a,...b)),"\n",
	"me.lexFunc is : ", me.lexFunc()
	)


//instantiate EventClass with inlilne arrow function as parameter.
var myEvent = new EventClass(arrVal,'myEvent',(...x)=>x.reduce((a,b)=>a+b))

//invoke methods of the EventClass
myEvent.callEvent();
myEvent.runEvent();

/*instantiate second instance of EventClass with method from Myclass 
as parameter me.lexFunc(). invoking that method, returns a lexical function, 
which is an arrow function, that destruct any array passed on as first 
parameter of EventClass instantiation */
var myEvent2 = new EventClass(arrVal,'myEvent2',me.lexFunc())

//invoke runEvent metod of EvenClass
myEvent2.runEvent(); 




















