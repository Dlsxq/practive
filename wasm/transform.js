

const wat = require("wabt");
const fs = require("fs");

const inputSourceTextPath = "./sourceText.wat";


const inputWasm = "./module.wasm";

wat().then(wab => {
  let wabMod = wab.parseWat(inputSourceTextPath, fs.readFileSync(inputSourceTextPath, "utf-8"));
  wabMod.applyNames();

  fs.writeFileSync("w2.wasm", wabMod.toBinary({}).buffer);
});