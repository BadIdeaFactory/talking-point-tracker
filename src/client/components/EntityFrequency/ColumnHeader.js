import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const EntityFrequencyColumnHeader = (props) => {
  const { columnName, sortList, sorted } = props

  const clickSortList = () => {
    sortList(columnName)
  }

  return (
    <StyledColumnHeader className={columnName} title={`Sort by ${columnName}`}>
      <button type="button" onClick={clickSortList} data-sorted={sorted}>
        {columnName}
      </button>
    </StyledColumnHeader>
  )
}
EntityFrequencyColumnHeader.propTypes = {
  columnName: PropTypes.string.isRequired,
  sortList: PropTypes.func.isRequired,
  sorted: PropTypes.bool.isRequired,
}

const StyledColumnHeader = styled.th`
  padding-bottom: 0.5rem;

  > button {
    text-transform: capitalize;
    appearance: none;
    font-size: 1em;
    line-height: 1em;
    font-weight: 600;
    font-family: inherit;
    padding: 0.15em 0;
    margin: 0;
    border: none;
    border-bottom: 1px solid #2F80ED;
    background-color: transparent;
    cursor: pointer;

    &[data-sorted=true] {
      border-bottom-width: 3px;
    }
    &:active, &:focus {
      outline: none;
      color: inherit;
    }
  }
`

export default EntityFrequencyColumnHeader
