import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

class TimePicker extends React.Component {
  static propTypes = {
    setStartTime: PropTypes.func.isRequired,
    setEndTime: PropTypes.func.isRequired,
  }

  state = {
    timeType: 'AllTime',
    startDate: new Date(),
    endDate: new Date(),
  }

  updateType = (event) => {
    const { setStartTime, setEndTime } = this.props
    const { startDate, endDate } = this.state
    this.setState({ timeType: event.target.value })
    if (event.target.value === 'AllTime') {
      setStartTime(null)
      setEndTime(null)
    }
    if (event.target.value === 'After') {
      setStartTime(startDate)
      setEndTime(null)
    }
    if (event.target.value === 'Before') {
      setStartTime(null)
      setEndTime(endDate)
    }
    if (event.target.value === 'Between') {
      setStartTime(startDate)
      setEndTime(endDate)
    }
  }

  handleStartChange = (newDate) => {
    const { setStartTime } = this.props
    this.setState({ startDate: newDate })
    setStartTime(newDate)
  }

  handleEndChange = (newDate) => {
    const { setEndTime } = this.props
    this.setState({ endDate: newDate })
    setEndTime(newDate)
  }

  render() {
    const { startDate, endDate, timeType } = this.state
    return (
      <>
        <div className="float-right">
          <div>
            <select onChange={this.updateType} className="custom-select">
              <option value="AllTime">All Time</option>
              <option value="After">After</option>
              <option value="Before">Before</option>
              <option value="Between">Between</option>
            </select>
          </div>
          <div>
            { (timeType === 'After'
            || timeType === 'Between')
                && (
                <DatePicker
                  selected={startDate}
                  onChange={this.handleStartChange}
                  dateFormat="M/dd/yyyy h:mm"
                  showTimeSelect
                />
                )
            }
            { (timeType === 'Between'
            || timeType === 'Before')
                && (
                <DatePicker
                  selected={endDate}
                  onChange={this.handleEndChange}
                  dateFormat="M/dd/yyyy h:mm"
                  showTimeSelect
                />
                )
            }
            { timeType === 'InThePast'
                && (
                <select className="custom-select">
                  <option>hour</option>
                  <option>day</option>
                  <option>week</option>
                </select>
                )
            }
          </div>
        </div>
      </>
    )
  }
}

export default TimePicker
