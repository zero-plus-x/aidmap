const getConnectionPath = (connection, index, count, transform = { x: 0, y: 0, k: 1 }) => {
  const { p1, p2 } = connection
  const { x, y, k } = transform

  const tp1 = {
    x: x + k * p1.x,
    y: y + k * p1.y,
  }

  const tp2 = {
    x: x + k * p2.x,
    y: y + k * p2.y,
  }

  const isCentral = count % 2 === 1 && Math.floor(count / 2) === index
  if (count === 1 || isCentral) {
    return `M ${tp1.x},${tp1.y} L ${tp2.x},${tp2.y}`
  }

  const dx = tp2.x - tp1.x
  const dy = tp2.y - tp1.y
  const dr = Math.sqrt(dx * dx + dy * dy)
  const spath = index < count / 2 ? '0 0,0' : '0 0,1'
  return `M ${tp1.x},${tp1.y} A ${dr},${dr} ${spath} ${tp2.x},${tp2.y}`
}

export default getConnectionPath
