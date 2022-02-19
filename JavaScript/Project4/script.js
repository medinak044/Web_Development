//store references to pictures (stored in a separate folder) in array
//display an image as the starting image
//store text for each image in array
//use setInterval() for 3000ms to rotate through array
let imgArray = [
    `assets/background1.jpg`,
    `assets/background2.jpg`,
    `assets/background3.jpg`
];
let img = document.querySelector(`#img1`);
img.src = imgArray[0]; // Sets default image source

let currentNum = 0;
let interval = 3000;

let stop = setInterval(() => {
    currentNum = ((currentNum + 1) >= imgArray.length) ? (0)
        : (currentNum + 1);
    console.log(`Current index position: ${currentNum}, ${imgArray[currentNum]}`)
    img.src = imgArray[currentNum];
}, interval);
