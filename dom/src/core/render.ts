import { VNode } from "../interface";
import { update } from "./update";
import { commitChildToContainer } from './append';
import { initRootContainerEvents } from './event';


function createRenderTree(container: DocumentFragment, root: VNode) {
  // containerStack.push(container);
  // // let curr = renderTree;
  // while (renderTree !== null) {
  //   let parentNode = containerStack[containerStack.length - 1]
  //   let node = createElement(renderTree);

  //   // child
  //   let next;

  //   parentNode.appendChild(node);
  //   if (renderTree.firstChild !== null) {
  //     containerStack.push(node);
  //     next = renderTree.firstChild;
  //   } else if (renderTree.nextSibling !== null) {
  //     next = renderTree.nextSibling;
  //   } else if (renderTree.nextSibling === null && renderTree.firstChild === null) {
  //     while (renderTree.parentNode !== null && renderTree.nextSibling === null) {
  //       containerStack.pop()
  //       renderTree = renderTree.parentNode;
  //     }
  //     next = renderTree.nextSibling;
  //   }

  //   renderTree = next;
  // }

  // debugger
  // return containerStack.pop()
  let rootHtml = commitChildToContainer(root);
  container.appendChild(rootHtml)
}


function workLoop(work, ...args: any) {
  return work(...args)
}


export function render(container: HTMLElement, workTree: VNode) {
  initRootContainerEvents(container)

  let node = workLoop(createRenderTree, container, workTree)

}