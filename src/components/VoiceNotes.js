import { useWhisper } from '@chengsokdara/use-whisper'
import React from 'react'

export default function VoiceNotes() {
    const url = "http://35.153.51.197/voice-note"
    const postData = (text)=>{
      fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body:JSON.stringify({
              input: text
          })
      }).then(res=>res.json())
      .then(data=>console.log(data))
      .catch(err=>console.log(err))
  }
    const {
        recording,
        speaking,
        transcribing,
        transcript,
        pauseRecording,
        startRecording,
        stopRecording,
      } = useWhisper({
        apiKey: process.env.OPENAIKEY,
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
          <button onClick={() => postData(transcript.text)}>Post</button>
        </div>
      )
}
