import { render } from "./core/render";
import { createNode } from "./global";


let jsx = createNode(
  'div',
  {},
  createNode('p', {}, 'pstring', createNode('span', null, "222")),
  [
    createNode('li', {}, "li-text"),
    createNode('a', {}, "soan-text"),
    // createNode('li', {}, "listin"),
    "text------->"
  ]
)
let c = document.getElementById("container")
render(c, jsx)