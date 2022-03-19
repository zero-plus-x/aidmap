import { useLocale } from 'contexts'
import { useEffect, useState } from 'react'

const emptyMdLocationName = `_empty`

export const useEmptyMd = () => {
  const [emptyMd, setEmptyMd] = useState('')
  const locale = useLocale()

  useEffect(() => {
    import(`../markdown/${emptyMdLocationName}/${locale}.md`).then((response) => {
      fetch(response.default)
        .then((res) => res.text())
        .then((res) => setEmptyMd(res))
        .catch((err) => console.log(err))
    })
  }, [locale])

  return {
    emptyMd,
  }
}
