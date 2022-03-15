import { createContext, useContext, useState, useEffect } from 'react'

const localeContext = createContext()
const localeSetContext = createContext()

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en')

  useEffect(() => {
    localStorage.setItem('locale', locale)
  }, [locale])

  return (
    <localeContext.Provider value={locale}>
      <localeSetContext.Provider value={setLocale}>{children}</localeSetContext.Provider>
    </localeContext.Provider>
  )
}

export const useLocale = () => useContext(localeContext)
export const useSetLocale = () => useContext(localeSetContext)
