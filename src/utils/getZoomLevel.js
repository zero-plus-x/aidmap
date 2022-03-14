const getZoomLevel = (scale) => {
  if (scale < 1.08) return 1
  if (scale < 1.26) return 2
  if (scale < 1.47) return 3
  if (scale < 1.72) return 4
  if (scale < 2.02) return 5
  if (scale < 2.36) return 6
  if (scale < 2.76) return 7
  if (scale < 3.22) return 8
  if (scale < 3.77) return 9
  if (scale < 4.41) return 10
  if (scale < 5.16) return 11
  if (scale < 6.03) return 12
  if (scale < 7.05) return 13
  if (scale < 8.25) return 14
  if (scale < 9.64) return 15
  if (scale < 11.28) return 16
  if (scale < 13.18) return 17
  if (scale < 15.42) return 18
  if (scale < 18.03) return 19
  if (scale < 21.08) return 20
  if (scale < 22.49) return 21
  if (scale < 26.65) return 22
  if (scale < 31.16) return 23
  if (scale < 36.43) return 24
  if (scale < 42.59) return 25
  return 26
}

export default getZoomLevel
