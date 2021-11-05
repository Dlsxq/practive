<!DOCTYPE HTML>
<html>

<head>
  <title>Shared workers: demo 1</title>
  <meta charset="utf-8">
</head>
<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  .channel-container {
    padding: 50px;
    outline: 1px solid red;
    width: min-content;
  }

  .channel-container input,
  textarea {
    margin: 20px;
  }

  #send {}
</style>

<body>

  <div class="channel-container">
    <div>child</div>
    <input type="text" id="child-create">
    <button id="child-send">发送</button>
    <br>
    <textarea name="" id="child-result" cols="30" rows="10" readonly></textarea>
  </div>
  <div class="channel-container">
    <div>main</div>
    <input type="text" id="main-create">
    <button id="main-send">发送</button>
    <br>
    <textarea name="" id="main-result" cols="30" rows="10" readonly></textarea>
  </div>
</body>
<script>


  let worker1 = new Worker('./worker1.js');
  let worker2 = new Worker('./worker2.js');


  const channel = new MessageChannel();
  const main = channel.port1;
  const child = channel.port2;

  worker2.postMessage("child", [child])
  worker1.postMessage("main", [main])

  // const mainBox = {
  //   send: document.querySelector("#main-send"),
  //   create: document.querySelector("#main-create"),
  //   result: document.querySelector("#main-result")
  // }

  // const childBox = {
  //   send: document.querySelector("#child-send"),
  //   create: document.querySelector("#child-create"),
  //   result: document.querySelector("#child-result")
  // }

  // let array = new ArrayBuffer(10);

  // let u8arr = new Uint8Array(array);
  // u8arr[0] = 201;
  // u8arr[1] = 204;


  // function pushEventListener(dom, port) {
  //   let tempVal = ``;
  //   dom.send.addEventListener("click", function send() {
  //     port.postMessage(array, [array]);
  //   });
  //   dom.create.addEventListener("input", function onInput(e) {
  //     tempVal = e.target.value;
  //   });
  //   port.addEventListener("message", function onMessage(e) {
  //     // dom.result.textContent = e.data;
  //     console.log(e.data);
  //     console.log(array);
  //   });
  //   port.start();
  // }

  // pushEventListener(mainBox, main)
  // pushEventListener(childBox, child)

</script>

</html>