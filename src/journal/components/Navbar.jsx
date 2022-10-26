import { useDispatch } from 'react-redux'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import { startLogout } from '../../store/auth'

export function Navbar({ drawerWidth = 240 }) {
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(startLogout())
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlinedIcon />
        </IconButton>

        <Grid
          container
          alignItems='center'
          direction='row'
          justifyContent='space-between'
        >
          <Typography noWrap component='div' variant='h6'>
            Journal-Ole
          </Typography>

          <IconButton color='error' onClick={onLogout}>
            <LogoutOutlinedIcon />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
