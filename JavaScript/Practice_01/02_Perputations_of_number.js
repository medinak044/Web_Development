// The code below doesn't work, but be able to explain how you would approach the problem in theory


const findPermutations = (num) => {
    let resultObj = {} // Stores all permutations of the number
    let numArr = (() => num.toString().split(''))()
    let alphObj = (() => {
        let resultObj = {}
        let alph = `abcdefghijklmnopqrstuvwxyz`
        let alphArr = alph.split('')

        for (let i = 0; i < alphArr.length; i++) {
            // resultObj[alphArr[i]] = alphArr.indexOf(alphArr[i]) + 1 // Create new property
            resultObj[alphArr.indexOf(alphArr[i]) + 1] = alphArr[i] // Create new property
        }

        return resultObj
    })()

    let newStr = ``

    for (let i = 0; i < numArr.length; i++) {
        console.log(alphObj[numArr[i]])

        // TASK: How can I make comparisons to translate the number to its respective alphabet letter
        if (numArr[i] == alphObj[numArr[i]]) {
            resultObj[(() => {
                for (const key in alphObj) {
                    if (Object.hasOwnProperty.call(alphObj, key)) {
                        if (numArr[i] === alphObj[key]) {
                            return key // Concatenate translated value
                            break; // End search
                        }
                    }
                }
            })()] = numArr[i]

        }
    }

    return resultObj
}

console.log(findPermutations(12258))

// Revised function includes another parameter for custom function algorithm