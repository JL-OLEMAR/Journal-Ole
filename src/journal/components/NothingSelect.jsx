import { Grid, Typography } from '@mui/material'
import StarOutlineIcon from '@mui/icons-material/StarOutline'

export function NothingSelect() {
  return (
    <Grid
      container
      alignItems='center'
      className='animate__animated animate__fadeIn animate__faster'
      direction='column'
      justifyContent='center'
      spacing={0}
      sx={{
        minHeight: 'calc(100vh - 110px)',
        backgroundColor: 'primary.main',
        borderRadius: 3
      }}
    >
      <Grid item xs={12}>
        <StarOutlineIcon sx={{ fontSize: 100, color: 'white' }} />
      </Grid>

      <Grid item xs={12}>
        <Typography color='white' variant='h5'>
          Select or create an entry
        </Typography>
      </Grid>
    </Grid>
  )
}
