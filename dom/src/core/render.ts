import { VNode } from "../interface";



let renderTree: VNode = null;
let prevTree: VNode = null;


function renderApp(node: VNode) {

  return document.createElement("div");
}

function renderStatic(node: VNode) {

  let text = document.createTextNode(node.text);
  return text
}

function createElement(node: VNode) {
  if (node.static) {
    return renderStatic(node);
  }
  if (typeof node.type === "function") {
    return renderApp(node);
  }
  return document.createElement(node.type);
}

/* 
c 
  o [ c
      0 : [
          2,
          2,
        ]
      0,
      0 : [
        3,
        3,
        3,
      ]
      0 : [
          1,
          1,
          1,
        ]
  ]
*/

function getNode() {
  let curr = workVnodeStack.pop();

  if (curr.firstChild !== null) {
    let el = curr.firstChild;
    workVnodeStack.push(el);
    return [el];
  }
  if (curr.nextSibling !== null) {
    let el = curr.nextSibling;
    workVnodeStack.push(el);

    return [el];
  }
  if (curr.parentNode !== null) {
    let p = curr.parentNode.nextSibling;
    if (p !== null) {
      workVnodeStack.push(p)
    }
    return [p];
  }

  console.log("error");

}

let workDummy;
let workVnodeStack: VNode[] = [];
let containerStack = [];
// 深度
function createRenderTree(container: DocumentFragment, root: VNode) {

  let stack: (Text | HTMLElement | DocumentFragment)[] = [container];

  let curr = root;

  while (curr !== null) {
    let con = stack[stack.length - 1]
    let node = createElement(curr);

    // child
    let next;
    con.appendChild(node);
    if (curr.firstChild !== null) {
      stack.push(node);
      next = curr.firstChild;
    } else if (curr.nextSibling !== null) {
      next = curr.nextSibling;
    } else if (curr.nextSibling === null && curr.firstChild === null) {

      while (curr.parentNode !== null && curr.nextSibling === null) {
        stack.pop()
        curr = curr.parentNode;
      }
      next = curr.nextSibling;
    }

    curr = next;
  }

  return container
}


function workLoop(work, ...args: any) {
  return work(...args)
}


export function render(container: HTMLElement, workTree: VNode) {

  let dummy = document.createDocumentFragment();
  renderTree = workTree;

  let node = workLoop(createRenderTree, dummy, workTree)
  console.dir(node);
  container.appendChild(node)
}