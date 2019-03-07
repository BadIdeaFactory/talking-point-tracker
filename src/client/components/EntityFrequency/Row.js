import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const EntityFrequencyRow = (props) => {
  const { history, entity } = props

  const selectEntity = () => {
    history.push(`/detail?entity=${entity.label}`)
  }

  return (
    <StyledEntityFrequencyRow onClick={selectEntity}>
      <td className="label">{entity.label}</td>
      <td className="total">{entity.total}</td>
      <td className="recent">{entity.recent}</td>
    </StyledEntityFrequencyRow>
  )
}
EntityFrequencyRow.propTypes = {
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
    color: white;
    background-color: #eb5757;
  }

  .recent {
    background-color: #fefaee;
  }
`

export default withRouter(EntityFrequencyRow)
