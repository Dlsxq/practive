import f from "./wasm/module.wasm";




void async function () {
  let m = await f();
  console.log(m);
  console.log(m.addTwo(1,2));
}();
