import React from 'react'

import { useMap } from '../../hooks/useMap'
import { useTranslation } from '../../useTranslation'

import './index.css'

export const Map = ({ countries, setActiveCountryName }) => {
  const t = useTranslation()

  useMap({
    container: '#map',
    countries,
    setActiveCountryName,
    t,
  })

  return (
    <>
      <svg id="map" width="100%" height="700" />
    </>
  )
}
