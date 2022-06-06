
import { Reader } from "./Reader";

let p = new Promise<any>(res => {

  globalThis.next = (...args: any[]) => {
    res.apply(null, args);
  }

});


const readStream = new ReadableStream<number>({
  async pull(controller) {

    let i = 1;

    let id = setInterval(() => {
      controller.enqueue(i++);
    }, 1000);

    let r = await p;

    clearInterval(id);
    controller.close();
    controller.enqueue(r);

    return Promise.resolve();
  }

});


new Reader(readStream).onRead(val => {
  console.log(val);
});
