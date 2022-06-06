




class SubApp extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });


    const div = document.createElement("div");
    div.textContent = "child App";
    div.style.cssText = `text-align: center;font-size:36px;`;


    shadowRoot.append(div.cloneNode(true));
  }

  click(fn) {
    if (typeof fn !== "function") {
      return super.click();
    }

    this.addEventListener("click", fn);

    return this.removeEventListener.bind(this, "click", fn, null);
  }
}


customElements.define("sub-app", SubApp);
export default "sub-app";
