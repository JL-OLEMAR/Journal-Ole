import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { SaveOutlined } from '@mui/icons-material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from '../../hooks'
import { setActiveNote, startSaveNote } from '../../store/journal'

import { ImageGallery } from './ImageGallery.jsx'

export function Note() {
  const dispatch = useDispatch()
  const {
    active: note,
    isSaving,
    savedMessage
  } = useSelector((state) => state.journal)
  const { title, body, date, formState, onInputChange } = useForm(note)

  const dateString = useMemo(() => {
    const newDate = new Date(date)

    return newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [dispatch, formState])

  useEffect(() => {
    if (savedMessage.length > 0) {
      Swal.fire('Updated note', savedMessage, 'success')
    }
  }, [savedMessage])

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

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
        <Button
          color='primary'
          disabled={isSaving}
          sx={{ padding: 2 }}
          onClick={onSaveNote}
        >
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
