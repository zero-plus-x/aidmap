import { useLocale, useSetLocale } from '../localeContext'
import { MenuItem, Select } from '@mui/material'

export const LocaleSelector = () => {
  const locale = useLocale()
  const setLocale = useSetLocale()

  return (
    <Select
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
    >
      <MenuItem value={'uk'}>Українська</MenuItem>
      <MenuItem value={'en'}>English</MenuItem>
      <MenuItem value={'ru'}>Русский</MenuItem>
    </Select>
  )
}
