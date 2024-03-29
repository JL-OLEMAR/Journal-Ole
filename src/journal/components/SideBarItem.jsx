import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot'

import { setActiveNote } from '../../store/journal'

export function SideBarItem({ body, date, id, imageUrls = [], title = '' }) {
  const dispatch = useDispatch()

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title
  }, [title])

  const onClickNote = () => {
    dispatch(setActiveNote({ body, date, id, imageUrls, title }))
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNotIcon />
        </ListItemIcon>

        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
