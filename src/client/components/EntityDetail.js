import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import FrequencyChart from './FrequencyChart'
import SentenceViewer from './SentenceViewer'

const RELATED_ENTITIES_QUERY = gql`
  query RELATED_ENTITIES_QUERY(
    $relatedTo: String!,
    $after: String,
    $before: String) {
    namedEntities (
      relatedTo: $relatedTo,
      after: $after,
      before: $before
    ) {
      entity
      type
      createdAt
    }
  }
`

const RELATED_SENTENCES_QUERY = gql`
  query RELATED_SENTENCES_QUERY(
    $relatedTo: String!,
    $after: String,
    $before: String) {
    sentences (
      relatedTo: $relatedTo,
      after: $after,
      before: $before
    ) {
      id
      content
      createdAt
    }
  }
`

class EntityDetail extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
  }

  static defaultProps = {
    startTime: null,
    endTime: null,
  }

  render() {
    const { location, startTime, endTime } = this.props
    const relatedTo = qs.parse(location.search, { ignoreQueryPrefix: true }).entity

    return (
      <>
        <div className="row no-gutters">
          <div className="col-sm-7">
            <div className="elementContainer">
              <h2>
                Content referencing
                &quot;
                {relatedTo}
                &quot;
              </h2>
              <Query
                query={RELATED_SENTENCES_QUERY}
                variables={{
                  relatedTo,
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
                  return (
                    <SentenceViewer
                      sentences={data.sentences}
                    />
                  )
                }}
              </Query>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="elementContainer">
              <h2>Count over time</h2>
            </div>
            <div className="elementContainer">
              <h2>Related Keywords</h2>
              <Query
                query={RELATED_ENTITIES_QUERY}
                variables={{
                  relatedTo,
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
                      size={[500, 500]}
                    />
                  )
                }}
              </Query>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default EntityDetail
