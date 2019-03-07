// Will contain title text and optional action buttons. Has an optional channel-tag variant.

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TitleBar = (props) => {
  const { children, customClass } = props
  const className = ['title-bar'].concat(customClass.split(' ')).join(' ')
  return (
    <StyledTitleBar className={className}>
      {children}
    </StyledTitleBar>
  )
}
TitleBar.propTypes = {
  children: PropTypes.node,
  customClass: PropTypes.string,
}
TitleBar.defaultProps = {
  children: (
    <>
      Generic title
    </>
  ),
  customClass: '',
}

const StyledTitleBar = styled.div`
  grid-area: title-bar;

  .channel-name {
    font-size: 0.9em;
    letter-spacing: 1px;
    padding: 0.25rem 0.65rem;
    background-color: black;
    color: white;

    &::before {
      content: '•';
      color: red;
      font-size: 1.5em;
      line-height: 0;
      position: relative;
      top: 0.05em;
      margin-right: 0.2em;
    }
  }
`

export default TitleBar
