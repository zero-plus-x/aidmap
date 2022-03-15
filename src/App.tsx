import './App.css'
import data from './data/data.json'

import { Map, TopBar, CountryInfo, FeedbackForm } from './components'

import { LocaleProvider, ActiveCountryNameProvider } from './contexts'

export const App: React.FC = () => {
  return (
    <LocaleProvider>
      <ActiveCountryNameProvider>
        <div>
          <TopBar />
          <Map countries={data.countries} />
          <CountryInfo />
          <FeedbackForm />
        </div>
      </ActiveCountryNameProvider>
    </LocaleProvider>
  )
}
