import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import Sentence from './Sentence'

const SentenceGroup = (props) => {
  const { sentences, metadata } = props

  const renderedSentences = sentences.map((sentence) => {
    const timestamp = moment(parseInt(sentence.createdAt, 10))
    return (
      <Sentence
        key={sentence.createdAt}
        timestamp={timestamp.toISOString()}
        sentence={sentence.content}
      />
    )
  })

  const renderedMetadata = (() => {
    const timestamp = moment(parseInt(metadata.timestamp, 10))
    const date = <b>{timestamp.format('MMMM D, YYYY')}</b>
    const time = <b>{timestamp.format('h:mm A')}</b>
    switch (metadata.format) {
      case 'datetime_and_channel':
        return (
          <>
            <b>{date}</b>
            <span> at </span>
            <b>{time}</b>
            <span> on </span>
            <b>{metadata.channel}</b>
          </>
        )
      case 'datetime':
        return (
          <>
            <b>{date}</b>
            <span> at </span>
            <b>{time}</b>
          </>
        )
      case 'time':
      default:
        return (
          <b>{time}</b>
        )
    }
  })()

  return (
    <>
      <StyledMetadata className="metadata">
        {renderedMetadata}
      </StyledMetadata>
      {renderedSentences}
    </>
  )
}
SentenceGroup.propTypes = {
  metadata: PropTypes.shape({
    format: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    channel: PropTypes.string,
  }).isRequired,
  sentences: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const StyledMetadata = styled.div`
  padding: 0.5rem 0.5rem 0;
  font-size: 0.9rem;
  color: #828282;
`

export default SentenceGroup
