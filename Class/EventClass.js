module.exports = class EventClass{

	constructor(arg,name,event){
		this.name  = name,
		this.event = event,
		this.arg   = arg
	}

	callEvent(){
		console.log('Event Name is : ', this.name)
		console.log('arg is : ', this.arg)
	}

	runEvent(){ 
		console.log("runEvent for ",this.name ,' is ',
		this.event(...this.arg)) 
	} 
}
