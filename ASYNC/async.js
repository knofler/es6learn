async function createFlow() {
    console.log("Me first")
    let data = await fetch("https://reqres.in/api/users")
    console.log(data)
}

createFlow()