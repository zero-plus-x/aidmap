import React, { useState } from 'react'

import { PointInfo } from '../PointInfo'
import { CountryInfo } from '../CountryInfo'
import { useMap } from '../../hooks/useMap'

import './index.css'

const Map = ({ countries, points, connections }) => {
  const [activePoint, setActivePoint] = useState(null)
  const [activeCountry, setActiveCountry] = useState(null)

  useMap({
    container: '#map',
    countries,
    points,
    connections,
    setActivePoint,
    setActiveCountry,
  })

  return (
    <>
      <svg id='map' width='100%' height='700' />
      {activePoint && (
        <PointInfo
          {...activePoint}
          onClose={() => {
            setActivePoint(null)
          }}
        />
      )}
      {activeCountry && (
        <CountryInfo
          {...activeCountry}
          onClose={() => {
            setActiveCountry(null)
          }}
        />
      )}
    </>
  )
}

export default Map
