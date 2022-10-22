import { fetch } from 'whatwg-fetch'
import { v2 as cloudinary } from 'cloudinary'

import { getEnvironments } from '../../../src/helpers/getEnvironments.js'
import { fileUpload } from '../../../src/journal/helpers/fileUpload.js'

const {
  VITE_CLOUDINARY_CLOUD_NAME,
  VITE_CLOUDINARY_API_KEY,
  VITE_CLOUDINARY_API_SECRET
} = getEnvironments()

cloudinary.config({
  cloud_name: VITE_CLOUDINARY_CLOUD_NAME,
  api_key: VITE_CLOUDINARY_API_KEY,
  api_secret: VITE_CLOUDINARY_API_SECRET,
  secure: true
})

describe('Tests in fileUpload', () => {
  test('should upload the file to Cloudinary correctly', async () => {
    const imageUrl =
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'

    const resp = await fetch(imageUrl)
    const blob = await resp.blob()
    const file = new File([blob], 'photo.png')
    const url = await fileUpload(file)

    expect(typeof url).toBe('string')

    const imageId = url.split('/').at(-1).replace('.png', '')

    // Remove image from cloudinary by imageId
    await cloudinary.api.delete_resources([`journal-react-app/${imageId}`], {
      resource_type: 'image'
    })
  })

  test('should return null', async () => {
    const file = new File([], 'photo.png')
    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})
