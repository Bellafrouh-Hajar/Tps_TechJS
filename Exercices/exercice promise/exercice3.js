// 1. Print out "Program started"
console.log("Program started");

// 2. Create a Promise that resolves after 3 seconds
const firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Step 1 complete");
    }, 3000);
});

// 3. Log out the promise while it's pending
console.log(firstPromise);

// 4. Print out "Program in progress..."
console.log("Program in progress...");

// 5. Print out "Step 1 complete" when the first promise fulfills
firstPromise
    .then((message) => {
        console.log(message);

        // 6. Return another Promise that resolves after 3 seconds
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Step 2 complete");
            }, 3000);
        });
    })

    // 7. Print the message from the second promise
    .then((message) => {
        console.log(message);
    });