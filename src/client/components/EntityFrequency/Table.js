import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import EntityFrequencyColumnHeader from './ColumnHeader'
import EntityFrequencyRow from './Row'

class EntityFrequencyTable extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      sortBy: 'total',
      sortDirection: 'desc',
    }
  }

  componentDidMount() {
    const { data } = this.state
    if (data.length) {
      this.matchTableColumnWidths()
    }
  }

  componentDidUpdate() {
    const { data } = this.state
    if (data.length) {
      this.matchTableColumnWidths()
    }
  }

  // We use grid to keep the thead fixed and scroll the tbody, but doing so breaks the connection
  // between thead and tbody column widths. I experimented with recreating table-like layout using
  // grid, but render was 300% slower. This is much faster. It's a bidirectional resizer: it will
  // set the head cells to the width of the body cells or vice versa based on which cell is wider.
  matchTableColumnWidths = () => {
    const headCells = this.thead.querySelectorAll('th')
    const bodyCells = this.tbody.querySelectorAll('tr:first-child > td')
    if (headCells.length === bodyCells.length) {
      headCells.forEach((cell, i) => {
        const headCell = cell // Dumb hack; linter doesn't like "reassigning" params
        const bodyCell = bodyCells[i]
        const headCellWidth = headCell.offsetWidth
        const bodyCellWidth = bodyCell.offsetWidth
        if (headCellWidth > bodyCellWidth) {
          bodyCell.width = `${headCellWidth}px`
        } else {
          headCell.width = `${bodyCellWidth}px`
        }
      })
    }
  }

  sortList = (columnName) => {
    const { data, sortBy, sortDirection } = this.state

    const newState = {}
    if (columnName === sortBy) {
      // We're already sorted by this column, just invert direction.
      newState.sortDirection = sortDirection === 'desc' ? 'asc' : 'desc'
    } else {
      newState.sortBy = columnName
      newState.sortDirection = 'desc'
    }

    data.sort((a, b) => {
      if (columnName === 'label') {
        let order = b[columnName] > a[columnName] ? 1 : -1
        if (newState.sortDirection === 'desc') {
          order *= -1
        }
        return order
      }
      if (newState.sortDirection === 'desc') {
        return b[columnName] - a[columnName]
      }
      return a[columnName] - b[columnName]
    })
    newState.data = data

    this.setState(newState)
  }

  render() {
    const { data, sortBy } = this.state

    return (
      <StyledEntityFrequencyTable cellPadding="0" cellSpacing="0">
        <thead ref={(c) => { this.thead = c }}>
          <tr>
            <EntityFrequencyColumnHeader columnName="label" sortList={this.sortList} sorted={sortBy === 'label'} />
            <EntityFrequencyColumnHeader columnName="total" sortList={this.sortList} sorted={sortBy === 'total'} />
            <EntityFrequencyColumnHeader columnName="recent" sortList={this.sortList} sorted={sortBy === 'recent'} />
          </tr>
        </thead>
        <tbody ref={(c) => { this.tbody = c }}>
          {data.map(entity => (
            <EntityFrequencyRow
              entity={entity}
              key={(entity.label + Math.round(Math.random() * 10000))}
            />
          ))}
        </tbody>
      </StyledEntityFrequencyTable>
    )
  }
}

const StyledEntityFrequencyTable = styled.table`
  display: grid;
  grid-template-rows: auto 1fr; 
  grid-template-areas: "thead" "tbody";
  overflow: hidden;
  height: 100%;
  
  td, th {
    padding: 0.15rem 0.35rem;
    vertical-align: top;
  }

  .label {
    text-align: right;
  }
  .total, .recent {
    text-align: left;
  }

  thead {
    grid-area: thead;
  }

  tbody {
    grid-area: tbody;
    overflow-y: scroll;
  }
`

export default EntityFrequencyTable
