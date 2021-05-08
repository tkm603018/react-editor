import {useState,useEffect} from 'react'
// import Api from 'utils/Api'
// import useFlash from 'modules/useFlash'

const imageToCanvas = (img, width) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext("2d")
  if (img.width > width) {
    canvas.width = width
    canvas.height = canvas.width * (img.height / img.width)

    // 
    // Regular
    // 
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // 
    // With Smoothing
    // https://stackoverflow.com/a/19262385/3988797
    // 

    // const oc = document.createElement('canvas'),
    //   octx = oc.getContext('2d')
    // oc.width = img.width * 0.5
    // oc.height = img.height * 0.5
    // octx.drawImage(img, 0, 0, oc.width, oc.height)

    // // NOTE: The process below is useful for shrinking size drastically in case the image will be more than half.
    // // octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5)
    // // ctx.drawImage(oc, 
    // //   0, 0, oc.width * 0.5, oc.height * 0.5,
    // //   0, 0, canvas.width, canvas.height)

    // ctx.drawImage(oc, 
    //   0, 0, oc.width, oc.height,
    //   0, 0, canvas.width, canvas.height)
    return canvas
  } else {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0, img.width, img.height)
    return canvas
  }
}
export const getProcessedImage = (file, {maxWidth, variantWidth}) => {
  if (! file.type.match('image.*')) throw Error("Please upload image.")
  return new Promise((resolve, reject)=>{
    const img = new Image()
    img.onerror = (e) => reject("Invalid image.")
    img.onload = () => {
      const mainCanvas = imageToCanvas(img, maxWidth)
      const variantCanvas = imageToCanvas(img, variantWidth)
      mainCanvas.toBlob(mainBlob=>{
        variantCanvas.toBlob(variantBlob=>resolve([mainBlob, variantBlob]), file.type)
      }, file.type)
    }
    img.src = URL.createObjectURL(file)
  })
}

export default ({baseQuery}) => {
  const [loading, setLoading] = useState(false)
  const [assets, setAssets] = useState([])
  // const query = baseQuery || {}

  // const {handleApiError, enqueuePermanentError} = useFlash()

  useEffect(()=>{
    setLoading(true)
    // Api.fetchAuth('/assets', {query}).then(r=>r.json()).then(res=>{
    //   setAssets(res.data)
    //   setLoading(false)
    // }).catch(error=>{
    //   // console.log('abc err',error)
    //   setLoading(false)
    //   // handleApiError(error)
    // })
  }, [])

  const onDrop = (files) => {
    console.log('files', files)
    files.forEach(file => {
      console.log("file", file)
      getProcessedImage(file, { maxWidth: 1100, variantWidth: 300 }).then(artifacts => {
        console.log("file", artifacts)
        const [blob, thumbBlob] = artifacts
        const formData = new FormData()
        formData.append("file", blob)
        formData.append("variant1", thumbBlob, "thumbnail")
        // Object.keys(query).forEach(k => {
        //   formData.append(k, query[k])
        // })
        // storage.ref().child(`images/${postId}/${file.name}`).put(formData).then((snapshot) => {

        // })
        // Api.fetchAuth('/assets/upload', {
        //   method: 'POST',
        //   body: formData
        // }).then(r=>r.json()).then(response=>{
        //   // onUploaded(response.data)
        //   setAssets(_state=>[response.data, ..._state])
        // }).catch(handleApiError)
      }).catch(
        // error => enqueuePermanentError(error)
      )
    })
  }

  return {
    loading, assets, setAssets,
    onDrop
  }
}
