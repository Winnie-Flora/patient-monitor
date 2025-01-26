// Initialize waveform renderers
let ecgRenderer, spo2Renderer, capnoRenderer

// Setup function
function initializeMonitor() {
  // Create renderers with initial waveform data
  ecgRenderer = new WaveformRenderer("ecg-canvas", "#00ff00", waveformData.ecg.normal)
  spo2Renderer = new WaveformRenderer("spo2-canvas", "#00ffff", waveformData.spo2.normal)
  capnoRenderer = new WaveformRenderer("capno-canvas", "#ffff00", waveformData.capno.normal)

  // Start animations
  ecgRenderer.animate()
  spo2Renderer.animate()
  capnoRenderer.animate()

  // Populate configuration dropdowns
  populateWaveformSelections()
}

// Configuration panel toggle
function toggleConfig() {
  const configPanel = document.getElementById("config-panel")
  configPanel.classList.toggle("hidden")
}

// Populate dropdown menus with available waveforms
function populateWaveformSelections() {
  const ecgSelect = document.getElementById("ecg-select")
  const spo2Select = document.getElementById("spo2-select")
  const capnoSelect = document.getElementById("capno-select")

  // Populate ECG patterns
  Object.keys(waveformData.ecg).forEach((pattern) => {
    const option = document.createElement("option")
    option.value = pattern
    option.textContent = pattern.charAt(0).toUpperCase() + pattern.slice(1)
    ecgSelect.appendChild(option)
  })

  // Populate SpO2 patterns
  Object.keys(waveformData.spo2).forEach((pattern) => {
    const option = document.createElement("option")
    option.value = pattern
    option.textContent = pattern.charAt(0).toUpperCase() + pattern.slice(1)
    spo2Select.appendChild(option)
  })

  // Populate Capnography patterns
  Object.keys(waveformData.capno).forEach((pattern) => {
    const option = document.createElement("option")
    option.value = pattern
    option.textContent = pattern.charAt(0).toUpperCase() + pattern.slice(1)
    capnoSelect.appendChild(option)
  })
}

// Update waveform when configuration changes
function updateWaveform(type, pattern) {
  const select = document.getElementById(`${type}-select`)
  if (select) {
    select.value = pattern
  }

  switch (type) {
    case "ecg":
      ecgRenderer.data = waveformData.ecg[pattern]
      document.getElementById("hr-value").textContent = getHeartRate(pattern)
      break
    case "spo2":
      spo2Renderer.data = waveformData.spo2[pattern]
      document.getElementById("spo2-value").textContent = getSpO2Value(pattern)
      break
    case "capno":
      capnoRenderer.data = waveformData.capno[pattern]
      document.getElementById("etco2-value").textContent = getEtCO2Value(pattern)
      break
  }
}

// Helper functions to get values based on waveform patterns
function getHeartRate(pattern) {
  const rates = { normal: 72, tachycardia: 120, bradycardia: 45, vfib: "---", asystole: 0 }
  return rates[pattern] || 72
}

function getSpO2Value(pattern) {
  const values = { normal: 98, low: 92, irregular: 95 }
  return values[pattern] || 98
}

function getEtCO2Value(pattern) {
  const values = { normal: 35, obstructed: 45, hyperventilation: 25, hypoventilation: 55 }
  return values[pattern] || 35
}

// Initialize when document is loaded
document.addEventListener("DOMContentLoaded", initializeMonitor)

// Add event listeners for control buttons
document.querySelector(".aed").addEventListener("click", () => {
  // Simulate AED activation
  alert("AED activated. Analyzing patient...")
  setTimeout(() => {
    alert("Analysis complete. No shock advised. Continue CPR.")
  }, 3000)
})

document.querySelector(".analyse").addEventListener("click", () => {
  // Simulate analysis functionality
  alert("Starting patient analysis...")
  setTimeout(() => {
    const results = [
      "Heart Rate: 72 bpm",
      "Blood Pressure: 120/80 mmHg",
      "SpO2: 98%",
      "Respiratory Rate: 14 breaths/min",
    ]
    alert("Analysis complete:\n" + results.join("\n"))
  }, 2000)
})

document.querySelector(".defib").addEventListener("click", () => {
  // Simulate defibrillation
  alert("Charging defibrillator...")
  setTimeout(() => {
    alert("Stand clear! Delivering shock...")
    // Simulate ECG change after defibrillation
    updateWaveform("ecg", "normal")
  }, 2000)
})

document.querySelector(".nibp").addEventListener("click", () => {
  // Simulate NIBP measurement
  alert("Starting NIBP measurement...")
  setTimeout(() => {
    const systolic = Math.floor(Math.random() * (140 - 110 + 1)) + 110
    const diastolic = Math.floor(Math.random() * (90 - 70 + 1)) + 70
    alert(`NIBP measurement complete: ${systolic}/${diastolic} mmHg`)
  }, 5000)
})

