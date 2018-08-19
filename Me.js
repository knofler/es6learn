module.exports = {
	add: (...x) => x.reduce((a,b)=>a+b),
	destruct: (...rest) => [...rest],
	lexFunc: function(){
	  return (...x) => x.reduce((a,b)=>a+b)
	 }
}