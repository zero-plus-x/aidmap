import './App.css'
import data from './data/data.json'

import { Map } from './components/Map'
import { TopBar } from './components/TopBar'
import { CountryInfo } from './components/CountryInfo/CountryInfo'

import { LocaleProvider } from './contexts/localeContext'
import { ActiveCountryNameProvider } from './contexts/activeCountryNameContext'

function App() {
  return (
    <LocaleProvider>
      <ActiveCountryNameProvider>
        <div className="App">
          <TopBar />
          <Map countries={data.countries} />
          <CountryInfo />
        </div>
      </ActiveCountryNameProvider>
    </LocaleProvider>
  )
}

export default App
