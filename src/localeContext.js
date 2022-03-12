import { createContext, useContext, useState } from 'react'

const localeContext = createContext()

export const LocaleProvider = ({ children }) => {
  const [locale] = useState('en')
  return (
    <localeContext.Provider value={locale}>{children}</localeContext.Provider>
  )
}


export const useLocale = () => useContext(localeContext)