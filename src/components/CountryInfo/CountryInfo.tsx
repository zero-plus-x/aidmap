import { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'

import { Close } from '@mui/icons-material'
import {
  AppBar,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'

import { Countries } from 'types'
import { useLocale, useActiveCountryName, useSetActiveCountryName } from 'contexts'
import { useEmptyMd, useTranslation } from 'hooks'
import { LocaleSelector } from 'components'

import data from '../../data/data.json'

export const CountryInfo: React.FC = () => {
  const t = useTranslation()
  const locale = useLocale()
  const activeCountryName = useActiveCountryName()
  const setActiveCountryName = useSetActiveCountryName()
  const [isLoading, setIsLoading] = useState(true)
  const [countryMd, setCountryMd] = useState('')
  const { emptyMd } = useEmptyMd()

  const countries: Countries = data.countries

  useEffect(() => {
    if (activeCountryName) {
      import(`../../markdown/${activeCountryName}/${locale}.md`)
        .then((response) => {
          fetch(response.default)
            .then((res) => res.text())
            .then((res) => setCountryMd(res))
            .catch((err) => console.log(err))
        })
        .finally(() => setIsLoading(false))
        .catch((err) => console.log(err))
    }
  })

  useEffect(() => {
    setCountryMd('')
    setIsLoading(true)
  }, [activeCountryName, locale])

  if (!activeCountryName) {
    return null
  }

  const { nameCode } = countries[activeCountryName]

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
        {isLoading ? <CircularProgress /> : <Markdown>{countryMd || emptyMd}</Markdown>}
      </DialogContent>
    </Dialog>
  )
}
