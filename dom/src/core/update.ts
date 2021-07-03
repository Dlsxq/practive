import { activeHooks } from "./effect";
import { VNode } from "../interface";
import { commitChildToContainer } from "./append"




export function update(container, workTree: VNode) {

  let rootHtml = commitChildToContainer(workTree);
  container.appendChild(rootHtml)
}