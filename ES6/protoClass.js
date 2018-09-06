//define class as function
function Myclass(){}

// add methods as function prototype to function class
Myclass.prototype.add = (...x) => x.reduce((a,b)=>a+b)
Myclass.prototype.destruct = (...rest) => [...rest]
Myclass.prototype.lexFunc = function(){
  return  (...x) => x.reduce((a,b)=>a+b)
 }

module.exports = Myclass;