import React, { useState } from 'react'
import { PointInfo } from '../PointInfo'
import useScreenSize from '../../hooks/useScreenSize'
import { Countries } from '../Countries'

const Map = ({ points, countries }) => {
  const [activePoint, setActivePoint] = useState(null)
  const { width, height, margin } = useScreenSize()

  return (
    <>
      <svg
        fill="#ececec"
        height={height}
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".1"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        style={{ marginLeft: `${margin}px` }}
        xmlns="http://www.w3.org/2000/svg"
        onClick={(event) => {
          console.log(event)
        }}
      >
        <Countries countries={countries} />
        <circle cx="399.9" cy="390.8" id="0"></circle>
        <circle cx="575.4" cy="412" id="1"></circle>
        <circle cx="521" cy="266.6" id="2"></circle>
        {Object.entries(points).map(([code, point]) => (
          <circle
            key={code}
            cx={point.coordinates.x}
            cy={point.coordinates.y}
            r={7}
            fill="#3366ff"
            stroke="#3366ff"
            strokeWidth="5"
            strokeOpacity={0.5}
            onClick={() => {
              setActivePoint(point)
            }}
          />
        ))}
      </svg>
      {activePoint && (
        <PointInfo
          {...activePoint}
          onClose={() => {
            setActivePoint(null)
          }}
        />
      )}
    </>
  )
}

export default Map