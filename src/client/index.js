// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { unregister } from './registerServiceWorker'

// App Imports
import App from './components/App'

// Render App
ReactDOM.render(
  <App />,
  document.getElementById('root'),
)

// registerServiceWorker()
unregister()
