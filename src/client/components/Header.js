import React from 'react'
import PropTypes from 'prop-types'
import TimePicker from './TimePicker'

import logo from '../logo.png'

class Header extends React.Component {
  static propTypes = {
    setStartTime: PropTypes.func.isRequired,
    setEndTime: PropTypes.func.isRequired,
  }

  render() {
    const { setStartTime, setEndTime } = this.props
    return <>
      <div id="header">
        <div className="row">
          <div className="col-xs-12 col-sm-7">
            <a href="/">
              <img className="logo" alt="Talking Point Tracker" src={logo} />
              <h1 className="title">Talking Point Tracker</h1>
            </a>
          </div>
          <div className="col-xs-12 col-sm-5">
            <div id="globalTimePicker">
              <TimePicker
                setStartTime={setStartTime}
                setEndTime={setEndTime}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  }
}

export default Header
