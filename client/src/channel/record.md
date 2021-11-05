<meta charset="utf-8">

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


  <div class="channel-container">
    <h3>老王</h3>
    <input type="text" id="child-create">
    <button id="child-send">发送</button>
    <br>
    <textarea name="" id="child-result" cols="30" rows="10" readonly></textarea>
  </div>
  <div class="channel-container">
    <h3>老李</h3>
    <input type="text" id="main-create" >
    <button id="main-send">发送</button>
    <br>
    <textarea name="" id="main-result" cols="30" rows="10" readonly></textarea>
  </div>
<script>
  const channel = new MessageChannel();
  const main = channel.port1;
  const child = channel.port2;

  const mainBox = {
    send: document.querySelector("#main-send"),
    create: document.querySelector("#main-create"),
    result: document.querySelector("#main-result")
  };
  const childBox = {
    send: document.querySelector("#child-send"),
    create: document.querySelector("#child-create"),
    result: document.querySelector("#child-result")
  };
  
  function pushEventListener(dom, port) {
    let tempVal = ``;
    dom.send.addEventListener("click", function send() {
      port.postMessage(tempVal);
    });
    dom.create.addEventListener("input", function onInput(e) {
      tempVal = e.target.value;
    });
    port.addEventListener("message", function onMessage(e) {
      dom.result.textContent = e.data;
    });
    port.start(); // 手动开启端口， 如果使用onmessage 属性回调的方式会自动开启
  }

  pushEventListener(mainBox, main)
  pushEventListener(childBox, child)

</script>