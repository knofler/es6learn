// tag functions for pre processor
function foo(string, ...values){
	return {'strings': string, 'values': values} 
}

function currency(string, ...values){
	var str = "";

	for(var i =0;i<string.length;i++){
		if(i>0){
			//console.log("string: ",string[i])
			//console.log("values: ",values[i])
			if(typeof values[i-1] == 'number'){
				str+=values[i-1].toFixed(2)
			}else{
				str +=values[i-1];
			}
		}
	//console.log("string first: ",string[i])
	str+= string[i]
	}
	return str;
}

var name = 'Mark Jacobd',
	amount = 343.43232,
	orderNumber = 3.14157234;

var msg1 = `My name is ${name}, and order number is ${orderNumber},
	and total amount I have spent is $${amount}.`,
	msg2 =`My name is ${name}, and order number is ${orderNumber},\
	and total amount I have spent is $${amount}.`,
	msg3 = foo`My name is ${name}, and order number is ${orderNumber},
	and total amount I have spent is $${amount}.`;
	msg4 = currency`My name is ${name}, and order number is ${orderNumber},
	and total amount I have spent is $${amount}.`;


console.log("msg1", msg1)
console.log("msg2", msg2)
console.log("msg3", msg3)
console.log("msg4", msg4)






