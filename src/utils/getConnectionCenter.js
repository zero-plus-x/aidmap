const getCentroid = (A, B, C) => {
  const yDelta_a = B.y - A.y
  const xDelta_a = B.x - A.x
  const yDelta_b = C.y - B.y
  const xDelta_b = C.x - B.x

  const aSlope = yDelta_a / xDelta_a
  const bSlope = yDelta_b / xDelta_b

  const cx = (aSlope * bSlope * (A.y - C.y) + bSlope * (A.x + B.x) - aSlope * (B.x+C.x)) / (2 * (bSlope - aSlope))
  const cy = -1 * (cx - (A.x + B.x) / 2) / aSlope + (A.y + B.y) / 2

  return { cx, cy }
}

const getConnectionCenter = (connection, index, count, transform = { x: 0, y: 0, k: 1 }) => {
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

  const x1 = tp1.x
  const x2 = tp2.x
  const y1 = tp1.y
  const y2 = tp2.y

  const q = Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2))

  const y3 = (y1 + y2) / 2
  const x3 = (x1 + x2) / 2

  const basex = Math.sqrt(Math.pow(dr, 2) - Math.pow((q / 2), 2)) * (y1 - y2) / q;
  const basey = Math.sqrt(Math.pow(dr, 2) - Math.pow((q / 2), 2)) * (x2 - x1) / q;
  const coefficient = index < count / 2 ? -1 : 1

  const center = {}
  center.x = x3 + coefficient * basex
  center.y = y3 + coefficient * basey

  return getCentroid(tp1, tp2, center)
}

export default getConnectionCenter
