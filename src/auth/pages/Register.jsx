import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'

import { Auth } from '../layout'

export function Register() {
  return (
    <Auth title='Sign up'>
      <form>
        <Grid container>
          <Grid item sx={{ mt: 2 }} xs={12}>
            <TextField
              fullWidth
              label='Name'
              placeholder='Type your name'
              type='text'
            />
          </Grid>

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
            <Grid item xs={12}>
              <Button fullWidth variant='contained'>
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
