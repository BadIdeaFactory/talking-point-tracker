import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import StyledPicker from './_StyledPicker'

const IntervalPicker = (props) => {
  const { setIntervalScope } = props

  const changeFrequencyInterval = (e) => {
    let startTime = 0

    switch (e.target.value) {
      case 'pastweek':
        startTime = moment().subtract(1, 'week').toISOString()
        break
      case 'past24hours':
        startTime = moment().subtract(24, 'hours').toISOString()
        break
      case 'past4hours':
      default:
        startTime = moment().subtract(4, 'hours').toISOString()
        break
    }

    setIntervalScope(startTime, moment().toISOString())
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
