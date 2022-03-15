import { Countries } from 'types'
import { useMap } from '../../hooks/useMap'
import { useTranslation } from '../../hooks/useTranslation'

import './index.css'

type Props = {
  countries: Countries
}

export const Map: React.FC<Props> = ({ countries }) => {
  const t = useTranslation()

  useMap({
    container: '#map',
    countries,
    t,
  })

  return <svg id="map" width="100%" height="100%" />
}
