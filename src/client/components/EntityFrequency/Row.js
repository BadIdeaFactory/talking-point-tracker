import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const EntityFrequencyRow = (props) => {
  const {
    history, entity, active, setActiveEntity,
  } = props

  const selectEntity = () => {
    setActiveEntity(entity.label)
    history.push(`/detail?entity=${entity.label}`)
  }

  const setClassName = () => ((active) ? 'active' : '')

  return (
    <StyledEntityFrequencyRow onClick={selectEntity} className={setClassName()}>
      <td className="label">{entity.label}</td>
      <td className="total">{entity.total}</td>
      <td className="recent">{entity.recent}</td>
    </StyledEntityFrequencyRow>
  )
}
EntityFrequencyRow.propTypes = {
  active: PropTypes.bool.isRequired,
  setActiveEntity: PropTypes.func.isRequired,
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
