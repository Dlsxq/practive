

const nodeToString = (node) => {
  let xml = new XMLSerializer()
  let str = xml.serializeToString(node)
  return str
}


globalThis.fn = function fn(node, isDownload) {
  let sgvBlob = new Blob([new XMLSerializer().serializeToString(node)], { type: "image/svg+xml" })
  let url = URL.createObjectURL(sgvBlob)
  let image = new Image()


  image.src = url;
  image.onload = () => {
    if (isDownload) {
      let a = document.createElement("a")
      a.download = "svg.svg"
      a.href = url
      a.click()
    }
  }
}