export async function fileUpload(file) {
  if (!file) throw new Error("We don't have any file to upload")

  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/olemar/upload'
  const formData = new FormData() // for send key/value as headers

  formData.append('upload_preset', 'react-journal-course')
  formData.append('file', file)

  try {
    const resp = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData
    })

    if (!resp.ok) throw new Error('Could not upload image')
    const cloudResp = await resp.json()

    return cloudResp.secure_url
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
