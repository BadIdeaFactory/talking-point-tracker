import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import LiveTranscript from './Transcripts/LiveTranscript'
import EntityFrequencyTable from './EntityFrequency/Table'
import EntityFrequencyGraph from './EntityFrequency/Graph'

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
    activeEntity: PropTypes.string.isRequired,
    setActiveEntity: PropTypes.func.isRequired,
    highlightedEntity: PropTypes.string.isRequired,
    setHighlightedEntity: PropTypes.func.isRequired,
    intervalScope: PropTypes.shape({
      key: PropTypes.string,
      startTime: PropTypes.string,
      recentStartTime: PropTypes.string,
      endTime: PropTypes.string,
      ticks: PropTypes.number,
    }).isRequired,
  }

  render() {
    const {
      activeEntity,
      setActiveEntity,
      highlightedEntity,
      setHighlightedEntity,
      intervalScope,
    } = this.props

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

            const startTime = moment(intervalScope.startTime)
            const recentStartTime = moment(intervalScope.recentStartTime).valueOf()
            const endTime = moment(intervalScope.endTime)
            const tickLength = endTime.diff(startTime) / intervalScope.ticks

            const filteredData = data.namedEntities.filter(namedEntity => ['PERSON', 'ORG'].includes(namedEntity.type))

            const aggregatedData = filteredData.reduce((accumulator, currentValue) => {
              if (!(currentValue.entity in accumulator)) {
                accumulator[currentValue.entity] = {
                  total: 0,
                  recent: 0,
                  ticks: Array(intervalScope.ticks).fill(0),
                }
              }
              // Increase total
              accumulator[currentValue.entity].total += 1

              const createdAt = parseInt(currentValue.createdAt, 10)

              // Increase recent
              if (createdAt >= recentStartTime) {
                accumulator[currentValue.entity].recent += 1
              }

              // Increase current tick bucket
              const startToTimestamp = createdAt - startTime
              const tick = Math.floor(startToTimestamp / tickLength)
              accumulator[currentValue.entity].ticks[tick] += 1

              return accumulator
            }, {})

            const frequencyTableData = Object.keys(aggregatedData).map(key => ({
              label: key,
              total: aggregatedData[key].total,
              recent: aggregatedData[key].recent,
            })).sort((a, b) => (b.total - a.total))

            const frequencyGraphData = Object.keys(aggregatedData)
              .filter(entityName => (aggregatedData[entityName].total > 2))
              .reduce((accumulator, entityName) => {
                accumulator.forEach((tick, i) => {
                  if (!(entityName in Object.keys(tick))) {
                    accumulator[i][entityName] = 0
                  }
                  accumulator[i][entityName] += aggregatedData[entityName].ticks[i]
                })
                return accumulator
              }, Array(intervalScope.ticks).fill({}).map((tick, i) => ({ name: `tick${i}` })))

            return (
              <>
                <StyledEntityFrequencyTableWrapper>
                  <EntityFrequencyTable
                    data={frequencyTableData}
                    activeEntity={activeEntity}
                    highlightedEntity={highlightedEntity}
                    setActiveEntity={setActiveEntity}
                    setHighlightedEntity={setHighlightedEntity}
                  />
                </StyledEntityFrequencyTableWrapper>
                <StyledEntityFrequencyGraphWrapper>
                  <EntityFrequencyGraph
                    data={frequencyGraphData}
                    tickInterval={intervalScope.key === 'pastweek' ? 'Day' : 'Hour'}
                    activeEntity={activeEntity}
                    highlightedEntity={highlightedEntity}
                    setActiveEntity={setActiveEntity}
                    setHighlightedEntity={setHighlightedEntity}
                  />
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
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`

const StyledEntityFrequencyGraphWrapper = styled.div`
  grid-area: entity-graph;
  position: relative;
  overflow: hidden;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-bottom: 1rem;

  .recharts-line {
    cursor: pointer;
  }
`

const StyledTranscriptAreaWrapper = styled.div`
  grid-area: transcripts;
  position: relative;
  overflow: hidden;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
`

export default Dashboard
