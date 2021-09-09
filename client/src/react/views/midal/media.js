

const video = document.getElementById("midia-video")

function query(selector) {

  return document.querySelector(selector)
}



const resNode = query("#play-video");


const stateNode = query("#midal-state");

let chunks = []
const fileRender = new FileReader();

let a = document.createElement("a")

function download(blob) {
  a.download = "video.webm"
  a.href = blob
  a.click()
}

fileRender.onload = function fileOnload(evl) {
  video.src = dataUrl
}

resNode.addEventListener("click", () => {
  stateNode.textContent = "播放录制视频初始化"
  video.src = "http://localhost:4096/video.webm"
  // setTimeout(() => {
  //   stateNode.textContent = "播放录制视频"
  //   let source = chunks[0]
  //   let url = URL.createObjectURL(source);
  //   download(url)
  //   video.src = url;
  // }, 1500)
})

query("#start-midia").addEventListener("click", async () => {
  stateNode.textContent = "开始摄像头"
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,  // 唤起内面的摄像头，
    audio: true  // 需要音频，例如麦克风
  })

  video.srcObject = stream
  let mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

  query("#start").addEventListener("click", () => {
    mediaRecorder.start()
    stateNode.textContent = "开始录制"
  })

  query("#stop").addEventListener("click", () => {
    stateNode.textContent = "停止录制"
    mediaRecorder.stop()

  })
  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
  }


  query("#stop-midia").addEventListener("click", () => {
    let track = stream.getTracks()
    stateNode.textContent = "停止摄像头"
    track[0].stop()
    track[1].stop()
  })
})

