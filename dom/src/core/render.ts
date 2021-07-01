import { VNode } from "../interface";




function renderApp(node: VNode<(...args: any) => VNode>) {

  let root = node.type();
  root.parentNode = renderTree;
  root.prevSibling = renderTree.prevSibling;
  root.nextSibling = renderTree.nextSibling;
  renderTree.nextSibling = root;
  renderTree = root;
  return document.createElement("li");
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
    return renderApp(node as VNode<(...args: any) => any>);
  }


  let el = document.createElement(node.type);

  for (let [key, val] of Object.entries(node.props)) {
    el.addEventListener(key, val);
  }

  return el;
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



let renderTree: VNode = null;
let prevTree: VNode = null;

const containerStack: (Text | HTMLElement | DocumentFragment)[] = [];

// 深度
function createRenderTree(container: DocumentFragment, root: VNode) {
  containerStack.push(container);
  // let curr = renderTree;
  while (renderTree !== null) {
    let parentNode = containerStack[containerStack.length - 1]
    let node = createElement(renderTree);

    // child
    let next;

    parentNode.appendChild(node);

    if (renderTree.firstChild !== null) {
      containerStack.push(node);
      next = renderTree.firstChild;
    } else if (renderTree.nextSibling !== null) {
      next = renderTree.nextSibling;
    } else if (renderTree.nextSibling === null && renderTree.firstChild === null) {
      while (renderTree.parentNode !== null && renderTree.nextSibling === null) {
        containerStack.pop()
        renderTree = renderTree.parentNode;
      }
      next = renderTree.nextSibling;
    }

    renderTree = next;
  }


  return containerStack.pop()
}


function workLoop(work, ...args: any) {
  return work(...args)
}


export function render(container: HTMLElement, workTree: VNode) {

  renderTree = workTree;
  let node = workLoop(createRenderTree, document.createDocumentFragment(), workTree)

  container.appendChild(node)
}