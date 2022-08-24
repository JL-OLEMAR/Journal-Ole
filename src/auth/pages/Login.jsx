import { useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'

import { useForm } from '../../hooks'
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth'
import { Auth } from '../layout'

export function Login() {
  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm({
    email: 'test1@test.com',
    password: '123456'
  })

  const onSubmit = (evt) => {
    evt.preventDefault()

    console.log({ email, password })
    dispatch(checkingAuthentication())
  }

  const onGoogleSignIn = () => {
    console.log('SignIn with google :)')
    dispatch(startGoogleSignIn())
  }

  return (
    <Auth title='Login'>
      <form onSubmit={onSubmit}>
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
              label='Password'
              name='password'
              placeholder='Type your password'
              type='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item sm={6} xs={12}>
              <Button fullWidth type='submit' variant='contained'>
                Login
              </Button>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                fullWidth
                type='button'
                variant='contained'
                onClick={onGoogleSignIn}
              >
                <Google />
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
