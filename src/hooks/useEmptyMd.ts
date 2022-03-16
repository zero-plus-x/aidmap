import { useEffect, useState } from 'react'

const emptyMdFileName = `empty.md`

export const useEmptyMd = () => {
  const [emptyMd, setEmptyMd] = useState('')

  useEffect(() => {
    import(`../markdown/${emptyMdFileName}`).then((response) => {
      fetch(response.default)
        .then((res) => res.text())
        .then((res) => setEmptyMd(res))
        .catch((err) => console.log(err))
    })
  }, [])

  return {
    emptyMd,
  }
}
