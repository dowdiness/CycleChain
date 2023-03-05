const startOscillator = (audioCtx: AudioContext) => {
  const oscillator = audioCtx.createOscillator()

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime) // ヘルツ単位の値
  oscillator.connect(audioCtx.destination)
  oscillator.start()
}

export {
  startOscillator
}
