//Define funtion first

function sayNameArg({
    name,
    talk,
    sound,
    callMeMobile,
    fii
} = {}) {
    var phone = 042649744
    sound(name)
    talk()
    callMeMobile(phone)
    fii()
}

function talk(speech) {
    console.log("talk:::: this is concise methods")
}

//normal call
//sayName(sound,"whoo whoo")

//arguments call not following the parameter orders
var makeFn = 'callMe'
sayNameArg({
    talk,
    //concise methods
    sound(voice) {
        console.log(voice)
    },
    name: 'This is passed on inline sound function :::: whoo whoo',
    //computed properties for method names
    [makeFn + "Mobile"](number) {
        console.log(
            "This is computed function ",
            2 * number, ' and this is',
            [makeFn + "Mobile"]
        )
    },
    * fii() {
        console.log("this is generator")
    }
})