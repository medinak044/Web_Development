/*
let numStart = 1;
let numEnd = 100;

const func1 = () => {
    for (let i = numStart; i <= numEnd; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FIZZBUZZ");
        } else if (i % 3 === 0) {
            console.log("FIZZ");
        } else if (i % 5 === 0) {
            console.log("BUZZ");
        } else {
            console.log(i);
        }
    }
}

const func2 = () => {
    for (let i = numStart; i <= numEnd; i++) {
        let output = "";
        if (i % 3 === 0) output += "FIZZ"; // Concatenate string to a variable
        if (i % 5 === 0) output += "BUZZ";

        if (output === "") output = i; // Check for empty string value

        console.log(output || i); // Outputs either string or current index number
    }
}

(() => {
    const iterations = 100;
    let timeValues = [];

    for (let i = 0; i < iterations; i++) {
        console.time("Time");
        func1();
        // Need to extract only string numbers from console.time() (2.24124 ms)
        timeValues.push(parseFloat(Math.floor(console.timeEnd("Time"))));
    }
    let mean = (() => {
        let sum = 0.0;
        for (let i = 0; i < timeValues.length; i++) {
            sum += timeValues[i];
        }
        console.log(timeValues);
        return sum / parseFloat(timeValues.length);
    })(); // IIFE
    console.log(`Average time: ${mean}`);
})(); // IIFE
*/

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

