import { Close } from '@mui/icons-material'
import data from '../data/data.json'
import { AppBar, Dialog, IconButton, List, Toolbar, Typography } from '@mui/material'
import Markdown from 'markdown-to-jsx'
import { useTranslation } from '../useTranslation'
import { LocaleSelector } from './LocaleSelector'
import { useEffect, useState } from 'react'
import { useLocale } from '../localeContext'
import { useActiveCountryName, useSetActiveCountryName } from '../activeCountryNameContext'

export const CountryInfo = () => {
  const t = useTranslation()
  const locale = useLocale()
  const activeCountryName = useActiveCountryName()
  const setActiveCountryName = useSetActiveCountryName()
  const [countryMd, setCountryMd] = useState('')
  const [emptyMd, setEmptyMd] = useState('')

  useEffect(() => {
    import(`../markdown/empty.md`).then((res) => {
      fetch(res.default)
        .then((res) => res.text())
        .then((res) => setEmptyMd(res))
        .catch((err) => console.log(err))
    })
  }, [])

  useEffect(() => {
    import(`../markdown/${activeCountryName}/${locale}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setCountryMd(res))
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  })

  if (!activeCountryName) {
    return null
  }

  const countryData = data.countries[activeCountryName]
  const { nameCode } = countryData

  return (
    <Dialog fullScreen open>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setActiveCountryName(null)
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {t(nameCode)}
          </Typography>
          <LocaleSelector />
        </Toolbar>
      </AppBar>
      <List style={{ padding: '10px 20px' }}>
        <Markdown>{countryMd || emptyMd}</Markdown>
      </List>
    </Dialog>
  )
}
