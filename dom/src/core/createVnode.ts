import { Element$, ViewType, createElement } from "../interface";


function atString(el: unknown) {
  let vNode = createElement();

  // @ts-ignore
  vNode.text = `${el}`;
  vNode.static = true;
  return vNode;
}

// function atArray(list: unknown[]): VNode[] {
//   let res = [];
//   let len = list.length;

//   for (let i = 0; i < len; i++) {
//     let el = list[i];
//     if (el instanceof Array) {
//       res.push(...atArray(el));
//     } else if (el instanceof VNode) {
//       res.push(el);
//     } else {
//       res.push(atString(el));
//     }
//   }
//   return res;
// }


// export function createVnodeInstance(
//   type: VNode["type"],
//   props: VNode["props"],
//   childrens: unknown[]
// ) {
//   let vNode = createVnodeStruct();
//   let children = atArray(childrens);
//   vNode.type = type;
//   vNode.props = props || {};
//   let firstChild = children.shift();
//   if (firstChild !== null && firstChild !== undefined) {
//     firstChild.parentNode = vNode;
//   }
//   let curr = firstChild;
//   let el = children.shift();

//   while (el !== null && el !== undefined) {
//     curr.nextSibling = el;
//     el.prevSibling = curr;
//     el.parentNode = curr.parentNode;

//     curr = el;
//     el = children.shift();
//   }
//   vNode.firstChild = firstChild || null;
//   vNode.lastChild = curr || null;
//   return vNode;
// }




function atarr(childs: unknown[]) {
  let res = [];

  childs.forEach(child => {
    if (child instanceof Array) {
      res.push(...atarr(child))
    } else if (child instanceof Element$) {
      res.push(child)
    } else {
      console.log(child);

      res.push(atString(child))
    }
  })

  return res;
}


export function createNode(
  type: ViewType,
  props: Record<string, any>,
  ...children: unknown[]
) {

  let el = createElement();
  el.type = type;
  el.props = props;
  el.children = atarr(children)
  return el;
}
