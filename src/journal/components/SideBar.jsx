import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { useSelector } from 'react-redux'

export function SideBar({ drawerWidth = 240 }) {
  const { displayName } = useSelector((state) => state.auth)

  return (
    <Box component='nav' sx={{ width: drawerWidth, flexShrink: { sm: 0 } }}>
      <Drawer
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        variant='permanent'
      >
        <Toolbar>
          <Typography noWrap component='div' variant='h6'>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {['January', 'February', 'March', 'April'].map((month) => (
            <ListItem key={month} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TurnedInNot />
                </ListItemIcon>

                <Grid container>
                  <ListItemText primary={month} />
                  <ListItemText
                    secondary={
                      'Ex adipisicing non anim aliquip labore deserunt mollit quis est aliqua Lorem.'
                    }
                  />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}
