// Gamepad Button Mapper App
class GamepadMapper {
  constructor() {
    this.gamepads = {};
    this.selectedGamepadIndex = null;
    this.previousButtonStates = {};
    this.previousAxisStates = {};
    this.eventLog = [];
    this.maxLogEntries = 100;
    this.logAxes = false;
    this.axisThreshold = 0.1;
    this.lastPressedButton = null;

    // Walkthrough state
    this.currentMode = 'live'; // 'live' or 'walkthrough'
    this.walkthroughActive = false;
    this.walkthroughController = null;
    this.walkthroughStep = 0;
    this.walkthroughMappings = {};
    this.waitingForInput = false;
    this.detectedInput = null;

    this.init();
  }

  init() {
    // DOM Elements - Live Mode
    this.gamepadSelect = document.getElementById('gamepad-select');
    this.refreshBtn = document.getElementById('refresh-btn');
    this.buttonGrid = document.getElementById('button-grid');
    this.axisList = document.getElementById('axis-list');
    this.eventLogEl = document.getElementById('event-log');
    this.lastPressedValue = document.getElementById('last-pressed-value');
    this.clearLogBtn = document.getElementById('clear-log-btn');
    this.logAxesCheckbox = document.getElementById('log-axes');
    this.exportBtn = document.getElementById('export-btn');
    this.copyBtn = document.getElementById('copy-btn');

    // Controller info elements
    this.infoName = document.getElementById('info-name');
    this.infoId = document.getElementById('info-id');
    this.infoButtons = document.getElementById('info-buttons');
    this.infoAxes = document.getElementById('info-axes');

    // Mode elements
    this.modeTabs = document.querySelectorAll('.mode-tab');
    this.liveMode = document.getElementById('live-mode');
    this.walkthroughMode = document.getElementById('walkthrough-mode');

    // Walkthrough elements
    this.walkthroughSetup = document.getElementById('walkthrough-setup');
    this.walkthroughActiveEl = document.getElementById('walkthrough-active');
    this.controllerTypeGrid = document.getElementById('controller-type-grid');
    this.walkthroughImage = document.getElementById('walkthrough-image');
    this.highlightOverlay = document.getElementById('highlight-overlay');
    this.walkthroughControllerName = document.getElementById('walkthrough-controller-name');
    this.walkthroughStepEl = document.getElementById('walkthrough-step');
    this.walkthroughTotalEl = document.getElementById('walkthrough-total');
    this.progressFill = document.getElementById('progress-fill');
    this.instructionType = document.getElementById('instruction-type');
    this.instructionLabel = document.getElementById('instruction-label');
    this.detectionStatus = document.getElementById('detection-status');
    this.detectedInputEl = document.getElementById('detected-input');
    this.currentMappingEl = document.getElementById('current-mapping');
    this.walkthroughSkipBtn = document.getElementById('walkthrough-skip');
    this.walkthroughBackBtn = document.getElementById('walkthrough-back');
    this.walkthroughNextBtn = document.getElementById('walkthrough-next');
    this.walkthroughCancelBtn = document.getElementById('walkthrough-cancel');
    this.walkthroughFinishBtn = document.getElementById('walkthrough-finish');

    // Event Listeners - Gamepad
    window.addEventListener('gamepadconnected', (e) => this.onGamepadConnected(e));
    window.addEventListener('gamepaddisconnected', (e) => this.onGamepadDisconnected(e));

    // Event Listeners - Live Mode
    this.gamepadSelect.addEventListener('change', () => this.onGamepadSelected());
    this.refreshBtn.addEventListener('click', () => this.refreshGamepads());
    this.clearLogBtn.addEventListener('click', () => this.clearLog());
    this.logAxesCheckbox.addEventListener('change', (e) => {
      this.logAxes = e.target.checked;
    });
    this.exportBtn.addEventListener('click', () => this.exportData());
    this.copyBtn.addEventListener('click', () => this.copyToClipboard());

    // Event Listeners - Mode Tabs
    this.modeTabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchMode(tab.dataset.mode));
    });

    // Event Listeners - Walkthrough
    this.walkthroughSkipBtn.addEventListener('click', () => this.walkthroughSkip());
    this.walkthroughBackBtn.addEventListener('click', () => this.walkthroughBack());
    this.walkthroughNextBtn.addEventListener('click', () => this.walkthroughNext());
    this.walkthroughCancelBtn.addEventListener('click', () => this.walkthroughCancel());
    this.walkthroughFinishBtn.addEventListener('click', () => this.walkthroughFinish());

    // Initialize
    this.refreshGamepads();
    this.renderControllerTypeCards();

    // Start polling loop
    this.poll();
  }

  // ============ MODE SWITCHING ============
  switchMode(mode) {
    this.currentMode = mode;

    // Update tabs
    this.modeTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === mode);
    });

    // Update content
    this.liveMode.classList.toggle('hidden', mode !== 'live');
    this.walkthroughMode.classList.toggle('hidden', mode !== 'walkthrough');
  }

  // ============ WALKTHROUGH MODE ============
  renderControllerTypeCards() {
    this.controllerTypeGrid.innerHTML = '';

    Object.entries(CONTROLLER_DEFINITIONS).forEach(([id, controller]) => {
      const card = document.createElement('div');
      card.className = 'controller-type-card';
      card.innerHTML = `
        <img class="card-image" src="${controller.image}" alt="${controller.name}">
        <div class="card-name">${controller.name}</div>
        <div class="card-description">${controller.description}</div>
        <div class="card-controls">${controller.controls.length} controls to map</div>
      `;
      card.addEventListener('click', () => this.startWalkthrough(id));
      this.controllerTypeGrid.appendChild(card);
    });
  }

  startWalkthrough(controllerId) {
    if (this.selectedGamepadIndex === null) {
      alert('Please connect and select a controller first!');
      return;
    }

    this.walkthroughController = CONTROLLER_DEFINITIONS[controllerId];
    this.walkthroughStep = 0;
    this.walkthroughMappings = {};
    this.walkthroughActive = true;

    // Show walkthrough UI
    this.walkthroughSetup.classList.add('hidden');
    this.walkthroughActiveEl.classList.remove('hidden');

    // Set controller image
    this.walkthroughImage.src = this.walkthroughController.image;
    this.walkthroughControllerName.textContent = this.walkthroughController.name;
    this.walkthroughTotalEl.textContent = this.walkthroughController.controls.length;

    // Start first step
    this.showWalkthroughStep();
  }

  showWalkthroughStep() {
    const controls = this.walkthroughController.controls;
    const control = controls[this.walkthroughStep];

    // Update step counter
    this.walkthroughStepEl.textContent = this.walkthroughStep + 1;

    // Update progress bar
    const progress = ((this.walkthroughStep) / controls.length) * 100;
    this.progressFill.style.width = `${progress}%`;

    // Update instruction
    this.instructionType.textContent = control.type.toUpperCase();
    this.instructionType.classList.toggle('axis', control.type === 'axis');
    this.instructionLabel.textContent = control.label;

    // Update highlight on image
    this.updateHighlight(control);

    // Reset detection state
    this.waitingForInput = true;
    this.detectedInput = null;
    this.detectionStatus.classList.remove('detected');
    this.detectionStatus.innerHTML = `
      <span class="status-icon">⏳</span>
      <span class="status-text">Waiting for input...</span>
    `;
    this.detectedInputEl.innerHTML = '';

    // Check if already mapped
    const existingMapping = this.walkthroughMappings[control.id];
    if (existingMapping) {
      this.showExistingMapping(existingMapping);
    } else {
      this.currentMappingEl.innerHTML = '';
    }

    // Update buttons
    this.walkthroughBackBtn.disabled = this.walkthroughStep === 0;
    this.walkthroughNextBtn.disabled = !existingMapping;

    // Show/hide finish button on last step
    const isLastStep = this.walkthroughStep === controls.length - 1;
    this.walkthroughFinishBtn.classList.toggle('hidden', !isLastStep);
    this.walkthroughNextBtn.classList.toggle('hidden', isLastStep);
  }

  updateHighlight(control) {
    this.highlightOverlay.innerHTML = '';

    const highlight = document.createElement('div');
    highlight.className = 'highlight-box';
    highlight.style.left = `${control.x}%`;
    highlight.style.top = `${control.y}%`;
    highlight.style.width = `${control.w}%`;
    highlight.style.height = `${control.h}%`;
    this.highlightOverlay.appendChild(highlight);
  }

  showExistingMapping(mapping) {
    this.currentMappingEl.innerHTML = `
      <div class="mapping-label">Current mapping:</div>
      <div class="mapping-value">${mapping.type} ${mapping.index} (${mapping.value})</div>
    `;
  }

  detectWalkthroughInput(gamepad) {
    if (!this.waitingForInput || !this.walkthroughActive) return;

    const control = this.walkthroughController.controls[this.walkthroughStep];

    if (control.type === 'button') {
      // Detect button press
      for (let i = 0; i < gamepad.buttons.length; i++) {
        const button = gamepad.buttons[i];
        const isPressed = button.pressed || button.value > 0.5;
        const wasPressed = this.previousButtonStates[i] || false;

        if (isPressed && !wasPressed) {
          this.onInputDetected({
            type: 'button',
            index: i,
            value: button.value.toFixed(2)
          });
          return;
        }
      }
    } else if (control.type === 'axis') {
      // Detect significant axis movement
      for (let i = 0; i < gamepad.axes.length; i++) {
        const value = gamepad.axes[i];
        const prevValue = this.previousAxisStates[i] || 0;

        // Detect if axis moved significantly from center
        if (Math.abs(value) > 0.5 && Math.abs(prevValue) < 0.3) {
          this.onInputDetected({
            type: 'axis',
            index: i,
            value: value.toFixed(3)
          });
          return;
        }
      }
    }
  }

  onInputDetected(input) {
    this.detectedInput = input;
    this.waitingForInput = false;

    // Update UI
    this.detectionStatus.classList.add('detected');
    this.detectionStatus.innerHTML = `
      <span class="status-icon">✓</span>
      <span class="status-text">Input detected!</span>
    `;

    this.detectedInputEl.innerHTML = `
      <div class="input-item">
        <span class="input-type">${input.type.toUpperCase()}</span>
        <span class="input-value">Index: ${input.index}, Value: ${input.value}</span>
      </div>
    `;

    // Save mapping
    const control = this.walkthroughController.controls[this.walkthroughStep];
    this.walkthroughMappings[control.id] = input;

    this.showExistingMapping(input);

    // Enable next button
    this.walkthroughNextBtn.disabled = false;
  }

  walkthroughSkip() {
    this.walkthroughNext();
  }

  walkthroughBack() {
    if (this.walkthroughStep > 0) {
      this.walkthroughStep--;
      this.showWalkthroughStep();
    }
  }

  walkthroughNext() {
    if (this.walkthroughStep < this.walkthroughController.controls.length - 1) {
      this.walkthroughStep++;
      this.showWalkthroughStep();
    }
  }

  walkthroughCancel() {
    this.walkthroughActive = false;
    this.walkthroughSetup.classList.remove('hidden');
    this.walkthroughActiveEl.classList.add('hidden');
  }

  async walkthroughFinish() {
    const data = {
      timestamp: new Date().toISOString(),
      controllerType: this.walkthroughController.name,
      gamepad: {
        id: navigator.getGamepads()[this.selectedGamepadIndex]?.id,
        index: this.selectedGamepadIndex
      },
      mappings: this.walkthroughMappings,
      controls: this.walkthroughController.controls.map(control => ({
        id: control.id,
        label: control.label,
        type: control.type,
        mapping: this.walkthroughMappings[control.id] || null
      }))
    };

    try {
      const result = await window.electronAPI.saveFile(data);
      if (result.success) {
        alert(`Mapping saved to: ${result.path}`);
        this.walkthroughCancel();
      }
    } catch (error) {
      alert(`Export error: ${error.message}`);
    }
  }

  // ============ GAMEPAD EVENTS ============
  onGamepadConnected(event) {
    console.log('Gamepad connected:', event.gamepad.id);
    this.addLogEntry(`Controller connected: ${event.gamepad.id}`, 'info');
    this.refreshGamepads();

    // Auto-select if it's the first controller
    if (this.selectedGamepadIndex === null) {
      this.selectedGamepadIndex = event.gamepad.index;
      this.gamepadSelect.value = event.gamepad.index;
      this.onGamepadSelected();
    }
  }

  onGamepadDisconnected(event) {
    console.log('Gamepad disconnected:', event.gamepad.id);
    this.addLogEntry(`Controller disconnected: ${event.gamepad.id}`, 'info');

    if (this.selectedGamepadIndex === event.gamepad.index) {
      this.selectedGamepadIndex = null;
      this.updateControllerInfo(null);
      this.renderEmptyState();
    }

    this.refreshGamepads();
  }

  refreshGamepads() {
    const gamepads = navigator.getGamepads();
    this.gamepadSelect.innerHTML = '';

    let hasGamepads = false;
    for (const gamepad of gamepads) {
      if (gamepad) {
        hasGamepads = true;
        const option = document.createElement('option');
        option.value = gamepad.index;
        option.textContent = `[${gamepad.index}] ${gamepad.id}`;
        this.gamepadSelect.appendChild(option);
      }
    }

    if (!hasGamepads) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = '-- No controllers detected --';
      this.gamepadSelect.appendChild(option);
    }

    // Restore selection
    if (this.selectedGamepadIndex !== null) {
      this.gamepadSelect.value = this.selectedGamepadIndex;
    }
  }

  onGamepadSelected() {
    const value = this.gamepadSelect.value;
    if (value === '') {
      this.selectedGamepadIndex = null;
      this.updateControllerInfo(null);
      this.renderEmptyState();
      return;
    }

    this.selectedGamepadIndex = parseInt(value);
    this.previousButtonStates = {};
    this.previousAxisStates = {};

    const gamepad = navigator.getGamepads()[this.selectedGamepadIndex];
    if (gamepad) {
      this.updateControllerInfo(gamepad);
      this.renderControls(gamepad);
    }
  }

  updateControllerInfo(gamepad) {
    if (!gamepad) {
      this.infoName.textContent = 'Not connected';
      this.infoId.textContent = '-';
      this.infoButtons.textContent = '0';
      this.infoAxes.textContent = '0';
      return;
    }

    // Parse gamepad ID for cleaner display
    const idParts = gamepad.id.match(/^(.*?)\s*\(.*Vendor:\s*([0-9a-f]+).*Product:\s*([0-9a-f]+)/i);
    if (idParts) {
      this.infoName.textContent = idParts[1].trim();
      this.infoId.textContent = `VID: ${idParts[2]} / PID: ${idParts[3]}`;
    } else {
      this.infoName.textContent = gamepad.id;
      this.infoId.textContent = `Index: ${gamepad.index}`;
    }

    this.infoButtons.textContent = gamepad.buttons.length;
    this.infoAxes.textContent = gamepad.axes.length;
  }

  renderEmptyState() {
    this.buttonGrid.innerHTML = '<p class="no-data">Connect a controller to see buttons</p>';
    this.axisList.innerHTML = '<p class="no-data">Connect a controller to see axes</p>';
  }

  renderControls(gamepad) {
    // Render buttons
    this.buttonGrid.innerHTML = '';
    gamepad.buttons.forEach((button, index) => {
      const item = document.createElement('div');
      item.className = 'button-item';
      item.id = `button-${index}`;
      item.innerHTML = `
        <span class="index">${index}</span>
        <span class="label">Button ${index}</span>
        <span class="value">${button.value.toFixed(2)}</span>
      `;
      this.buttonGrid.appendChild(item);
    });

    // Render axes
    this.axisList.innerHTML = '';
    gamepad.axes.forEach((value, index) => {
      const item = document.createElement('div');
      item.className = 'axis-item';
      item.id = `axis-${index}`;
      item.innerHTML = `
        <span class="axis-index">Axis ${index}</span>
        <div class="axis-bar-container">
          <div class="axis-center"></div>
          <div class="axis-bar" id="axis-bar-${index}"></div>
        </div>
        <span class="axis-value" id="axis-value-${index}">${value.toFixed(3)}</span>
      `;
      this.axisList.appendChild(item);
    });
  }

  poll() {
    if (this.selectedGamepadIndex !== null) {
      const gamepad = navigator.getGamepads()[this.selectedGamepadIndex];
      if (gamepad) {
        // Always update live display
        this.updateInputs(gamepad);

        // Also check for walkthrough input
        if (this.walkthroughActive) {
          this.detectWalkthroughInput(gamepad);
        }

        // Update previous states after all checks
        gamepad.buttons.forEach((button, index) => {
          this.previousButtonStates[index] = button.pressed || button.value > 0.5;
        });
        gamepad.axes.forEach((value, index) => {
          this.previousAxisStates[index] = value;
        });
      }
    }
    requestAnimationFrame(() => this.poll());
  }

  updateInputs(gamepad) {
    // Update buttons
    gamepad.buttons.forEach((button, index) => {
      const element = document.getElementById(`button-${index}`);
      if (!element) return;

      const isPressed = button.pressed || button.value > 0.5;
      const wasPressed = this.previousButtonStates[index] || false;

      // Update visual state
      element.classList.toggle('active', isPressed);
      element.querySelector('.value').textContent = button.value.toFixed(2);

      // Log button press (only in live mode)
      if (this.currentMode === 'live') {
        if (isPressed && !wasPressed) {
          this.lastPressedButton = index;
          this.lastPressedValue.textContent = `Button ${index}`;
          this.addLogEntry(`Button ${index} PRESSED (value: ${button.value.toFixed(2)})`, 'button');
        } else if (!isPressed && wasPressed) {
          this.addLogEntry(`Button ${index} RELEASED`, 'button');
        }
      }
    });

    // Update axes
    gamepad.axes.forEach((value, index) => {
      const barElement = document.getElementById(`axis-bar-${index}`);
      const valueElement = document.getElementById(`axis-value-${index}`);
      if (!barElement || !valueElement) return;

      // Update visual
      valueElement.textContent = value.toFixed(3);

      if (value >= 0) {
        barElement.className = 'axis-bar positive';
        barElement.style.width = `${value * 50}%`;
        barElement.style.left = '50%';
        barElement.style.right = 'auto';
      } else {
        barElement.className = 'axis-bar negative';
        barElement.style.width = `${Math.abs(value) * 50}%`;
        barElement.style.right = '50%';
        barElement.style.left = 'auto';
      }

      // Log significant axis changes (only in live mode)
      if (this.currentMode === 'live' && this.logAxes) {
        const prevValue = this.previousAxisStates[index] || 0;
        if (Math.abs(value - prevValue) > this.axisThreshold) {
          this.addLogEntry(`Axis ${index}: ${value.toFixed(3)}`, 'axis');
        }
      }
    });
  }

  addLogEntry(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });

    const entry = { timestamp, message, type };
    this.eventLog.unshift(entry);

    // Trim log
    if (this.eventLog.length > this.maxLogEntries) {
      this.eventLog = this.eventLog.slice(0, this.maxLogEntries);
    }

    // Update UI
    const entryEl = document.createElement('div');
    entryEl.className = `log-entry log-${type}`;
    entryEl.innerHTML = `<span class="timestamp">${timestamp}</span>${message}`;

    this.eventLogEl.insertBefore(entryEl, this.eventLogEl.firstChild);

    // Trim DOM
    while (this.eventLogEl.children.length > this.maxLogEntries) {
      this.eventLogEl.removeChild(this.eventLogEl.lastChild);
    }
  }

  clearLog() {
    this.eventLog = [];
    this.eventLogEl.innerHTML = '<p class="log-entry log-info">Log cleared</p>';
  }

  getFullDump() {
    const gamepad = navigator.getGamepads()[this.selectedGamepadIndex];
    if (!gamepad) return null;

    const dump = {
      timestamp: new Date().toISOString(),
      controller: {
        id: gamepad.id,
        index: gamepad.index,
        connected: gamepad.connected,
        mapping: gamepad.mapping,
        timestamp: gamepad.timestamp
      },
      buttons: gamepad.buttons.map((button, index) => ({
        index,
        pressed: button.pressed,
        touched: button.touched,
        value: button.value
      })),
      axes: gamepad.axes.map((value, index) => ({
        index,
        value
      })),
      eventLog: this.eventLog.slice(0, 50)
    };

    return dump;
  }

  async exportData() {
    const data = this.getFullDump();
    if (!data) {
      this.addLogEntry('No controller selected for export', 'info');
      return;
    }

    try {
      const result = await window.electronAPI.saveFile(data);
      if (result.success) {
        this.addLogEntry(`Exported to: ${result.path}`, 'info');
      } else if (!result.canceled) {
        this.addLogEntry(`Export failed: ${result.error}`, 'info');
      }
    } catch (error) {
      this.addLogEntry(`Export error: ${error.message}`, 'info');
    }
  }

  async copyToClipboard() {
    const data = this.getFullDump();
    if (!data) {
      this.addLogEntry('No controller selected', 'info');
      return;
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      this.addLogEntry('Copied to clipboard!', 'info');
    } catch (error) {
      this.addLogEntry(`Copy failed: ${error.message}`, 'info');
    }
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  window.gamepadMapper = new GamepadMapper();
});
