'use client'

import { useEffect } from 'react'
import { startOscillator, audioContext } from './audio'

export default function Home() {
  const start = () => {
    audioContext?.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  }

  const stop = () => {
    audioContext?.suspend()
  }

  useEffect(() => {
    startOscillator(audioContext!)
  }, [])

  return (
    <div>
      demo
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}
