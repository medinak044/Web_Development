// const cities = [
//     { "San Antonio": 3000 },
//     { "Austin": 5000 },
//     { "Houston": 3000 },
//     { "El Paso": 2000 },
//     { "Austin": 5000 },
// ];

// const findTotalPopulation = (arr) => {
//     let citiesSet = new Set(); // Collection of unique values
//     let population = 0;

//     for (let i = 0; i < arr.length; i++) {
//         // Checks each object element
//         for (const key in arr[i]) {
//             if (Object.hasOwnProperty.call(arr[i], key)) {
//                 if (citiesSet.has(key)) continue; // Check if key hasn't been iterated over already

//                 citiesSet.add(key);
//                 population += arr[i][key]; // value
//             }
//         }
//     }
//     return population;
// };

// console.log(findTotalPopulation(cities));

const cities = [
    { "San Antonio": 3000 },
    { "Austin": 5000 },
    { "Houston": 3000 },
    { "El Paso": 2000 },
    { "Austin": 5000 },
];

const findTotalPopulation = (arr) => {
    let citiesSet = new Set(); // Collection of unique values
    let population = 0;

    for (let i = 0; i < arr.length; i++) {
        // Checks each object element
        for (const key in arr[i]) {
            if (citiesSet.has(key)) continue; // Check if key hasn't been iterated over already

            citiesSet.add(key);
            population += arr[i][key]; // value
        }
    }
    return population;
};

// console.log(findTotalPopulation(cities));

// -----------------------------------------------
// Comparing work to find where to improve:

// function removeDuplicatesandSum(array) {
//     // Part 2: Austin is listed twice, write some logic so that any duplicate city is not added into the total population twice.
//     let keysArr = [];
//     let valsArr = [];
//     for (let i = 0; i < cities.length; i++) {
//         keysArr.push(Object.keys(cities[i]).join(""))
//         valsArr.push(Object.values(cities[i]).join(""))
//     }
//     //find any duplicates and delete them from values array.
//     for (let i = 0; i < keysArr.length; i++) {
//         while (keysArr.lastIndexOf(keysArr[i]) !== i) {
//             keysArr.splice(keysArr.lastIndexOf(keysArr[i]), 1)
//             valsArr.splice(keysArr.lastIndexOf(keysArr[i]), 1)
//             cities.splice(cities.lastIndexOf(keysArr[i]), 1)
//         }
//     }
//     // console.log(cities, keysArr, valsArr)
//     let total = 0;
//     for (let i = 0; i < valsArr.length; i++) {
//         total += Number(valsArr[i])
//     }
//     return total;
// }

function removeDuplicatesandSum(array) {
    // Part 2: Austin is listed twice, write some logic so that any duplicate city is not added into the total population twice.
    let keysArr = [];
    let valsArr = [];
    for (let i = 0; i < array.length; i++) {
        keysArr.push(Object.keys(array[i]).join(""))
        valsArr.push(Object.values(array[i]).join(""))
    }
    //find any duplicates and delete them from values array.
    for (let i = 0; i < keysArr.length; i++) {
        while (keysArr.lastIndexOf(keysArr[i]) !== i) {
            keysArr.splice(keysArr.lastIndexOf(keysArr[i]), 1)
            valsArr.splice(keysArr.lastIndexOf(keysArr[i]), 1)
            array.splice(array.lastIndexOf(keysArr[i]), 1)
        }
    }
    // console.log(cities, keysArr, valsArr)
    let total = 0;
    for (let i = 0; i < valsArr.length; i++) {
        total += Number(valsArr[i])
    }
    return total;
}
console.log(removeDuplicatesandSum(cities))