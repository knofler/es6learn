function closure(){
	let a = 3;
	return function increamentA(b=1){
		return a+=b
	}
}

var catchClosure = closure();

catchClosure(4);