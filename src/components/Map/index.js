import React, { useEffect } from 'react'
import {
  geoMercator,
  geoPath,
  select,
  zoom,
} from 'd3'
import { feature } from 'topojson-client'
import { debounce } from '../../utils'

import topology from '../../data/topology.json'

import './index.css'

const DEFAULT_SCALE = 0.6
const POINT_RADIUS = 10

const Map = ({ points, connections }) => {
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

    const g = svg.append('g')

    g.selectAll('path')
      .data(feature(topology, topology.objects.countries).features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path)

    g.selectAll('circle')
      .data(Object.values(points))
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', d => projection([d.coordinates.y, d.coordinates.x])[0])
      .attr('cy', d => projection([d.coordinates.y, d.coordinates.x])[1])
      .attr('r', POINT_RADIUS)
      .style('fill', '#006fab')

    const zoomFn = zoom()
      .scaleExtent([1, 5])
      .on('zoom', debounce((event) => {
        console.log('zoom', event)
        g.selectAll('path')
          .attr('transform', event.transform)

        g.selectAll('circle')
          .attr('transform', event.transform)
          .attr('r', POINT_RADIUS / event.transform.k)
      }))

    svg.call(zoomFn)
  }, [points])

  return (
    <div id="map" />
  )
}

export default Map
