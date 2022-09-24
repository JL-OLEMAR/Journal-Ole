import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

import { JournalLayout } from '../layout'
import { Note, NothingSelect } from '../components'

export function Journal() {
  return (
    <JournalLayout>
      {/* <Typography>
        Ex adipisicing non anim aliquip labore deserunt mollit quis est aliqua
        Lorem eu cupidatat dolor. Dolor est id ad dolore incididunt aliquip
        commodo enim id duis sit nulla. Sit enim cillum nisi eu esse ex
        reprehenderit cillum. Ullamco consectetur veniam eiusmod minim elit
        officia. Quis sint fugiat do amet ad qui irure minim ea aliqua.
      </Typography> */}

      <NothingSelect />
      {/* <Note /> */}

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
