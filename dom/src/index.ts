import { createNode, render, onMountd, useState } from "./global";


let a = 10;

function App() {
  let [a, setState] = useState(10);

  onMountd(() => {
    console.log("挂在effct");
  })

  return createNode("button", {
    click: () => {
      // setState(30)
      // console.log("000");
      setState(20)

    }
  }, "div-app", `-------->${a}`)
}

let jsx = createNode(
  'div',
  {},
  createNode('p', {}, 'pstring', createNode('span', null, "222")),
  [
    createNode('li', {}, "li-text"),
    createNode('li', {

    }, "li-tex2t"),
    createNode(App, null, '0'),
    createNode('a', {}, "soan-text"),
    // createNode('li', {}, "listin"),
    "text------->"
  ],

)
let c = document.getElementById("container")
render(c, jsx)