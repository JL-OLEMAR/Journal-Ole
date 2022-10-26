import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import { startNewNote } from '../../store/journal'
import { Note, NothingSelect } from '../components'
import { JournalLayout } from '../layout'

export function Journal() {
  const { active, isSaving } = useSelector((state) => state.journal)
  const dispatch = useDispatch()

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {!!active ? <Note /> : <NothingSelect />}

      <IconButton
        disabled={isSaving}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        onClick={onClickNewNote}
      >
        <AddOutlinedIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
