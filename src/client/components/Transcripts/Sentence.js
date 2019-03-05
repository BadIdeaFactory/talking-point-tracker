import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Sentence = (props) => {
  const { sentence, timestamp } = props
  return (
    <StyledSentence title={timestamp}>
      {sentence}
    </StyledSentence>
  )
}
Sentence.propTypes = {
  sentence: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
}

const StyledSentence = styled.p`
  background-color: #F1F1F1;
  border-bottom: 1px solid white;
  padding: 0.25rem 0.5rem;
  margin: 0;
`

export default Sentence
