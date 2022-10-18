import { fetch } from 'whatwg-fetch'
import { v2 as cloudinary } from 'cloudinary'

import { fileUpload } from '../../../src/journal/helpers/fileUpload.js'

cloudinary.config({
  cloud_name: 'olemar',
  api_key: '787521131833568',
  api_secret: '6-KjeN-x8c2QK1xpVgyuhUeRDeo',
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
