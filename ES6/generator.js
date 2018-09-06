//generate unique id by generator

function *uniqueID(){
	while (true){
		yield Math.random()
	}
}

var it = uniqueID();

console.log(it.next().value);


// another generator example
function *main(){
	for (var v=0;v<5;v++){
		yield v
	}
}

for (let i of main()){
	console.log(i)
}

//custom iterator using generator
var obj = {
	*[Symbol.iterator](){
		for (var c= this.starts ; c<= this.end ; c+=this.jump ){
			yield this.values[c];
		}
	},
	values:[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,
	48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94],
	starts:4,
	end:43,
	jump:5
};

var vals = [...obj]

console.log("vals : ",vals)
























