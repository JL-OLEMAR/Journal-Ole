import { CircularProgress, Grid } from '@mui/material'

export function CheckingAuth() {
  return (
    <Grid
      container
      alignItems='center'
      direction='column'
      justifyContent='center'
      spacing={0}
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid container direction='row' justifyContent='center'>
        <CircularProgress color='warning' />
      </Grid>
    </Grid>
  )
}
