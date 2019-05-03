import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const EntityFrequencyRow = (props) => {
  const {
    history,
    entity,
    active,
    highlighted,
    setActiveEntity,
    setHighlightedEntity,
  } = props

  const highlightEntity = () => {
    setHighlightedEntity(entity.label)
  }

  const unhighlightEntity = () => {
    setHighlightedEntity('')
  }

  const selectEntity = () => {
    if (active) {
      setActiveEntity('')
      history.push('/')
    } else {
      setActiveEntity(entity.label)
      history.push(`/detail?entity=${entity.label}`)
    }
  }

  const rowClassName = () => {
    const classNames = []
    if (active) {
      classNames.push('active')
    }
    if (highlighted) {
      classNames.push('highlighted')
    }
    return classNames.join(' ')
  }

  const recentClassName = (recent) => {
    const classNames = ['recent']
    if (recent === 0) {
      classNames.push('zero')
    }
    return classNames.join(' ')
  }

  return (
    <StyledEntityFrequencyRow
      onClick={selectEntity}
      onFocus={highlightEntity}
      onBlur={unhighlightEntity}
      // onMouseEnter={highlightEntity}
      // onMouseLeave={unhighlightEntity}
      className={rowClassName()}
    >
      <td className="label">{entity.label}</td>
      <td className="total">{entity.total}</td>
      <td className={recentClassName(entity.recent)}>
        {entity.recent > 0 ? entity.recent : '–'}
      </td>
    </StyledEntityFrequencyRow>
  )
}
EntityFrequencyRow.propTypes = {
  active: PropTypes.bool.isRequired,
  highlighted: PropTypes.bool.isRequired,
  setActiveEntity: PropTypes.func.isRequired,
  setHighlightedEntity: PropTypes.func.isRequired,
  entity: PropTypes.shape({
    label: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    recent: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}

const StyledEntityFrequencyRow = styled.tr`
  &:hover > td {
    cursor: pointer;
    background-color: #fcd6d5;
  }

  &.active {
    -webkit-position: sticky;
    position: sticky;
    top: 0;
    bottom: 0;
    > td {
      cursor: pointer;
      color: white;
      background-color: #f15a58;
    }
  }

  .recent {
    background-color: #fff9ea;
  }

  .zero {
    color: lightgray;
  }
`

export default withRouter(EntityFrequencyRow)
