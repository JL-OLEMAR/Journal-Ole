import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

import { useForm } from '../../hooks'
import {
  startGoogleSignIn,
  startLoginWithEmailPassword
} from '../../store/auth'
import { Auth } from '../layout'

// Lazy initialization
const formData = {
  email: '',
  password: ''
}

export function Login() {
  const { status, errorMessage } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm(formData)

  // for disable button when status is checking
  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (evt) => {
    evt.preventDefault()
    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  return (
    <Auth title='Login'>
      <form
        aria-label='login-form'
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={onSubmit}
      >
        <Grid container>
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
              inputProps={{ 'data-testid': 'password' }}
              label='Password'
              name='password'
              placeholder='Type your password'
              type='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item display={!!errorMessage ? '' : 'none'} xs={12}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button
                fullWidth
                disabled={isAuthenticating}
                type='submit'
                variant='contained'
              >
                Login
              </Button>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                fullWidth
                aria-label='google-btn'
                disabled={isAuthenticating}
                type='button'
                variant='contained'
                onClick={onGoogleSignIn}
              >
                <GoogleIcon />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link color='inherit' component={RouterLink} to='/auth/register'>
              Create an account
            </Link>
          </Grid>
        </Grid>
      </form>
    </Auth>
  )
}
