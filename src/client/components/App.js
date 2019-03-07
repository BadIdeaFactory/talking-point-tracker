// Imports
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import moment from 'moment'

// App Imports
import Header from './Header'
import Dashboard from './Dashboard'
import client from '../ApolloClient'

// Component
class App extends React.Component {
  state = {
    intervalScope: {
      key: 'past4hours',
      startTime: moment().subtract(4, 'hours').toISOString(),
      recentStartTime: moment().subtract(1, 'hour').toISOString(),
      endTime: moment().toISOString(),
    },
  }

  setIntervalScope = (key) => {
    const endTime = moment().toISOString()
    let startTime = ''
    let recentStartTime = ''
    switch (key) {
      case 'pastweek':
        startTime = moment(endTime).subtract(1, 'week').toISOString()
        recentStartTime = moment(endTime).subtract(1, 'day').toISOString()
        break
      case 'past24hours':
        startTime = moment(endTime).subtract(24, 'hours').toISOString()
        recentStartTime = moment(endTime).subtract(4, 'hours').toISOString()
        break
      case 'past4hours':
      default:
        startTime = moment(endTime).subtract(4, 'hours').toISOString()
        recentStartTime = moment(endTime).subtract(1, 'hour').toISOString()
        break
    }

    const intervalScope = {
      key, startTime, recentStartTime, endTime,
    }
    this.setState({ intervalScope })
  }

  render() {
    const { intervalScope } = this.state
    return (
      <>
        <div id="mainframe">
          <Router>
            <ApolloProvider client={client}>
              <Header
                intervalScope={intervalScope}
                setIntervalScope={this.setIntervalScope}
              />
              <Route
                path="/"
                render={props => (
                  <Dashboard
                    intervalScope={intervalScope}
                    {...props}
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
