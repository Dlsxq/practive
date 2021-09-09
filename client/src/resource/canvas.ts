

const canvas = document.querySelector("#canvas") as HTMLCanvasElement


canvas.width = 800

const ctx = canvas.getContext("2d")

let isMove = false;
let prev = 500


canvas.addEventListener("pointerdown", function startDown(e: any) {
  console.log("开始移动")
  e.target.setPointerCapture(e.pointerId)
  isMove = true
})

canvas.addEventListener("pointerup", function stop(e: any) {
  e.target.releasePointerCapture(e.pointerId)
  isMove = false
})
canvas.addEventListener("pointermove", function move(e: any) {
  if (!isMove) return
  let cux = e.offsetX;

  // ctx.clearRect(prev, prev, 20, 20)

  ctx.beginPath()
  ctx.moveTo(cux, 0)
  ctx.lineTo(cux, 200)
  ctx.strokeStyle = "blue";
  ctx.stroke();
  prev = cux;


})

// green
ctx.beginPath()


ctx.moveTo(prev, -10)
ctx.lineTo(prev, 200);


ctx.lineWidth = 2;
ctx.strokeStyle = "green";
ctx.stroke();


// red
ctx.beginPath()
ctx.moveTo(prev + 100, 0)
ctx.lineTo(prev + 100, 200)
ctx.strokeStyle = "red"
ctx.stroke()



export function Fffffff() {
  
}