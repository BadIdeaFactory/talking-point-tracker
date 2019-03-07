import React from 'react'
import PropTypes from 'prop-types'

import StyledPicker from './_StyledPicker'

const IntervalPicker = (props) => {
  const { setIntervalScope } = props

  const changeFrequencyInterval = (e) => {
    setIntervalScope(e.target.value)
  }

  return (
    <>
      <StyledPicker onChange={changeFrequencyInterval}>
        <option value="past4hours">in the past 4 hours</option>
        <option value="past24hours">in the past 24 hours</option>
        <option value="pastweek">in the past week</option>
      </StyledPicker>
    </>
  )
}
IntervalPicker.propTypes = {
  setIntervalScope: PropTypes.func.isRequired,
}


export default IntervalPicker
