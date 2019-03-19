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

  const setClassName = () => {
    const classNames = []
    if (active) {
      classNames.push('active')
    }
    if (highlighted) {
      classNames.push('highlighted')
    }
    return classNames.join(' ')
  }

  return (
    <StyledEntityFrequencyRow
      onClick={selectEntity}
      onFocus={highlightEntity}
      onBlur={unhighlightEntity}
      onMouseEnter={highlightEntity}
      onMouseLeave={unhighlightEntity}
      className={setClassName()}
    >
      <td className="label">{entity.label}</td>
      <td className="total">{entity.total}</td>
      <td className="recent">{entity.recent}</td>
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
  &.active > td,
  &:hover > td {
    cursor: pointer;
    color: white;
    background-color: #eb5757;
  }

  .recent {
    background-color: #fefaee;
  }
`

export default withRouter(EntityFrequencyRow)
