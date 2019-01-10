import React from 'react'
import PropTypes from 'prop-types'

class SentenceViewer extends React.Component {
  static propTypes = {
    sentences: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { sentences } = this.props
    const renderedSentences = sentences.map((d) => {
      const timestamp = new Date(Number(d.createdAt))
      return (
        <div
          className="row sentence"
          key={d.id}
        >
          <div className="col-2">
            <div className="info">
              <div className="date">
                <span className="month">{timestamp.getMonth() + 1}</span>
                <span className="day">{timestamp.getDate()}</span>
                <span className="year">{timestamp.getFullYear()}</span>
              </div>
              <div className="time">
                <span className="hour">{timestamp.getHours()}</span>
                <span className="minute">{timestamp.getMinutes()}</span>
                <span className="second">{timestamp.getSeconds()}</span>
              </div>
              <div className="channel">CSPAN</div>
            </div>
          </div>
          <div className="col-10">
            <div className="content">{d.content}</div>
          </div>
        </div>
      )
    })

    return (
      <>
        <div className="sentences">
          {renderedSentences}
        </div>
      </>
    )
  }
}

export default SentenceViewer
