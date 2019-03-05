import React from 'react'

import Transcript from '.'
import TitleBar from './TitleBar'

class LiveTranscript extends Transcript {
  actionBar = true

  renderTitleBar = () => (
    <TitleBar customClass="channel">
      <div className="channel-name">CSPAN</div>
    </TitleBar>
  )
}

export default LiveTranscript
