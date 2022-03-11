import { useLocale } from './localeContext'
import * as translations from './data/i18n.json'

export const useTranslation = () => {
  const locale = useLocale()

  return (key) => {
    if (translations[key] === undefined) return key

    const translation = translations[key][locale]

    return translation || key
  }
}
