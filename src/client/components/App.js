// Imports
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Route, BrowserRouter as Router } from 'react-router-dom'

// App Imports
import Dashboard from './Dashboard'
import EntityDetail from './EntityDetail'
import Header from './Header'
import client from '../ApolloClient'

// Component
class App extends React.Component {
  state = {}

  setStartTime = (startTime) => {
    this.setState({ startTime })
  }

  setEndTime = (endTime) => {
    this.setState({ endTime })
  }

  render() {
    const { startTime, endTime } = this.state
    return (
      <>
        <div className="container">
          <Router>
            <ApolloProvider client={client}>
              <Header
                startTime={startTime}
                setStartTime={this.setStartTime}
                endTime={endTime}
                setEndTime={this.setEndTime}
              />
              <Route
                exact
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
              <Route
                path="/detail"
                render={props => (
                  <EntityDetail
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
