import { createNode, } from "./global";


let a = 10;

function App() {

  return createNode("button", {
    click: () => {
      // setState(30)
      // console.log("000");

    }
  }, "div-app", `-------->${a}`)
}

let jsx = () => createNode(
  'div',
  {},
  a,
  createNode('p', {}, 'pstring', createNode('span', null, "222")),
  [
    createNode('li', {}, "li-text"),
    createNode('li', {

    }, "li-tex2t"),
    createNode(App, null),
    createNode('a', {}, "soan-text"),
    // createNode('li', {}, "listin"),
    "text------->"
  ],
)



console.log(jsx());

setTimeout(() => {
  a = 30;
  console.log(jsx());

}, 1000);


let c = document.getElementById("container")

