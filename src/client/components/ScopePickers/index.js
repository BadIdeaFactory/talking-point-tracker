import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CategoryPicker from './CategoryPicker'
import IntervalPicker from './IntervalPicker'
import ChannelPicker from './ChannelPicker'

const StyledPickerBar = styled.div`
  display: inline-block;
  font-size: 1.2rem;  
`

const PickerBar = (props) => {
  const { setIntervalScope } = props
  return (
    <>
      <StyledPickerBar>
        <CategoryPicker />
        <span className="facetText">mentioned</span>
        <IntervalPicker setIntervalScope={setIntervalScope} />
        <span className="facetText">on</span>
        <ChannelPicker />
      </StyledPickerBar>
    </>
  )
}
PickerBar.propTypes = {
  setIntervalScope: PropTypes.func.isRequired,
}


export default PickerBar
