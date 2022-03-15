import React from 'react'

import { useMap } from '../../hooks/useMap'
import { useTranslation } from '../../hooks/useTranslation'

import './index.css'

export const Map = ({ countries }) => {
  const t = useTranslation()

  useMap({
    container: '#map',
    countries,
    t,
  })

  return (
    <svg
      id="map"
      width="100%"
      height="100%"
    />
  )
}
