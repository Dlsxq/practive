
// https://developer.mozilla.org/zh-CN/docs/Web/API/Broadcast_Channel_API
// sharedWorker
// message channel
// worker 
// https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker
// wasm


/*
  如果文档不允许启动worker，则会引发SecurityError
  如果脚本之一的MIME类型为 text/csv, image/*, video/*,或 audio/*, 则会引发NetworkError。它应该始终是 text/javascript。
  如果aURL无法解析，则引发SyntaxError。
  aURL
  是一个DOMString 表示worker 将执行的脚本的URL。它必须遵守同源策略。
options 可选
  包含可在创建对象实例时设置的选项属性的对象。可用属性如下:
  type：用以指定 worker 类型的  DOMString 值. 该值可以是 classic 或 module. 如果未指定，将使用默认值 classic.
  credentials：用以指定 worker 凭证的 DOMString 值.该值可以是 omit, same-origin，或 include.。如果未指定，或者 type 是 classic，将使用默认值 omit (不要求凭证)。
  name：在 DedicatedWorkerGlobalScope 的情况下，用来表示 worker 的 scope 的一个 DOMString 值，主要用于调试目的。
*/

const input = document.querySelector(".input");
const send = document.querySelector(".send-message");
const result = document.querySelector(".result");




const worker = new SharedWorker("/src/channel/sharedWork.js", { name: "main" });
worker.port.start();


let inputs = '';

input.oninput = evl => {
  inputs = evl.target.value;
}


worker.port.addEventListener("message", (evl) => {
  let data = evl.data;

  (result as HTMLDivElement).textContent = data;
})


send?.addEventListener("click", () => {
  if (inputs === "close") {
    worker.port.close() // 在外部关闭
    return;
  }
console.log("mian;___.");
  worker.port.postMessage("main:" + inputs)

  // setTimeout(() => {
  //  
  // });

})