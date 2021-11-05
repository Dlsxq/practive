import "../global.style.less";

const input = document.querySelector(".input");
const send = document.querySelector(".send-message");
const result = document.querySelector(".result");


let inputs = '';

input.oninput = evl => {
  inputs = evl.target.value;
}

const worker = new SharedWorker("/src/channel/sharedWork.js",{name:"worker1"});
worker.port.start();

worker.port.addEventListener("message", (evl) => {
  let data = evl.data;

  (result as HTMLDivElement).textContent = data;
})


send?.addEventListener("click", () => {
  if (inputs === "close") {
    worker.port.close() // 在外部关闭
    return;
  }
  console.log("child");
  worker.port.postMessage("child :"+inputs)
})





/* 

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root">
   
  </div>
  <input type="text" class="input">
  <button class="send-message">发送消息</button>
  <div class="result"></div>
  <script type="module" src="./src/index.ts"></script>
</body>
</html>

*/