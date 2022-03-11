import { useState, useEffect } from 'react'

function useScreenSize() {
  const [ width, setWidth ] = useState(0)
  const [ height, setHeight ] = useState(0)
  const [ margin, setMargin ] = useState(0)

  useEffect(() => {
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height

    const mapWidth = Math.round((screenHeight * 1000) / 684)
    const mapHeight = screenHeight

    const mapMargin = Math.round((screenWidth - mapWidth) / 2)

    setHeight(mapHeight)
    setWidth(mapWidth)
    setMargin(mapMargin)
  })

  return { width, height, margin }
}

export default useScreenSize
