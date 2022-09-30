import { useSelector } from 'react-redux'
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'

import { SideBarItem } from './SideBarItem.jsx'

export function SideBar({ drawerWidth = 240 }) {
  const { displayName } = useSelector((state) => state.auth)
  const { notes } = useSelector((state) => state.journal)

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
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  )
}
