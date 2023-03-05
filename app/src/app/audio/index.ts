import { startOscillator } from "./osc"
const audioContext = typeof AudioContext !== 'undefined' ? new AudioContext() : undefined

export {
  startOscillator,
  audioContext
}
