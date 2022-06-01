import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { LocaleSelector } from '../LocaleSelector/LocaleSelector'
import logo from './logo192.png'

export const TopBar = () => (
  <AppBar position="static">
    <Toolbar>
      <img src={logo} height={30} />
      <Box sx={{ flexGrow: 1 }} ml={1} overflow="hidden">
        <Typography component="h1" variant="button" sx={{ lineHeight: 1.3 }}>
          Aidmap
        </Typography>
        <Typography component="h2" variant="caption" whiteSpace="nowrap" sx={{ lineHeight: 1.3 }}>
          Help for Ukrainian Refugees
        </Typography>
      </Box>
      <LocaleSelector />
    </Toolbar>
  </AppBar>
)
