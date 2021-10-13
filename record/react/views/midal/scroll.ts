
function beginSliding(e) {
  box.onpointermove = slide;
  console.log(e)
  console.log(e.pointerId)
  box.setPointerCapture(e.pointerId);
}

function stopSliding(e) {
  box.onpointermove = null;
  box.releasePointerCapture(e.pointerId);
}

function slide(e) {
  box.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 500}px)`;
}



const box = document.querySelector(".box");

box.onpointerdown = beginSliding;
box.onpointerup = stopSliding