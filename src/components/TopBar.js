import { AppBar, Toolbar, Typography } from '@mui/material'
import { MapOutlined } from '@mui/icons-material'
import { LocaleSelector } from './LocaleSelector'

export const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <MapOutlined sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component="div"
          align="left"
          sx={{ flexGrow: 1 }}
        >
          Map
        </Typography>
        <LocaleSelector />
      </Toolbar>
    </AppBar>
  )
}
