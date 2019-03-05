// Imports
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Route, BrowserRouter as Router } from 'react-router-dom'

// App Imports
import Header from './Header'
import Dashboard from './Dashboard'
import client from '../ApolloClient'

// Component
class App extends React.Component {
  state = {}

  setIntervalScope = (startTime, endTime) => {
    this.setState({ startTime })
    this.setState({ endTime })
  }

  render() {
    const { startTime, endTime } = this.state
    return (
      <>
        <div id="mainframe">
          <Router>
            <ApolloProvider client={client}>
              <Header
                setIntervalScope={this.setIntervalScope}
                startTime={startTime}
                endTime={endTime}
              />
              <Route
                path="/"
                render={props => (
                  <Dashboard
                    {...props}
                    startTime={startTime}
                    endTime={endTime}
                  />
                )
                }
              />
            </ApolloProvider>
          </Router>
        </div>
      </>
    )
  }
}

export default App
