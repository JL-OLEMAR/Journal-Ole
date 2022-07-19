import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'

import { Auth } from '../layout'

export function Login() {
  return (
    <Auth title='Login'>
      <form>
        <Grid container>
          <Grid item sx={{ mt: 2 }} xs={12}>
            <TextField
              fullWidth
              label='E-mail'
              placeholder='Type your email'
              type='email'
            />
          </Grid>

          <Grid item sx={{ mt: 2 }} xs={12}>
            <TextField
              fullWidth
              label='Password'
              placeholder='Type your password'
              type='password'
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item sm={6} xs={12}>
              <Button fullWidth variant='contained'>
                Login
              </Button>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button fullWidth variant='contained'>
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
