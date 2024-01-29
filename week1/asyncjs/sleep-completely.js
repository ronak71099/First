/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function Tutor(time) {
    if(time>=0){
       var startTime = Date.now();
       for (let i = 1; i <4 ; i++) {        
          await sleep(time);
          var endTime = Date.now();
          return endTime-startTime;
       }
    }else{
       return 0;
    }
  }
module.exports = Tutor;
