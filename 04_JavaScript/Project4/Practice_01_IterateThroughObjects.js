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
            if (Object.hasOwnProperty.call(arr[i], key)) {
                if (citiesSet.has(key)) continue; // Check if key hasn't been iterated over already

                citiesSet.add(key);
                population += arr[i][key]; // value
            }
        }
    }
    return population;
};

console.log(findTotalPopulation(cities));