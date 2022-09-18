import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'

import { useForm } from '../../hooks'
import { Auth } from '../layout'

const formData = {
  displayName: 'Test1',
  email: 'test1@test.com',
  password: '123456'
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
  const {
    displayName,
    email,
    displayNameValid,
    emailValid,
    formValid,
    passwordValid,
    onInputChange,
    password
  } = useForm(formData, formValidations)

  console.log(displayNameValid)

  const onSubmit = (evt) => {
    evt.preventDefault()
  }

  return (
    <Auth title='Sign up'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item sx={{ mt: 2 }} xs={12}>
            <TextField
              fullWidth
              error={!displayNameValid}
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
