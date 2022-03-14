import { useEffect } from 'react'
import {
  geoMercator,
  geoPath,
  select,
  zoom,
} from 'd3'
import {
  debounce,
  // getZoomLevel,
} from '../utils'
import { feature } from 'topojson-client'

import topology from '../data/topology.json'

const DEFAULT_SCALE = 1.4

const renderMap = ({
  container,
  countries,
  setActiveCountry,
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

  const zoomFn = zoom()
    .scaleExtent([1, 50])
    .translateExtent([[-400,-300],[600,1000]])
    .on('zoom', debounce((event) => {
      // const { x, y, k } = event.transform
      // const zoomLevel = getZoomLevel(k)

      map.selectAll('path')
        .attr('transform', event.transform)

      /* cities.selectAll('circle')
        .attr('cx', d => x + k * (projection([d.coordinates.y, d.coordinates.x])[0]))
        .attr('cy', d => y + k * (projection([d.coordinates.y, d.coordinates.x])[1]))
        .attr('r', () => {
          if (zoomLevel > 10) return POINT_RADIUS + 15
          if (zoomLevel > 5) return POINT_RADIUS + 5
          if (zoomLevel > 3) return POINT_RADIUS + 2
          return POINT_RADIUS
        })
        .style('stroke-width', () => {
          if (zoomLevel > 10) return 4
          if (zoomLevel > 5) return 3
          return 2
        }) */
    }))

  svg.call(zoomFn)
}

export const useMap = ({
  container,
  countries,
  setActiveCountry,
}) => {
  useEffect(() => {
    const updateMap = () => {
      renderMap({
        container,
        countries,
        setActiveCountry,
      })
    }

    window.addEventListener('resize', updateMap)
    updateMap()

    return () => window.removeEventListener('resize', updateMap)
  }, [
    container,
    countries,
    setActiveCountry,
  ])
}
