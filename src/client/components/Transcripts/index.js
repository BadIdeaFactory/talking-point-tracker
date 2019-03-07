import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled, { keyframes } from 'styled-components'

import Button from '../Generic/Button'
import TitleBar from './TitleBar'
import SentenceGroup from './SentenceGroup'

class Transcript extends React.Component {
  static propTypes = {
    sentences: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  state = {
    expanded: false,
  }

  actionBar = false

  toggleExpansion = () => {
    let { expanded } = this.state
    expanded = !expanded
    this.setState({ expanded })
  }

  renderTitleBar = () => (
    <TitleBar />
  )

  renderSentenceGroups = ({ groupBy = 'minute' } = {}) => {
    const { sentences } = this.props

    // The query should already return sentences in order, but occasionally things appear out of
    // order, so smash it with a sort.
    sentences.sort((a, b) => a.createdAt - b.createdAt)

    const sentenceGroupData = {}
    let renderedSentenceGroups = []
    switch (groupBy) {
      case 'minute':
      default:
        sentences.forEach((sentence) => {
          const minute = moment(parseInt(sentence.createdAt, 10)).startOf('minute').valueOf().toString()
          sentenceGroupData[minute] = sentenceGroupData[minute] || []
          sentenceGroupData[minute].push(sentence)
        })
        renderedSentenceGroups = Object.keys(sentenceGroupData).map(minute => (
          <SentenceGroup
            key={minute}
            sentences={sentenceGroupData[minute]}
            metadata={{
              format: 'time',
              timestamp: minute,
            }}
          />
        ))
    }

    return renderedSentenceGroups
  }

  renderActionBar = () => {
    const { expanded } = this.state
    return (
      (this.actionBar) ? (
        <div key="actions" className="actions">
          <div className="indicator">
            <span key="dot1" />
            <span key="dot2" />
            <span key="dot3" />
          </div>
          <Button type="button" theme={{ main: '#aaaaaa' }} onClick={this.toggleExpansion}>
            {expanded ? '↑ Collapse' : '↓ Expand'}
          </Button>
        </div>
      ) : ''
    )
  }

  render() {
    const { expanded } = this.state

    return (
      <StyledTranscript expanded={expanded}>
        {this.renderTitleBar()}
        <div key="sentences" className="sentences">
          <div className="sentencesInner">
            {this.renderSentenceGroups()}
          </div>
        </div>
        {this.renderActionBar()}
      </StyledTranscript>
    )
  }
}

const blink = keyframes`
  50% {
    opacity: 1;
  }
`

const StyledTranscript = styled.div`
  padding-bottom: 1rem;
  &:last-child {
    padding-bottom: 0;
  }

  transition: 250ms ease max-height;
  max-height: ${props => (props.expanded ? '100%' : '50%')};

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "title-bar"
    "sentences"
    "actions";

  @media only screen and (min-width: 1200px) {
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas:
      "title-bar sentences"
      "title-bar actions";

    .sentences {
      border-top: 4px solid black;
    }
  }
  
  .sentences {
    grid-area: sentences;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
  }

  .actions {
    grid-area: actions;
    display: flex;
    justify-content: space-between;
    background-color: #FAFAFA;
    color: #BDBDBD;
    padding: 0.25rem 0.5rem;

    .indicator {
      display: inline-block;

      span {
        display: inline-block;
        width: 0.5em;
        height: 0.5em;
        margin: 0 1px;
        background-color: #9E9EA1;
        border-radius: 50%;
        opacity: 0.4;
        &:nth-of-type(1) {
          animation: ${blink} 1s infinite 300ms;
        }
        &:nth-of-type(2) {
          animation: ${blink} 1s infinite 600ms;
        }
        &:nth-of-type(3) {
          animation: ${blink} 1s infinite 900ms;
        }
      }
    }
  }
`


export default Transcript
