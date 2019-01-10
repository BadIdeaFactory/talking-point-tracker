import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class FrequencyBar extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    val: PropTypes.number.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  entitySelected = () => {
    const { history, label } = this.props
    history.push(`/detail?entity=${label}`)
  }

  render() {
    const { label, width, val } = this.props

    const barStyle = {
      width: `${width}%`,
      textAlign: 'right',
    }
    const countStyle = {
      position: 'relative',
      right: '-2px',
      paddingLeft: '100%',
    }
    const trStyle = {
      height: '10px',
      cursor: 'pointer',
    }
    return (
      <>
        <tr style={trStyle} onClick={this.entitySelected} className="frequencyBar">
          <td className="label">
            { label }
          </td>
          <td width="100%">
            <div style={barStyle} className="bar">
              <div style={countStyle}>{ val }</div>
            </div>
          </td>
        </tr>
      </>
    )
  }
}

export default withRouter(FrequencyBar)
