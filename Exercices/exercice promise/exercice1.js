// 1. Print out "Program Started"
console.log("Program Started");

// 2. Create a Promise that resolves after 3 seconds
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 3000);
});

// 3. Log out the promise while it's pending
console.log(myPromise);

// 4. Print out "Program in progress..."
console.log("Program in progress...");

// 5. Print out "Program complete" when the promise resolves
myPromise.then(() => {
    console.log("Program complete");
});