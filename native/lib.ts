


function dom(selector: string) {
  return new DomHelper(selector);
}

class DomHelper {

  private refNode: HTMLElement = null;

  constructor(selector: string) {
    this.refNode = document.querySelector(selector)!;
  }

  click(handler?: any, options?: boolean | object) {
    if (typeof handler === "function") {
      this.refNode.addEventListener("click", handler, options);
      return this;
    }
    this.refNode.click();
    return this;
  }


}