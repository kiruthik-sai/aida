import { useWhisper } from '@chengsokdara/use-whisper'

import React from 'react'

export default function VoiceNotes() {
    const {
        recording,
        speaking,
        transcribing,
        transcript,
        pauseRecording,
        startRecording,
        stopRecording,
      } = useWhisper({
        apiKey: "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",
        streaming: true,
        timeSlice: 1_000
      })
    
      return (
        <div>
          
          <p
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',

          }}
          >Transcribed Text: {transcript.text}</p>
          <button onClick={() => startRecording()}>Start</button>
          <button onClick={() => pauseRecording()}>Pause</button>
          <button onClick={() => stopRecording()}>Stop</button>
        </div>
      )
}
