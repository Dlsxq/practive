


export function createElement<T extends HTMLElement = HTMLElement>(tagName: string): T {
  return document.createElement(tagName) as T;
}

export function setTextContent<E extends HTMLElement = HTMLElement>(content: unknown, node: E) {
  node.textContent = content.toString();
}




interface Dom<E extends HTMLElement = HTMLElement> {
  (id: string): E
  create<T extends HTMLElement = HTMLElement>(tagName: string): T
  setHtml(content: unknown, node: E): void
}

export const dom: Dom = (key: string) => document.querySelector(key);

dom.setHtml = setTextContent
dom.create = createElement
 