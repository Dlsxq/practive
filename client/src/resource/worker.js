let a = 666;

/* 

  chrome://inspect/#workers
  dev tools 


*/
let res = {

}
console.log("shared-worker");
onconnect = function (e) {
  var port = e.ports[0];
console.log(e);
  port.onmessage = function (e) {
    console.log(e);
    port.postMessage(JSON.stringify({
      a:++a,
    }));
  };
};





// const worker = new Worker("src/resource/worker.js")



// worker.postMessage(JSON.stringify({name:"9090"}))
// const result = document.getElementsByClassName("result")[0]

// let worker = new SharedWorker("src/resource/worker.js");
// worker.port.start();

// worker.port.onmessage = function (evl) {
//   console.log(evl);
//   result.textContent = evl.data
// };

// document.getElementById("inc").addEventListener("click",() => {
// worker.port.postMessage("like");

// })
// globalThis.name = "post1"
