import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'

import { startCreatingUserWithEmailPassword } from '../../store/auth'
import { useForm } from '../../hooks'
import { Auth } from '../layout'

const formData = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations = {
  displayName: [(value) => value.length >= 2, 'Name is required.'],
  email: [(value) => value.includes('@'), 'Email must have an @'],
  password: [
    (value) => value.length >= 6,
    'Password must have more than 6 letters.'
  ]
}

export function Register() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const dispatch = useDispatch()

  const {
    displayName,
    displayNameValid,
    email,
    emailValid,
    formState,
    isFormValid,
    onInputChange,
    password,
    passwordValid
  } = useForm(formData, formValidations)

  const onSubmit = (evt) => {
    evt.preventDefault()
    setFormSubmitted(true)
    if (!isFormValid) return
    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <Auth title='Sign up'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item sx={{ mt: 2 }} xs={12}>
            <TextField
              fullWidth
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
              label='Name'
              name='displayName'
              placeholder='Type your name'
              type='text'
              value={displayName}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item sx={{ mt: 2 }} xs={12}>
            <TextField
              fullWidth
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
              label='E-mail'
              name='email'
              placeholder='Type your email'
              type='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item sx={{ mt: 2 }} xs={12}>
            <TextField
              fullWidth
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              label='Password'
              name='password'
              placeholder='Type your password'
              type='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button fullWidth type='submit' variant='contained'>
                Create an account
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>
              Do you already have an account?
            </Typography>

            <Link color='inherit' component={RouterLink} to='/auth/login'>
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </Auth>
  )
}
