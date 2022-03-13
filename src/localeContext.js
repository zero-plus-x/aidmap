import { createContext, useContext, useState } from 'react'

const localeContext = createContext()
const localeSetContext = createContext()

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('en')

  return (
    <localeContext.Provider value={locale}>
      <localeSetContext.Provider value={setLocale}>
        {children}
      </localeSetContext.Provider>
    </localeContext.Provider>
  )
}

export const useLocale = () => useContext(localeContext)
export const useSetLocale = () => useContext(localeSetContext)
