


const ports = new Set();

self.addEventListener("connect", evl => {
  const port = evl.ports[0];
  port.start();

  port.addEventListener("message", evl => {
    let data = evl.data;
    let res = {
      data,
      length: ports.size,
      shar:evl.name
    };

    // if (data === "closeWorker") {
    //   port.close();
    //   ports = ports.filter(el => el !== port);
    //   ports.forEach(p => p.postMessage(`close ${evl.name}`))
    //   return
    // }

    ports.forEach(p => p.postMessage(JSON.stringify(res, null, 4)));
  })
  port.addEventListener("close", (evl) => {
    ports = ports.filter(el => el !== port);
    ports.forEach(p => p.postMessage(`close ${evl.name}`))
  })
  ports.add(port);
})

//


/* 
  内部无法关闭
  没有name属性
  可以手动加入name

*/