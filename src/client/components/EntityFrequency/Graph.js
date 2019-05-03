import React from 'react'
import PropTypes from 'prop-types'
import {
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, LineChart, Line,
} from 'recharts'
import styled from 'styled-components'

const StyledEntityFrequencyGraphCaption = styled.div`
  position: absolute;
  display: inline-block;
  top: 0.4rem;
  left: 50%;
  margin-left: -110px;
  text-align: right;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  z-index: 100;
`

const EntityFrequencyGraph = (props) => {
  const {
    data,
    tickInterval,
    activeEntity,
    highlightedEntity,
    setActiveEntity,
    // setHighlightedEntity,
  } = props

  const entityNames = Object.keys(data[0]).filter(k => (k !== 'name'))

  return (
    <>
      <StyledEntityFrequencyGraphCaption>
        <span>Appearances Per </span>
        {tickInterval}
      </StyledEntityFrequencyGraphCaption>
      <ResponsiveContainer debounce={200}>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 5, bottom: 5, left: 5,
          }}
        >
          <CartesianGrid vertical={false} stroke="#ddd" strokeWidth={1} strokeDasharray="3 3" />
          <YAxis orientation="right" axisLine={false} tickLine={false} />
          <XAxis hide axisLine={false} interval={0} padding={{ left: 10, right: 10 }} />
          {entityNames.map((entityName) => {
            const activated = [activeEntity, highlightedEntity].includes(entityName)
            // Defining the function here inside the loop seems very much like an anti-pattern.
            // However, I can't yet solve how to have the function aware of its `entityName`.
            // Probably will involve a class that extends `Line` and adds to its props or something.
            const activate = () => (setActiveEntity((entityName === activeEntity) ? '' : entityName))
            return (
              <Line
                dataKey={entityName}
                key={entityName}
                onClick={activate}
                dot={activated}
                stroke={activated ? '#f15a58' : '#ccc'}
                strokeWidth={2}
                type="monotone"
                isAnimationActive={false}
              />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

EntityFrequencyGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  tickInterval: PropTypes.string.isRequired,
  activeEntity: PropTypes.string.isRequired,
  highlightedEntity: PropTypes.string.isRequired,
  setActiveEntity: PropTypes.func.isRequired,
  // setHighlightedEntity: PropTypes.func.isRequired,
}

export default EntityFrequencyGraph
