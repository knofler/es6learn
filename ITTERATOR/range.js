var NumberIterator = function* () {
	if (this < 0) {
		for (let i = this; i <= 0; i++) {
			yield i
		}
	} else {
		for (let i = 0; i <= this; i++) {
			yield i
		}
	}

}

Number.prototype[Symbol.iterator] = NumberIterator

console.log(...-17)