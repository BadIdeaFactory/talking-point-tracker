import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PickerBar from './ScopePickers'

const Header = (props) => {
  const { setIntervalScope } = props
  return (
    <>
      <StyledHeader>
        <a className="logomark" href="/">
          <h1 className="title">
            Talking Point
            <span className="dot" />
            Tracker
          </h1>
        </a>
        <PickerBar setIntervalScope={setIntervalScope} />
      </StyledHeader>
    </>
  )
}
Header.propTypes = {
  setIntervalScope: PropTypes.func.isRequired,
}

const StyledHeader = styled.header`
  grid-area: header;
  padding: 1rem;

  .logomark {
    text-decoration: none;
    display: inline-block;
    margin-right: 1rem;

    h1 {
      background-color: black;
      color: white;
      -webkit-font-smoothing: antialiased;
      text-transform: uppercase;
      padding: 0.5em 0.5em 0.25em;
      margin: 0;
      border-radius: 3px;
      letter-spacing: 0.05em;
      background-color: black;
      font-size: 1.5rem;
      font-family: 'Josefin Sans', sans-serif;
    }

    .dot::before {
      content: '•';
      color: red;
      font-size: 1.3em;
      line-height: 0;
      position: relative;
      top: 0.05em;
      margin: 0 0.15em;
    }
  }
`

export default Header
