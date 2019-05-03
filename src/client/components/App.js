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
    activeEntity: '',
    highlightedEntity: '',
    intervalScope: {
      key: 'past4hours',
      startTime: moment().subtract(4, 'hours').toISOString(),
      recentStartTime: moment().subtract(1, 'hour').toISOString(),
      endTime: moment().toISOString(),
      ticks: 4,
    },
  }

  setIntervalScope = (key) => {
    const endTime = moment().toISOString()
    let ticks = 0
    let startTime = ''
    let recentStartTime = ''
    switch (key) {
      case 'pastweek':
        ticks = 7
        startTime = moment(endTime).subtract(1, 'week').toISOString()
        recentStartTime = moment(endTime).subtract(1, 'day').toISOString()
        break
      case 'past24hours':
        ticks = 24
        startTime = moment(endTime).subtract(24, 'hours').toISOString()
        recentStartTime = moment(endTime).subtract(4, 'hours').toISOString()
        break
      case 'past4hours':
      default:
        ticks = 4
        startTime = moment(endTime).subtract(4, 'hours').toISOString()
        recentStartTime = moment(endTime).subtract(1, 'hour').toISOString()
        break
    }

    const intervalScope = {
      key, startTime, recentStartTime, endTime, ticks,
    }
    this.setState({ intervalScope })
  }

  setActiveEntity = (activeEntity) => {
    this.setState({ activeEntity })
  }

  setHighlightedEntity = (highlightedEntity) => {
    this.setState({ highlightedEntity })
  }

  render() {
    const { activeEntity, highlightedEntity, intervalScope } = this.state
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
                    activeEntity={activeEntity}
                    setActiveEntity={this.setActiveEntity}
                    highlightedEntity={highlightedEntity}
                    setHighlightedEntity={this.setHighlightedEntity}
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
