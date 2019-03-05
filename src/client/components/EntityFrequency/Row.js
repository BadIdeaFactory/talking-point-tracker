import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const EntityFrequencyRow = (props) => {
  const {
    history, label, total, recent,
  } = props

  const selectEntity = () => {
    history.push(`/detail?entity=${label}`)
  }

  return (
    <StyledEntityFrequencyRow onClick={selectEntity}>
      <td className="label">{label}</td>
      <td className="total">{total}</td>
      <td className="recent">{recent}</td>
    </StyledEntityFrequencyRow>
  )
}
EntityFrequencyRow.propTypes = {
  label: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  recent: PropTypes.number.isRequired,
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
