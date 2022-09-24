import { Button, Grid, TextField, Typography } from '@mui/material'
import { SaveOutlined } from '@mui/icons-material'

import { ImageGallery } from './ImageGallery.jsx'

export function Note() {
  return (
    <Grid
      container
      alignItems='center'
      className='animate__animated animate__fadeIn animate__faster'
      direction='row'
      justifyContent='space-between'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          August 28, 2023
        </Typography>
      </Grid>

      <Grid item>
        <Button color='primary' sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          fullWidth
          label='Title'
          placeholder='Write a title'
          sx={{ mb: 1, border: 'none' }}
          type='text'
          variant='filled'
        />

        <TextField
          fullWidth
          multiline
          minRows={5}
          placeholder='What happened today?'
          type='text'
          variant='filled'
        />
      </Grid>

      <ImageGallery />
    </Grid>
  )
}
