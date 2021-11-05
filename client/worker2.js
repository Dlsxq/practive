

// worker2.js
onmessage = function (e) {
  const port = e.ports[0];
  port.onmessage = portEvent => {
   console.log("worker2的port收到:",portEvent.data);
  }
  console.log(e.data,"work2");
}