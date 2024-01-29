/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function one(t) {
    return new Promise((resolve, reject) => {
        if(t>=0){
        setTimeout(() => {
            // console.log("One function");
            
            resolve(t);
        }, t);
        }else{
            reject("error funcino 1");
            // return;
        }
    });
}

async function two(t) {
    return new Promise((resolve, reject) => {
        if(t>=0){
        setTimeout(() => {
            // console.log("second function");
            
            resolve(t);
        }, t);
    }else{
        reject("error funcino 2");
        // return;
    }
    });
}
async function three(t) {
    return new Promise((resolve, reject) => {
        if(t>=0){
        setTimeout(() => {
            // console.log("third function");
            
            resolve(t);
        }, t);
    }else{
        reject("errro fucntion 3");
        // return;
    }
    
    });
}
function calculateTime(t, t1, t2) {
    
    const startTime = Date.now();

    return one(t)
        .then(() => two(t1))
        .then(() => three(t2))
        .then(() => {
            const endTime = Date.now();
            // console.log(endTime);
            const totalTime = endTime - startTime;
            // console.log(`Total time taken: ${totalTime} milliseconds`);
            return totalTime;
        })
        .catch((error) => {
            // Handle errors if any promise is rejected
            console.error("Error:", error);
            return error;
        });
}

module.exports = calculateTime;
