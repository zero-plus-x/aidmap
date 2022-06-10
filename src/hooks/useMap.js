import { useEffect } from 'react'
import { geoMercator, geoPath, select, zoom } from 'd3'
import { debounce, getZoomLevel } from '../utils'
import { feature } from 'topojson-client'

import topology from '../data/topology.json'
import { useSetActiveCountryName } from '../contexts/activeCountryNameContext'

const DEFAULT_SCALE = 1.4
const HIGHLIGHTED_COUNTRIES = ['Austria', 'Belgium', 'Bulgaria', 'Cyprus', 'Czechia', 'Finland', 'Sweden']

const getFillColorForCountry = (name) => {
  if (!name) {
    return '#ececec'
  }

  return HIGHLIGHTED_COUNTRIES.includes(name) ? '#006fab' : '#dff1fb'
}

const getLabelColorForCountry = (name) =>
  HIGHLIGHTED_COUNTRIES.includes(name) ? '#ffffff' : '#006fab'

const renderMap = ({ container, countries, setActiveCountryName, t }) => {
  const width = window.screen.width
  const height = window.screen.height
  const scale = (width * DEFAULT_SCALE) / 1000

  const projection = geoMercator()
    .center([20, 52])
    .translate([width / 2, height / 2])
    .scale([width / scale])

  const svg = select(container).attr('width', width).attr('height', height)

  svg.selectAll('*').remove()

  const path = geoPath().projection(projection)

  const features = feature(topology, topology.objects.countries).features

  const map = svg.append('g')
  map
    .selectAll('path')
    .data(features)
    .enter()
    .append('path')
    .attr('class', (d) => `country country-${d.properties?.name}`)
    .attr('d', path)
    .style('cursor', (d) => (d.properties?.name ? 'pointer' : 'default'))
    .style('fill', (d) => getFillColorForCountry(d.properties?.name))
    .style('stroke', '#ffffff')
    .on('click', (event, d) => {
      setActiveCountryName(d.properties?.name)
    })

  const formattedCountries = Object.entries(countries).map(([name, item]) => ({ name, ...item }))
  map
    .selectAll('text')
    .data(formattedCountries)
    .enter()
    .append('text')
    .text((d) => t(d.nameCode))
    .attr('x', (d) => (d.center ? projection([d.center[1], d.center[0]])[0] : 0))
    .attr('y', (d) => (d.center ? projection([d.center[1], d.center[0]])[1] : 0))
    .attr('class', 'country-label')
    .style('pointer-events', 'none')
    .style('fill', (d) => getLabelColorForCountry(d.name))
    .style('opacity', (d) => (d.zoom === 1 ? 1 : 0))

  const zoomFn = zoom()
    .scaleExtent([1, 50])
    .translateExtent([
      [-2000, -2000],
      [3000, 2000],
    ])
    .on(
      'zoom',
      debounce((event) => {
        const { x, y, k } = event.transform
        const zoomLevel = getZoomLevel(k)

        map.selectAll('path').attr('transform', event.transform)

        map
          .selectAll('text')
          .attr('x', (d) => (d.center ? x + k * projection([d.center[1], d.center[0]])[0] : 0))
          .attr('y', (d) => (d.center ? y + k * projection([d.center[1], d.center[0]])[1] : 0))
          .style('opacity', (d) => (d.zoom <= zoomLevel ? 1 : 0))
      })
    )

  svg.call(zoomFn)
}

export const useMap = ({ container, countries, t }) => {
  const setActiveCountryName = useSetActiveCountryName()

  useEffect(() => {
    const updateMap = () => {
      renderMap({
        container,
        countries,
        setActiveCountryName,
        t,
      })
    }

    window.addEventListener('resize', updateMap)
    updateMap()

    return () => window.removeEventListener('resize', updateMap)
  }, [container, countries, setActiveCountryName, t])
}
