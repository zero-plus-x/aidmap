import './App.css'
import * as data from './data/data.json'

import Map from './components/Map'
import { LocaleProvider } from './localeContext'

function App() {

  return (
    <LocaleProvider>
      <div className="App">
        <Map {...data} />
      </div>
    </LocaleProvider>
  )
}

export default App
