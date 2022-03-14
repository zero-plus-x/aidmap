import React, { useState } from 'react'

import { CountryInfo } from '../CountryInfo'
import { useMap } from '../../hooks/useMap'
import { useTranslation } from '../../useTranslation'

import './index.css'

const Map = ({ countries }) => {
  const [activeCountry, setActiveCountry] = useState(null)

  const t = useTranslation()

  useMap({
    container: '#map',
    countries,
    setActiveCountry,
    t,
  })

  return (
    <>
      <svg id='map' width='100%' height='700' />
      {activeCountry && (
        <CountryInfo
          {...activeCountry}
          onClose={() => setActiveCountry(null)}
        />
      )}
    </>
  )
}

export default Map
