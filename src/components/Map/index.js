import React, { useState } from 'react'

import { CountryInfo } from '../CountryInfo'
import { useMap } from '../../hooks/useMap'

import './index.css'

const Map = ({ countries, points, connections }) => {
  const [activeCountry, setActiveCountry] = useState(null)

  useMap({
    container: '#map',
    countries,
    points,
    connections,
    setActiveCountry,
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
