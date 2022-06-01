import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { LocaleSelector } from '../LocaleSelector/LocaleSelector'
import logo from './logo192.png'

export const TopBar = () => {
  const title = ['Aidmap', 'Help for Ukrainian Refugees']

  return (
    <AppBar position="static">
      <Toolbar>
        <img src={logo} height={30} />
        <Box sx={{ flexGrow: 1 }} ml={1} overflow="hidden">
          {title.map((text) => (
            <Typography
              key={text}
              component="h1"
              variant="button"
              display="block"
              whiteSpace="nowrap"
              sx={{ lineHeight: 1.3 }}
            >
              {text}
            </Typography>
          ))}
        </Box>
        <LocaleSelector />
      </Toolbar>
    </AppBar>
  )
}
