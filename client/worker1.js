

// worker1.js
onmessage = function(e) {
  console.log("work1收到：",e.data);
  e.ports[0].postMessage("worker1发出: "+e.data)
}