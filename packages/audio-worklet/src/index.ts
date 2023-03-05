// class Oscillator extends AudioWorkletProcessor {
//   prevFreq = 440
//   d = 0
//   static sampleRate = 48000
//   static get parameterDescriptors() {
//     return [{
//       name: 'frequency',
//       defaultValue: 440,
//       minValue: 0,
//       maxValue: 0.5 * this.sampleRate,
//       automationRate: "a-rate"
//     }];
//   }

//   process (inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
//     const output = outputs[0]
//     const freqs = parameters.frequency
//     output.forEach(channel => {
//       for (let i = 0; i < channel.length; i++) {
//         const freq = freqs.length > 1 ? freqs[i] : freqs[0]
//         const globTime = currentTime + i / Oscillator.sampleRate
//         this.d += globTime * (this.prevFreq - freq)
//         this.prevFreq = freq
//         const time = globTime * freq + this.d
//         const vibrato = 0 // Math.sin(globTime * 2 * Math.PI * 7) * 2
//         channel[i] = Math.sin(2 * Math.PI * time + vibrato)
//       }
//     })
//     return true
//   }
// }

interface RandomNoiseProcessor {
  voldefault: number
  vol: number
}

class RandomNoiseProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.voldefault = 0.01;
    this.vol = this.voldefault;
    this.port.onmessage = e => this.vol = e.data.vol;
  }
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
    const chlen = outputs.length;
    for (let j = 0; j < chlen; j++) {
      const channel = outputs[j][0];
      const len = channel.length;
      for (let i = 0; i < len; i++) {
        channel[i] = (Math.random() * 2 - 1) * this.vol;
      }
    }
    return true;
  }
}

registerProcessor('randomnoise', RandomNoiseProcessor)

export { RandomNoiseProcessor }
