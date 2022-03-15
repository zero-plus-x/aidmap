import { useState } from 'react'
import { useLocale, useSetLocale } from '../contexts/localeContext'
import { Menu, MenuItem, Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const LANGUAGES = [
  { code: 'uk', title: 'Українська' },
  { code: 'en', title: 'English' },
  { code: 'ru', title: 'Русский' },
]

export const LocaleSelector = () => {
  const locale = useLocale()
  const setLocale = useSetLocale()

  const [anchor, setAnchor] = useState(null)

  const currentLanguage = LANGUAGES.find((item) => item.code === locale)

  const handleClick = (event) => {
    setAnchor(event.currentTarget)
  }

  const handleClose = (language) => {
    if (language) {
      setLocale(language)
    }
    setAnchor(null)
  }

  return (
    <>
      <Button color="inherit" endIcon={<KeyboardArrowDownIcon />} onClick={handleClick}>
        {currentLanguage.title}
      </Button>
      <Menu anchorEl={anchor} open={!!anchor} onClose={() => handleClose(null)}>
        {LANGUAGES.map((lang) => (
          <MenuItem key={lang.code} onClick={() => handleClose(lang.code)}>
            {lang.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
