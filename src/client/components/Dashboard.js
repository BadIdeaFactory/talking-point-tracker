import React from 'react'
import PropTypes from 'prop-types'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import FrequencyChart from './FrequencyChart'
import SentenceViewer from './SentenceViewer'

const ALL_ENTITIES_QUERY = gql`
  query ALL_ENTITIES_QUERY(
    $after: String,
    $before: String) {
    namedEntities (
      after: $after,
      before: $before
    ) {
      entity
      type
      createdAt
    }
  }
`

const RECENT_SENTENCES_QUERY = gql`
  query RECENT_SENTENCES_QUERY($after: String!) {
    sentences (
      after: $after
    ) {
      content
      createdAt
    }
  }
`

class Dashboard extends React.Component {
  static propTypes = {
    startTime: PropTypes.number,
    endTime: PropTypes.number,
  }

  static defaultProps = {
    startTime: null,
    endTime: null,
  }

  render() {
    const { startTime, endTime } = this.props
    const currentDate = new Date()
    return (
      <>
        <div className="row no-gutters">
          <div className="col-sm-7 col-12">
            <div id="dashboardEntityChart" className="elementContainer">
              <h2>Keyword Counts</h2>
              <Query
                query={ALL_ENTITIES_QUERY}
                variables={{
                  after: startTime,
                  before: endTime,
                }}
              >
                {({ data, error, loading }) => {
                  if (loading) {
                    return <p>Loading...</p>
                  }
                  if (error) {
                    return (
                      <p>
Error:
                        {error.message}
                      </p>
                    )
                  }

                  const aggregatedData = data.namedEntities.reduce((accumulator, currentValue) => {
                    if (!(currentValue.entity in accumulator)) {
                      accumulator[currentValue.entity] = 0
                    }
                    accumulator[currentValue.entity] += 1
                    return accumulator
                  }, {})

                  const masterList = Object.keys(aggregatedData).map(key => ({
                    key,
                    val: aggregatedData[key],
                  }))

                  const sortedList = masterList.sort((a, b) => a.val < b.val)

                  const labels = sortedList.map(x => x.key)
                  const values = sortedList.map(x => x.val)

                  return (
                    <FrequencyChart
                      data={values}
                      labels={labels}
                    />
                  )
                }}
              </Query>
            </div>
          </div>
          <div className="col-sm-5 col-12">
            <div id="dashboardSentences" className="elementContainer">
              <h2>Recent Transcript</h2>
              <Query
                query={RECENT_SENTENCES_QUERY}
                variables={{ after: currentDate.toISOString() }}
              >
                {({ data, error, loading }) => {
                  if (loading) {
                    return <p>Loading...</p>
                  }
                  if (error) {
                    return (
                      <p>
Error:
                        {error.message}
                      </p>
                    )
                  }
                  return (
                    <SentenceViewer
                      sentences={data.sentences}
                    />
                  )
                }}
              </Query>
            </div>
            <div id="dashboardRecentEntities" className="elementContainer">
              <h2>Recent Entities</h2>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Dashboard
