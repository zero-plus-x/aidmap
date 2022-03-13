const formatConnections = (connections, points, projection) => {
  const groups = {}

  connections.forEach((connection) => {
    const p1 = points[connection.start]?.coordinates
    const p2 = points[connection.end]?.coordinates

    const start = projection([p1.y, p1.x])
    const end = projection([p2.y, p2.x])

    connection.p1 = { x: start[0], y: start[1] }
    connection.p2 = { x: end[0], y: end[1] }

    const key = `${connection.start}_${connection.end}`

    if (!!groups[key]) {
      groups[key].push(connection)
    } else {
      groups[key] = [connection]
    }
  })

  return groups
}

export default formatConnections
