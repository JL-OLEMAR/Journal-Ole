import { Grid, Typography } from '@mui/material'
import { StarOutline } from '@mui/icons-material'

export function NothingSelect() {
  return (
    <Grid
      container
      alignItems='center'
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
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      </Grid>

      <Grid item xs={12}>
        <Typography color='white' variant='h5'>
          Select or create an entry
        </Typography>
      </Grid>
    </Grid>
  )
}
