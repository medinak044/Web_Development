const func1 = () => {
    for (let i = 1; i <= 100; i++) {
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
    for (let i = 1; i <= 100; i++) {
        let output;
        if (i % 3 === 0) output += "FIZZ"; // Concatenate string to a variable
        if (i % 5 === 0) output += "BUZZ";

        if (output === "") output = i; // Check for empty string value

        console.log(output); // Outputs either number or string
    }
}