import { VNode } from "../interface";
import { activeHooks } from "./effect";
import { set } from "./event";

function appendChild(parent, child) {
  (parent.appendChild)(child);
  return child;
}

function createHtmlElement(vNode: VNode) {
  if (vNode.static) {
    return document.createTextNode(vNode.text);
  }
  if (typeof vNode.type === "function") {
    activeHooks.activeHooks = vNode.hooks;
    let curr = vNode.type();
    console.log(activeHooks.activeHooks, vNode);

    vNode.hooks = activeHooks.activeHooks;
    activeHooks.activeHooks = null;
    // console.log(vNode.hooks);
    let html = commitChildToContainer(curr);
    return html;
  }

  let el = document.createElement(vNode.type);
  for (let [key, val] of Object.entries(vNode.props)) {
    // el.addEventListener(key, val)
    set("evt", function click(e) {
      console.log(vNode);

      activeHooks.activeHooks = vNode.hooks;
      val(e)
      vNode.hooks = activeHooks.activeHooks;
      activeHooks.activeHooks = null;
    })
  }

  return el;
}


let containerStack: (HTMLElement | Text | DocumentFragment)[] = [];

function execEffect(vNode: VNode) {
  let hooks = vNode.hooks;
  let cur = hooks.mountd;

  while (cur !== null && cur !== undefined) {
    cur.effect()
    cur = cur.next
  }

}

export function commitChildToContainer(vNode: VNode) {
  containerStack.push(document.createDocumentFragment());
  let currentNode = vNode;


  while (currentNode !== null) {
    let parentNode = containerStack[containerStack.length - 1];

    let node = appendChild(parentNode, createHtmlElement(currentNode));
    execEffect(currentNode)
    // child
    let next;
    if (currentNode.firstChild !== null) {
      containerStack.push(node);
      next = currentNode.firstChild;
    } else if (currentNode.nextSibling !== null) {
      next = currentNode.nextSibling;
    } else if (currentNode.nextSibling === null && currentNode.firstChild === null) {
      // debugger
      while (currentNode.parentNode !== null && currentNode.nextSibling === null) {
        containerStack.pop()
        currentNode = currentNode.parentNode;
      }
      next = currentNode.nextSibling;
    }

    currentNode = next;
  }

  return containerStack.pop()
}