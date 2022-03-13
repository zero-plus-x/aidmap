import React, { useEffect, useState } from 'react'
import {
  geoMercator,
  geoPath,
  select,
  zoom,
} from 'd3'
import { feature } from 'topojson-client'
import {
  debounce,
  formatConnections,
  getConnectionPath,
} from '../../utils'
import { PointInfo } from '../PointInfo'
import { CountryInfo } from '../CountryInfo'

import topology from '../../data/topology.json'

import './index.css'

const DEFAULT_SCALE = 0.6
const POINT_RADIUS = 10
const CONNECTION_WIDTH = 10

const Map = ({ countries, points, connections }) => {
  const [activePoint, setActivePoint] = useState(null)
  const [activeCountry, setActiveCountry] = useState(null)

  useEffect(() => {
    const width = window.screen.width
    const height = window.screen.height

    const projection = geoMercator()
      .center([20, 52])
      .translate([width / 2, height / 2])
      .scale([width / DEFAULT_SCALE])

    const svg = select('#map')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const path = geoPath()
      .projection(projection)

    // Render countries
    const map = svg.append('g')
    map.selectAll('path')
      .data(feature(topology, topology.objects.countries).features)
      .enter()
      .append('path')
      .attr('class', d => `country country-${d.properties?.name}`)
      .attr('d', path)
      .style('cursor', d => d.properties?.name ? 'pointer' : 'default')
      .style('fill', d => d.properties?.name ? '#dff1fb' : '#ececec')
      .style('stroke', d => d.properties?.name ? '#006fab' : '#999999')
      .on('click', (event, d) => {
        setActiveCountry(countries[d.properties?.name])
      })

    // Render connections
    const routes = svg.append('g')
    const groups = formatConnections(connections, points, projection)
    Object.entries(groups).forEach(([key, group]) => {
      routes.selectAll(`.connection-${key}`)
        .data(group)
        .enter()
        .append('path')
        .attr('class', `connection connection-${key}`)
        .attr('d', (connection, index) => getConnectionPath(connection, index, group.length))
        .style('fill', 'none')
        .style('stroke', d => d.free ? '#29a736' : '#d53023')
        .style('stroke-width', CONNECTION_WIDTH)
    })

    // Render points
    const cities = svg.append('g')
    cities.selectAll('circle')
      .data(Object.values(points))
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', d => projection([d.coordinates.y, d.coordinates.x])[0])
      .attr('cy', d => projection([d.coordinates.y, d.coordinates.x])[1])
      .attr('r', POINT_RADIUS)
      .style('fill', '#006fab')
      .style('stroke', '#ffffff')
      .style('stroke-width', 2)
      .on('click', (event, d) => setActivePoint(d))

    const zoomFn = zoom()
      .scaleExtent([1, 5])
      .on('zoom', debounce((event) => {
        map.selectAll('path')
          .attr('transform', event.transform)

        const { x, y, k } = event.transform
        cities.selectAll('circle')
          .attr('cx', d => x + k * (projection([d.coordinates.y, d.coordinates.x])[0]))
          .attr('cy', d => y + k * (projection([d.coordinates.y, d.coordinates.x])[1]))

        Object.entries(groups).forEach(([key, group]) => {
          routes.selectAll(`.connection-${key}`)
            .attr('d', (connection, index) => getConnectionPath(connection, index, group.length, event.transform))
        })
      }))

    svg.call(zoomFn)
  }, [countries, points, connections])

  return (
    <>
      <div id="map" />
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
