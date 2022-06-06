

const div = document.createElement("div");

const loading = document.createElement("div");
loading.textContent = "loading...";

function render() {


  div.textContent = "Main App";
  div.style.cssText = `text-align: center;font-size:36px;`;

  div.append(loading);
  document.body.append(div);
}

render();

function click() {
  console.log("Click");
}

import("subapp/child").then(moduleObjects => {
  let elementName = moduleObjects.default;
  let el = document.createElement(elementName);

  el.click(click);
  loading.replaceWith(el);
});