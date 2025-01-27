// Initialize waveform renderers
let ecgRenderer, spo2Renderer, capnoRenderer

// Setup function
function initializeMonitor() {
  // Create renderers with initial waveform data
  ecgRenderer = new WaveformRenderer("ecg-canvas", "#00ff00", waveformData.ecg.normal_sinus_rhythm)
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
  groupECGPatterns()

  const spo2Select = document.getElementById("spo2-select")
  const capnoSelect = document.getElementById("capno-select")

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
function updateWaveform(type) {
  const select = document.getElementById(`${type}-select`)
  const pattern = select.value

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
  const rates = {
    normal_sinus_rhythm: 72,
    sinus_bradycardia: 45,
    sinus_tachycardia: 120,
    atrial_fibrillation: 110,
    atrial_flutter: 150,
    supraventricular_tachycardia: 180,
    junctional_rhythm: 50,
    accelerated_junctional_rhythm: 70,
    ventricular_tachycardia: 180,
    ventricular_fibrillation: "---",
    ventricular_escape_rhythm: 40,
    asystole: 0,
    // Add more patterns as needed
  }
  return rates[pattern] || "---"
}

function getSpO2Value(pattern) {
  const values = { normal: 98, low: 92, irregular: 95 }
  return values[pattern] || 98
}

function getEtCO2Value(pattern) {
  const values = {
    normal: 35,
    obstructed: 45,
    hyperventilation: 25,
    hypoventilation: 55,
    apnea: 0,
    bronchospasm: 40,
    cardiac_oscillation: 35,
    curare_cleft: 30,
  }
  return values[pattern] || 35
}

// Update ECG speed
function updateECGSpeed(speed) {
  ecgRenderer.setSpeed(speed)
}

// Add this function to group ECG patterns in the dropdown
function groupECGPatterns() {
  const ecgSelect = document.getElementById("ecg-select")
  const groups = {
    "Normal Rhythms": ["normal_sinus_rhythm", "sinus_bradycardia", "sinus_tachycardia"],
    "Atrial Arrhythmias": [
      "atrial_fibrillation",
      "atrial_flutter",
      "supraventricular_tachycardia",
      "premature_atrial_contraction",
      "wandering_atrial_pacemaker",
    ],
    "Junctional Arrhythmias": [
      "junctional_rhythm",
      "accelerated_junctional_rhythm",
      "premature_junctional_contraction",
    ],
    "Ventricular Arrhythmias": [
      "ventricular_tachycardia",
      "ventricular_fibrillation",
      "premature_ventricular_contraction",
      "ventricular_escape_rhythm",
      "asystole",
    ],
    "AV Blocks": [
      "first_degree_av_block",
      "second_degree_av_block_type_i",
      "second_degree_av_block_type_ii",
      "third_degree_av_block",
    ],
    "Bundle Branch Blocks": [
      "right_bundle_branch_block",
      "left_bundle_branch_block",
      "left_anterior_fascicular_block",
      "left_posterior_fascicular_block",
      "nonspecific_intraventricular_conduction_delay",
    ],
    "Other Conditions": ["wolff_parkinson_white_syndrome", "long_qt_syndrome", "short_qt_syndrome", "brugada_syndrome"],
    "Electrolyte Imbalances": ["hypokalemia", "hyperkalemia", "hypocalcemia", "hypercalcemia"],
    "Other Pathologies": [
      "hypothermia",
      "pericarditis",
      "myocardial_ischemia",
      "myocardial_infarction_anterior",
      "myocardial_infarction_inferior",
      "myocardial_infarction_lateral",
      "pulmonary_embolism",
    ],
  }

  for (const [groupName, patterns] of Object.entries(groups)) {
    const optgroup = document.createElement("optgroup")
    optgroup.label = groupName

    patterns.forEach((pattern) => {
      const option = document.createElement("option")
      option.value = pattern
      option.textContent = pattern
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
      optgroup.appendChild(option)
    })

    ecgSelect.appendChild(optgroup)
  }
}

// Initialize when document is loaded
document.addEventListener("DOMContentLoaded", initializeMonitor)

// Add event listeners for control buttons
document.querySelector(".aed").addEventListener("click", () => {
  alert("AED activated. Analyzing patient...")
  setTimeout(() => {
    alert("Analysis complete. No shock advised. Continue CPR.")
  }, 3000)
})

document.querySelector(".analyse").addEventListener("click", () => {
  alert("Starting patient analysis...")
  setTimeout(() => {
    const results = [
      "Heart Rate: " + document.getElementById("hr-value").textContent + " bpm",
      "SpO2: " + document.getElementById("spo2-value").textContent + "%",
      "EtCO2: " + document.getElementById("etco2-value").textContent + " mmHg",
      "Blood Pressure: 120/80 mmHg",
    ]
    alert("Analysis complete:\n" + results.join("\n"))
  }, 2000)
})

document.querySelector(".defib").addEventListener("click", () => {
  alert("Charging defibrillator...")
  setTimeout(() => {
    alert("Stand clear! Delivering shock...")
    updateWaveform("ecg", "normal_sinus_rhythm")
  }, 2000)
})

document.querySelector(".nibp").addEventListener("click", () => {
  alert("Starting NIBP measurement...")
  setTimeout(() => {
    const systolic = Math.floor(Math.random() * (140 - 110 + 1)) + 110
    const diastolic = Math.floor(Math.random() * (90 - 70 + 1)) + 70
    alert(`NIBP measurement complete: ${systolic}/${diastolic} mmHg`)
  }, 5000)
})

