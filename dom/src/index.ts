import { render } from "./core/render";
import { createNode } from "./global";


function App() {
  return createNode("div", null, "div-app")
}

let jsx = createNode(
  'div',
  {},
  createNode('p', {}, 'pstring', createNode('span', null, "222")),
  [
    createNode('li', {}, "li-text"),
    createNode('li', {
      click: e => {
        console.log("++");
      }
    }, "li-tex2t"),
    createNode(App, null, '0'),
    createNode('a', {}, "soan-text"),
    // createNode('li', {}, "listin"),
    "text------->"
  ],

)
let c = document.getElementById("container")
render(c, jsx)