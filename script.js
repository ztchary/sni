window.onload = e=>{
  document.body.addEventListener("dragover", e=>{
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy";
  })
  document.body.ondrop = e=>{
    document.body.innerHTML = ""
    e.stopPropagation()
    e.preventDefault()
    let files = e.dataTransfer.files
    let reader = new FileReader()
    reader.onload = async function(e) {
      let data = new Uint8Array(e.target.data)
      let data32 = new Uint32Array(data.slice(0, 8).buffer)
      if (data32[0] != 558452307) {
        alert("terrible")
        return
      }
      let width = data32[1]
      let height = (data.length / 4 - 2) / width

      let cv = document.createElement("canvas")
      let ctx = cv.getContext("2d")
      let imgdata = new ImageData(width, height)
      imgdata.data.set(data.slice(8))
      cv.width = width
      cv.height = height
      ctx.putImageData(imgdata, 0, 0)
      document.body.appendChild(cv)
    }
    reader.readAsArrayBuffer(files[0])
  }
}
