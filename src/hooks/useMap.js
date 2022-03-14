import { useEffect } from 'react'
import {
  geoMercator,
  geoPath,
  select,
  zoom,
} from 'd3'
import {
  debounce,
  formatConnections,
  getConnectionPath,
} from '../utils'
import { feature } from 'topojson-client'

import topology from '../data/topology.json'

const DEFAULT_SCALE = 1.4
const POINT_RADIUS = 10
const CONNECTION_WIDTH = 10

const renderMap = ({
  container,
  countries,
  points,
  connections,
  setActiveCountry,
  setActivePoint,
}) => {
  const width = window.screen.width
  const height = window.screen.height
  const scale = (width * DEFAULT_SCALE) / 1000

  const projection = geoMercator()
    .center([20, 52])
    .translate([width / 2, height / 2])
    .scale([width / scale])

  const svg = select(container)
    .attr('width', width)
    .attr('height', height)

  svg.selectAll('*').remove()

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
    .scaleExtent([1, 50])
    .translateExtent([[-400,-300],[600,1000]])
    .on('zoom', debounce((event) => {
      const { x, y, k } = event.transform

      map.selectAll('path')
        .attr('transform', event.transform)

      cities.selectAll('circle')
        .attr('cx', d => x + k * (projection([d.coordinates.y, d.coordinates.x])[0]))
        .attr('cy', d => y + k * (projection([d.coordinates.y, d.coordinates.x])[1]))

      Object.entries(groups).forEach(([key, group]) => {
        routes.selectAll(`.connection-${key}`)
          .attr('d', (connection, index) => getConnectionPath(connection, index, group.length, event.transform))
      })
    }))

  svg.call(zoomFn)
}

export const useMap = ({
  container,
  countries,
  points,
  connections,
  setActiveCountry,
  setActivePoint,
}) => {
  useEffect(() => {
    const updateMap = () => {
      renderMap({
        container,
        countries,
        points,
        connections,
        setActiveCountry,
        setActivePoint,
      })
    }

    window.addEventListener('resize', updateMap)
    updateMap()

    return () => window.removeEventListener('resize', updateMap)
  }, [
    container,
    countries,
    points,
    connections,
    setActiveCountry,
    setActivePoint,
  ])
}
