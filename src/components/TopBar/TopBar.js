import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { LocaleSelector } from '../LocaleSelector/LocaleSelector'

export const TopBar = () => {
  const title = ['Ukraine Refugees', 'Help Map']

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {title.map((text) => (
            <Typography
              key={text}
              component="h1"
              variant="button"
              display="block"
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
