import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CategoryPicker from './CategoryPicker'
import IntervalPicker from './IntervalPicker'
import ChannelPicker from './ChannelPicker'

const StyledScopePickers = styled.div`
  display: inline-block;
  font-size: 1.2rem;  
`

const ScopePickers = (props) => {
  const { setIntervalScope } = props
  return (
    <>
      <StyledScopePickers>
        <CategoryPicker />
        <span className="facetText">mentioned</span>
        <IntervalPicker setIntervalScope={setIntervalScope} />
        <span className="facetText">on</span>
        <ChannelPicker />
      </StyledScopePickers>
    </>
  )
}
ScopePickers.propTypes = {
  setIntervalScope: PropTypes.func.isRequired,
}


export default ScopePickers
