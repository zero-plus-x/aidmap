import './App.css'
import * as data from './data/data.json'

import Map from './components/Map'

function App() {
  return (
    <div className="App">
      <Map {...data} />
    </div>
  )
}

export default App
