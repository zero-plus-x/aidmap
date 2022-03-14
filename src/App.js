import './App.css'
import data from './data/data.json'

import { useState } from 'react'

import { Map } from './components/Map'
import { TopBar } from './components/TopBar'
import { CountryInfo } from './components/CountryInfo'

import { LocaleProvider } from './localeContext'

function App() {
  const [activeCountryName, setActiveCountryName] = useState(null)

  return (
    <LocaleProvider>
      <div className="App">
        <TopBar />
        <Map countries={data.countries} setActiveCountryName={setActiveCountryName} />
        {activeCountryName && (
          <CountryInfo
            activeCountryName={activeCountryName}
            onClose={() => setActiveCountryName(null)}
          />
        )}
      </div>
    </LocaleProvider>
  )
}

export default App
