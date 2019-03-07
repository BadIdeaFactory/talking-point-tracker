import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import LiveTranscript from './Transcripts/LiveTranscript'
import EntityFrequencyTable from './EntityFrequency/Table'
import graph from '../images/fake-graph.jpg'

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
    intervalScope: PropTypes.shape({
      key: PropTypes.string,
      startTime: PropTypes.string,
      recentStartTime: PropTypes.string,
      endTime: PropTypes.string,
    }).isRequired,
  }

  render() {
    const { intervalScope } = this.props
    return (
      <>
        <Query
          query={ALL_ENTITIES_QUERY}
          variables={{
            after: intervalScope.startTime,
            before: intervalScope.endTime,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>
            }
            if (error) {
              return <p>{error.message}</p>
            }

            const recentStartTime = moment(intervalScope.recentStartTime)
            const aggregatedData = data.namedEntities
              .filter(namedEntity => ['PERSON', 'ORG'].includes(namedEntity.type))
              .reduce((accumulator, currentValue) => {
                if (!(currentValue.entity in accumulator)) {
                  accumulator[currentValue.entity] = {
                    total: 0,
                    recent: 0,
                  }
                }
                accumulator[currentValue.entity].total += 1
                if (moment(parseInt(currentValue.createdAt, 10)).isSameOrAfter(recentStartTime)) {
                  accumulator[currentValue.entity].recent += 1
                }
                return accumulator
              }, {})

            const frequencyTotals = Object.keys(aggregatedData).map(key => ({
              label: key,
              total: aggregatedData[key].total,
              recent: aggregatedData[key].recent,
            }))

            // TODO: Which column we sort by will be determined by state
            frequencyTotals.sort((a, b) => b.total - a.total)

            return (
              <>
                <StyledEntityFrequencyTableWrapper>
                  <EntityFrequencyTable
                    data={frequencyTotals}
                  />
                </StyledEntityFrequencyTableWrapper>
                <StyledEntityFrequencyGraphWrapper>
                  <img alt="Graph" src={graph} width="686" height="772" />
                </StyledEntityFrequencyGraphWrapper>
              </>
            )
          }}
        </Query>
        <Query
          query={RECENT_SENTENCES_QUERY}
          variables={{ after: moment().subtract(5, 'minutes').toISOString() }}
        >
          {({ data, error, loading }) => {
            if (loading) {
              return <p>Loading...</p>
            }
            if (error) {
              return <p>{error.message}</p>
            }

            return (
              <StyledTranscriptAreaWrapper>
                <LiveTranscript sentences={data.sentences} />
              </StyledTranscriptAreaWrapper>
            )
          }}
        </Query>
      </>
    )
  }
}

const StyledEntityFrequencyTableWrapper = styled.div`
  grid-area: entity-list;
  position: relative;
  overflow: hidden;
  padding: 1rem;
  max-width: 300px;
  border-bottom: 3px solid red;
`

const StyledEntityFrequencyGraphWrapper = styled.div`
  grid-area: entity-graph;
  position: relative;
  overflow: hidden;
  padding: 1rem;
  border-bottom: 3px solid yellow;
  img {
    width: 100%;
    height: auto;
    max-height: 100%
  }
`

const StyledTranscriptAreaWrapper = styled.div`
  grid-area: transcripts;
  position: relative;
  overflow: hidden;
  padding: 1rem;
  max-width: 500px;
  border-bottom: 3px solid green;
`

export default Dashboard
