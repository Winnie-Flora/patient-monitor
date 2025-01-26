// Waveform data configurations
const waveformData = {
    ecg: {
      normal: [
        0.0, 0.0, 0.0, 0.0, 0.1, 0.2, 0.0, -0.1, -0.2, -0.1, 0.0, 0.2, 1.5, 2.0, 1.5, 0.0, -0.5, -0.2, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.1, 0.2, 0.3, 0.4, -0.2, -0.3, -0.2, 0.0,
      ],
      tachycardia: [
        0.0, 0.0, 0.1, 0.2, 0.0, -0.1, 0.0, 0.2, 1.2, 1.5, 1.0, 0.0, -0.3, -0.1, 0.0, 0.0, 0.0, 0.0, 0.1, 0.2, 0.0, -0.1,
        0.0, 0.2, 1.2, 1.5, 1.0, 0.0, -0.3, -0.1, 0.0, 0.0,
      ],
      bradycardia: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.2, 0.0, -0.1, -0.2, -0.1, 0.0, 0.2, 1.5, 2.0, 1.5, 0.0, -0.5, -0.2, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      vfib: [
        0.3, -0.2, 0.4, -0.3, 0.5, -0.4, 0.3, -0.2, 0.4, -0.5, 0.3, -0.2, 0.4, -0.3, 0.2, -0.4, 0.3, -0.2, 0.5, -0.3, 0.4,
        -0.2, 0.3, -0.4, 0.2, -0.3, 0.4, -0.2, 0.3, -0.5,
      ],
      asystole: Array(32).fill(0),
    },
    spo2: {
      normal: [
        0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.9,
        0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4,
      ],
      low: [
        0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.7,
        0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0, 0.1, 0.2,
      ],
      irregular: [
        0.5, 0.7, 0.4, 0.9, 0.3, 0.8, 0.2, 0.6, 0.5, 0.7, 0.4, 0.8, 0.3, 0.6, 0.2, 0.5, 0.4, 0.8, 0.3, 0.7, 0.5, 0.9, 0.2,
        0.6, 0.4, 0.7, 0.3, 0.8, 0.2, 0.5, 0.4, 0.6,
      ],
    },
    capno: {
      normal: [
        0.0, 0.0, 0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.0, 1.0, 1.0, 0.8, 0.4, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.4, 0.6, 0.8,
        1.0, 1.0, 1.0, 1.0, 0.8, 0.4, 0.0, 0.0, 0.0,
      ],
      obstructed: [
        0.0, 0.0, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.5, 0.5, 0.5, 0.4, 0.2, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.2, 0.3, 0.4,
        0.5, 0.5, 0.5, 0.5, 0.4, 0.2, 0.1, 0.0, 0.0,
      ],
      hyperventilation: [
        0.0, 0.0, 0.2, 0.5, 0.8, 1.0, 1.0, 1.0, 0.8, 0.4, 0.0, 0.0, 0.0, 0.2, 0.5, 0.8, 1.0, 1.0, 1.0, 0.8, 0.4, 0.0, 0.0,
        0.0, 0.2, 0.5, 0.8, 1.0, 1.0, 1.0, 0.8, 0.4,
      ],
      hypoventilation: [
        0.0, 0.0, 0.0, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.8, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
    },
  }
  
  // Waveform drawing functions
  class WaveformRenderer {
    constructor(canvasId, color, data) {
      this.canvas = document.getElementById(canvasId)
      this.ctx = this.canvas.getContext("2d")
      this.color = color
      this.data = data
      this.position = 0
  
      this.setupCanvas()
    }
  
    setupCanvas() {
      // Set canvas size with device pixel ratio
      const dpr = window.devicePixelRatio || 1
      const rect = this.canvas.getBoundingClientRect()
  
      this.canvas.width = rect.width * dpr
      this.canvas.height = rect.height * dpr
  
      this.ctx.scale(dpr, dpr)
      this.ctx.strokeStyle = this.color
      this.ctx.lineWidth = 2
    }
  
    draw() {
      // Clear the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  
      // Draw grid lines
      this.drawGrid()
  
      // Draw waveform
      this.ctx.beginPath()
      this.ctx.strokeStyle = this.color
  
      for (let i = 0; i < this.data.length; i++) {
        const x = ((i + this.position) % this.data.length) * (this.canvas.width / this.data.length)
        const y = (1 - this.data[i]) * (this.canvas.height * 0.8) + this.canvas.height * 0.1
  
        if (i === 0) {
          this.ctx.moveTo(x, y)
        } else {
          this.ctx.lineTo(x, y)
        }
      }
  
      this.ctx.stroke()
    }
  
    drawGrid() {
      // Draw background grid
      this.ctx.strokeStyle = "#2a2a2a"
      this.ctx.lineWidth = 0.5
  
      // Vertical lines
      for (let x = 0; x < this.canvas.width; x += 20) {
        this.ctx.beginPath()
        this.ctx.moveTo(x, 0)
        this.ctx.lineTo(x, this.canvas.height)
        this.ctx.stroke()
      }
  
      // Horizontal lines
      for (let y = 0; y < this.canvas.height; y += 20) {
        this.ctx.beginPath()
        this.ctx.moveTo(0, y)
        this.ctx.lineTo(this.canvas.width, y)
        this.ctx.stroke()
      }
  
      this.ctx.lineWidth = 2
    }
  
    animate() {
      requestAnimationFrame(() => this.animate())
      this.position = (this.position + 1) % this.data.length
      this.draw()
    }
  }
  
  // Export for use in script.js
  window.WaveformRenderer = WaveformRenderer
  window.waveformData = waveformData
  
  