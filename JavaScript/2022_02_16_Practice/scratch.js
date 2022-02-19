// console.log(((num1, num2) => {
//     let resultStr = ``

//     for (let i = num1; i <= num2; i++) {
//         if (((i % 5) === 0) && ((i % 7) === 0)) resultStr += `${i}: Hello JM \n`
//         else if ((i % 7) === 0) resultStr += `${i}: Hello \n`
//         else if ((i % 5) === 0) resultStr += `${i}: JM \n`
//         else resultStr += `${i}: \n`
//     }

//     return resultStr
// })(5, 100))


const func1 = (num1, num2) => {
    let resultStr = ``

    for (let i = num1; i <= num2; i++) {
        if (((i % 5) === 0) && ((i % 7) === 0)) resultStr += `${i}: Hello JM \n`
        else if ((i % 7) === 0) resultStr += `${i}: Hello \n`
        else if ((i % 5) === 0) resultStr += `${i}: JM \n`
        else resultStr += `${i}: \n`
    }

    return resultStr
}

console.log(func1(5, 100))

