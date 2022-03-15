import { useEffect, useState } from 'react'

import { Close } from '@mui/icons-material'
import data from '../../data/data.json'

import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography } from '@mui/material'
import Markdown from 'markdown-to-jsx'
import { useTranslation } from '../../hooks/useTranslation'
import { LocaleSelector } from '../LocaleSelector'
import { useLocale } from '../../contexts/localeContext'
import {
  useActiveCountryName,
  useSetActiveCountryName,
} from '../../contexts/activeCountryNameContext'

export const CountryInfo = () => {
  const t = useTranslation()
  const locale = useLocale()
  const activeCountryName = useActiveCountryName()
  const setActiveCountryName = useSetActiveCountryName()
  const [countryMd, setCountryMd] = useState('')
  const [emptyMd, setEmptyMd] = useState('')

  useEffect(() => {
    import(`../../markdown/empty.md`).then((res) => {
      fetch(res.default)
        .then((res) => res.text())
        .then((res) => setEmptyMd(res))
        .catch((err) => console.log(err))
    })
  }, [])

  useEffect(() => {
    import(`../../markdown/${activeCountryName}/${locale}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setCountryMd(res))
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  })

  useEffect(() => {
    setCountryMd('')
  }, [activeCountryName, locale])

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
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" noWrap>
            {t(nameCode)}
          </Typography>
          <LocaleSelector />
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Markdown>{countryMd || emptyMd}</Markdown>
      </DialogContent>
    </Dialog>
  )
}
