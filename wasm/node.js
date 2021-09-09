const http = require("http");
const fs = require("fs")

http.createServer((req,res) => {
  console.log(req.url);
  let uri = req.url;
  if (uri === "/") {
    res.setHeader("Content-Type","text/html")
    res.write(fs.readFileSync("./wasm.html"))
  }else if (uri === "/wasm_exec.js") {
    res.setHeader("Content-Type","application/javascript")
    res.write(fs.readFileSync("./wasm_exec.js"))
  }else if (uri === "/main.wasm") {
    res.setHeader("Content-Type","application/wasm")
    res.write(fs.readFileSync("./main.wasm"))
  }
  res.end()

}).listen(7089)