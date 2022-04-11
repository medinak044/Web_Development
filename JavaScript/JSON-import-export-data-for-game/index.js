const fs = require(`fs`)

let filePath = ``

const jsonReader = (filePath, cb) => {
    if (err) { return cb && cb(err) }

    try {
        const jsonString = fs.readFileSync(`.customer.json`, `utf-8`)
        const data = JSON.parse(jsonString)
        console.log()
    } catch (error) { console.log(err) }
}

// jsonReader(`./customer.json`, (err,data)=>{
//     if (err) { console.log(err) } 
//     else { console.log(data.address) }
// })

const newObj = {
    name: `New name`,
    address: `456 Example St`
}
const jsonString = JSON.stringify(newObj)
console.log(jsonString)
fs.writeFile(`./newData.json`, JSON.stringify(newObj, null, 2), err => {
    if (err) { console.log(err) }
    else { console.log(`successfully written data`) }
})