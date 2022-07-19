import { Box, Toolbar } from '@mui/material'

import { Navbar, SideBar } from '../components'

const drawerWidth = 280 // px - width of drawer, for show and hide sidebar

export function JournalLayout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
