const http = require("http");
const fs = require("fs");
const wat = require("wabt");

const inputSourceTextPath = "./sourceText.wat";



let convert;


http.createServer((req, res) => {

  let pathUri = req.url;

  console.log(`url:->{ ${pathUri} }<-`);


  function send(convert) {
    try {
      res.end(convert.parseWat(
        inputSourceTextPath,
        fs.readFileSync(inputSourceTextPath, "utf-8")
      ).toBinary({canonicalize_lebs:true}).buffer);
    } catch (exx) {
      console.log(exx);
      fs.createReadStream("./module.wasm").pipe(res);
    }
  }


  switch (pathUri) {
    case "/":
      // html
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return fs.createReadStream("./main.html").pipe(res);
    case "/module.wasm": {
      if (typeof convert === "object") {
        return send(
          convert
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