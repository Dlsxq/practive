import { effect, nextTick, reactive, watchEffect, } from "../../reactivity";



let html = `
<div>{name}</div>
<div>{count}</div>
<div>{pol}</div>
`;



let container = document.createElement("div");

container.style.padding = "16px";


class Component {

  private html = null;

  constructor(
    public template: string,
    public state: any
  ) {
    effect(this.effect.bind(this));
  }

  effect() {

    let html = this.template.replace(/({((\w+))})/g, (a1, a2, a3, a4, a5) => {
      let value = this.state[a3];
      return value;
    });
    this.html = html;

    this.update?.();
  }

  update: Function = null;

  appendChildToContainer(c: HTMLElement) {
    c.innerHTML = this.html;
  }

}


function main() {


  let state = reactive({
    name: "大炮",
    count: 123,
    pol: 123
  });

  let com = new Component(html, state);

  globalThis.state = state;

  com.appendChildToContainer(container);

  document.body.append(container);

  nextTick(() => {
    com.update = () => {
      container.innerHTML = null;
      com.appendChildToContainer(container);
      document.body.replaceChild(container, container);
    }
  });
}

main();


