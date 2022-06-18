const http = require("http");
const fs = require("fs");
const wat = require("wabt");

const inputSourceTextPath = "./wasm/sourceText.wat";



let gloC;


http.createServer((req, res) => {

  let pathUri = req.url;

  console.log(`url:->{ ${pathUri} }<-`);

  function send(convert) {
    gloC = convert;

    try {
      let buf = gloC.parseWat(
        inputSourceTextPath,
        fs.readFileSync(inputSourceTextPath, "utf-8")
      );

      let r = Buffer.from(buf.toBinary({}).buffer);


      res.end(r);
    } catch (exx) {
      console.log(exx);
      res.end("error");
    }
  }


  switch (pathUri) {
    case "/":
      // html
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return fs.createReadStream("./main.html").pipe(res);
    case "/module.wasm": {

      if (typeof gloC === "object") {
        return send(
          gloC
        );
      }

      return wat().then(
        r => {
          send(r);
        }
      );
    }

      ReadStream("./test.wat").pipe(res);
    default: {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(`<h1>404 Page</h1>`);
      return;
    }
  }


}).listen(4096, () => {
  console.log(`the service run on port :->{ ${4096} }<-`);
});

/* 

  (module
  (func (export "addTwo") (param i32 i32) (result i32)
    (if  (result i32)
      (i32.lt_s 
        (
          local.get 0
        )
        (
          local.get 1
        )
      )
      (then
      i32.const 0
      i32.const 231
      i32.store
      )
      (else
       i32.const 100
      )
    )
  )
)
*/