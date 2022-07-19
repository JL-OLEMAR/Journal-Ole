import { Grid, Typography } from '@mui/material'

export function Auth({ children, title = '' }) {
  return (
    <Grid
      container
      alignItems='center'
      direction='column'
      justifyContent='center'
      spacing={0}
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        item
        className='box-shadow'
        sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          width: { sm: 450 } // In pixels
        }}
        xs={3}
      >
        <Typography sx={{ mb: 1 }} variant='h5'>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  )
}
