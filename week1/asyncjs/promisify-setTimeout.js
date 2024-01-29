/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    // if (!Number.isInteger(n)) {
    //     console.log("Error: The argument must be an integer.");
    //     return;
    // }
    var startTime = Date.now();
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            // var error = true;
            // const variable = typeof(n1)
            const endTime = Date.now();
            resolve(endTime-startTime);
        },n)
        // console.log("running...")
    }).then((data)=>{
        // console.log("code executed in : "+data);
        return data;
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = wait;
