import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import EntityFrequencyRow from './Row'

class EntityFrequencyTable extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  componentDidMount() {
    const { data } = this.props
    if (data.length) {
      this.matchTableColumnWidths()
    }
  }

  // We use grid to keep the thead fixed and scroll the tbody, but doing so breaks the connection
  // between thead and tbody column widths. I experimented with recreating table-like layout using
  // grid, but render was 300% slower. This is much faster.
  matchTableColumnWidths = () => {
    const labelWidth = this.tbody.querySelector('tr:first-child > .label').offsetWidth
    this.thead.querySelector('.label').width = `${labelWidth}px`
    const totalWidth = this.thead.querySelector('.total').offsetWidth
    this.tbody.querySelector('tr:first-child > .total').width = `${totalWidth}px`
    const recentWidth = this.thead.querySelector('.recent').offsetWidth
    this.tbody.querySelector('tr:first-child > .recent').width = `${recentWidth}px`
  }

  render() {
    const { data, labels } = this.props

    const sortList = (e) => {
      e.preventDefault()
    }

    const renderedEntities = data.map((d, i) => (
      <EntityFrequencyRow
        label={labels[i]}
        total={d}
        recent={Math.round(d * Math.random())}
        key={(labels[i] + Math.round(Math.random() * 10000))}
      />
    ))

    return (
      <StyledEntityFrequencyTable cellPadding="0" cellSpacing="0">
        <thead ref={(c) => { this.thead = c }}>
          <tr>
            <th className="label">
              <button type="button" onClick={sortList}>
                Label
              </button>
            </th>
            <th className="total">
              <button type="button" onClick={sortList}>
                Total
              </button>
            </th>
            <th className="recent">
              <button type="button" onClick={sortList}>
                Recent
              </button>
            </th>
          </tr>
        </thead>
        <tbody ref={(c) => { this.tbody = c }}>
          {renderedEntities}
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

    th {
      padding-bottom: 0.5rem;
    }

    button {
      appearance: none;
      font-size: 1rem;
      line-height: 1rem;
      font-weight: 600;
      font-family: inherit;
      padding: 0.15rem 0;
      margin: 0;
      border: none;
      border-bottom: 1px solid #2F80ED;
      cursor: pointer;
    }
  }

  tbody {
    grid-area: tbody;
    overflow-y: scroll;
  }
`

export default EntityFrequencyTable
