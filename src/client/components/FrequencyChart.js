import React from 'react'
import PropTypes from 'prop-types'

import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import FrequencyBar from './FrequencyBar'

class FrequencyChart extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render() {
    const { data, labels } = this.props
    const dataMax = max(data)
    const xScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, 100])

    const bars = data.map((d, i) => (
      <FrequencyBar
        label={labels[i]}
        val={d}
        fill="#ff0000"
        width={xScale(d)}
        key={labels[i]}
      />
    ))

    const divStyle = {
      overflow: 'auto',
      paddingRight: '50px',
    }

    const tableStyle = {
      width: '100%',
    }

    return (
      <>
        <div style={divStyle}>
          <table style={tableStyle}>
            <tbody>
              {bars}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}

export default FrequencyChart
