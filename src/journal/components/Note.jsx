import { Button, Grid, TextField, Typography } from '@mui/material'
import { SaveOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

import { useForm } from '../../hooks'

import { ImageGallery } from './ImageGallery.jsx'

export function Note() {
  const { active: note } = useSelector((state) => state.journal)

  const { title, body, date, onInputChange } = useForm({
    title: note.title,
    body: note.body,
    date: note.date
  })

  const dateString = useMemo(() => {
    const newDate = new Date(date)

    return newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }, [date])

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
          {dateString}
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
          name='title'
          placeholder='Write a title'
          sx={{ mb: 1, border: 'none' }}
          type='text'
          value={title}
          variant='filled'
          onChange={onInputChange}
        />

        <TextField
          fullWidth
          multiline
          minRows={5}
          name='body'
          placeholder='What happened today?'
          type='text'
          value={body}
          variant='filled'
          onChange={onInputChange}
        />
      </Grid>

      <ImageGallery />
    </Grid>
  )
}
