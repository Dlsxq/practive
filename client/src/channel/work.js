





self.addEventListener("message", function onMessage(evl) {
  let data = evl.data;



  // evl.currentTarget.postMessage(`worker : ${data}`)
  console.log(data,"work");

})