import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

const render = () => {
  const { App } = require('./App')

  ReactDOM.render(<App />, document.getElementById('root'))
}

render()

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./App', render)
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
