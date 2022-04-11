const fs = require(`fs`)

try {
    const jsonString = fs.readFileSync(`.customer.json`, `utf-8`)
    const data = JSON.parse(jsonString)
    console.log()
} catch (error) { console.log(err) }