import { ImageList, ImageListItem } from '@mui/material'

export function ImageGallery({ images = [] }) {
  return (
    <ImageList cols={4} rowHeight={200} sx={{ width: '100%', height: 500 }}>
      {images.map((image) => (
        <ImageListItem key={image} sx={{ aspectRatio: 1 / 1 }}>
          <img
            alt='Note image'
            loading='lazy'
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
