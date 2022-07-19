import { Box } from '@mui/material'

import { Navbar } from '../components'

const drawerWidth = 240 // px - width of drawer, for show and hide sidebar

export function JournalLayout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar drawerWidth={drawerWidth} />

      {/* Sidebar drawerWidth */}

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar */}
        {children}
      </Box>
    </Box>
  )
}
