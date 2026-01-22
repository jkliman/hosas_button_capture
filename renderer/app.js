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
    this.walkthroughControllerId = null;
    this.walkthroughStep = 0;
    this.walkthroughMappings = {};
    this.waitingForInput = false;
    this.detectedInput = null;

    // Calibration/Editor state
    this.calibrationMode = false;
    this.selectedControl = null;
    this.isDragging = false;
    this.isResizing = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.controlStartX = 0;
    this.controlStartY = 0;
    this.controlStartW = 0;
    this.controlStartH = 0;

    // Custom Controller Creator state
    this.customCreatorMode = false;
    this.customControls = [];
    this.customImageData = null;
    this.customControlType = 'button';
    this.pendingControlPosition = null;
    this.customSelectedControl = null;
    this.customIsDragging = false;
    this.customIsResizing = false;

    // Edit Mode state for adding new controls
    this.editNewControlType = 'button';
    this.editPendingPosition = null;

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

    // Edit Mode elements
    this.editModeControls = document.getElementById('edit-mode-controls');
    this.editControlName = document.getElementById('edit-control-name');
    this.renameControlBtn = document.getElementById('rename-control-btn');
    this.deleteControlBtn = document.getElementById('delete-control-btn');
    this.newControlForm = document.getElementById('new-control-form');
    this.newControlName = document.getElementById('new-control-name');
    this.editTypeBtns = document.querySelectorAll('.edit-type-btn');
    this.confirmNewControlBtn = document.getElementById('confirm-new-control-btn');
    this.cancelNewControlBtn = document.getElementById('cancel-new-control-btn');

    // Custom Creator elements
    this.createCustomCard = document.getElementById('create-custom-card');
    this.customCreator = document.getElementById('custom-creator');
    this.uploadPlaceholder = document.getElementById('upload-placeholder');
    this.customImageInput = document.getElementById('custom-image-input');
    this.customImage = document.getElementById('custom-image');
    this.customOverlay = document.getElementById('custom-overlay');
    this.changeImageBtn = document.getElementById('change-image-btn');
    this.clearControlsBtn = document.getElementById('clear-controls-btn');
    this.customControllerName = document.getElementById('custom-controller-name');
    this.customControllerDesc = document.getElementById('custom-controller-desc');
    this.customControlForm = document.getElementById('custom-control-form');
    this.controlLabelInput = document.getElementById('control-label');
    this.addControlBtn = document.getElementById('add-control-btn');
    this.cancelControlBtn = document.getElementById('cancel-control-btn');
    this.controlsCount = document.getElementById('controls-count');
    this.controlsListItems = document.getElementById('controls-list-items');
    this.customCancelBtn = document.getElementById('custom-cancel-btn');
    this.customSaveBtn = document.getElementById('custom-save-btn');
    this.typeBtns = document.querySelectorAll('.type-btn');

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
    this.walkthroughSkipBtn.addEventListener('click', () => {
      if (this.calibrationMode) {
        this.selectPrevControl();
      } else {
        this.walkthroughSkip();
      }
    });
    this.walkthroughBackBtn.addEventListener('click', () => {
      if (this.calibrationMode) {
        this.selectNextControl();
      } else {
        this.walkthroughBack();
      }
    });
    this.walkthroughNextBtn.addEventListener('click', () => this.walkthroughNext());
    this.walkthroughCancelBtn.addEventListener('click', () => {
      if (this.calibrationMode) {
        this.exitCalibrationMode();
      } else {
        this.walkthroughCancel();
      }
    });
    this.walkthroughFinishBtn.addEventListener('click', () => {
      if (this.calibrationMode) {
        this.exportCalibrationData();
      } else {
        this.walkthroughFinish();
      }
    });

    // Event Listeners - Edit Mode
    this.renameControlBtn.addEventListener('click', () => this.renameSelectedControl());
    this.deleteControlBtn.addEventListener('click', () => this.deleteSelectedControl());
    this.confirmNewControlBtn.addEventListener('click', () => this.confirmNewControl());
    this.cancelNewControlBtn.addEventListener('click', () => this.cancelNewControl());
    this.editTypeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.setEditControlType(btn.dataset.type));
    });

    // Event Listeners - Custom Creator
    this.createCustomCard.addEventListener('click', () => this.openCustomCreator());
    this.uploadPlaceholder.addEventListener('click', () => this.customImageInput.click());
    this.customImageInput.addEventListener('change', (e) => this.onCustomImageSelected(e));
    this.changeImageBtn.addEventListener('click', () => this.customImageInput.click());
    this.clearControlsBtn.addEventListener('click', () => this.clearCustomControls());
    this.customOverlay.addEventListener('click', (e) => this.onCustomOverlayClick(e));
    this.customOverlay.addEventListener('mousemove', (e) => this.onCustomOverlayMouseMove(e));
    this.customOverlay.addEventListener('mouseup', () => this.onCustomOverlayMouseUp());
    this.customOverlay.addEventListener('mouseleave', () => this.onCustomOverlayMouseUp());
    this.typeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.setCustomControlType(btn.dataset.type));
    });
    this.addControlBtn.addEventListener('click', () => this.addCustomControl());
    this.cancelControlBtn.addEventListener('click', () => this.cancelCustomControl());
    this.customCancelBtn.addEventListener('click', () => this.closeCustomCreator());
    this.customSaveBtn.addEventListener('click', () => this.saveCustomController());

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
        <div class="card-actions">
          <button class="btn btn-small btn-secondary edit-positions-btn">Edit Positions</button>
          <button class="btn btn-small btn-primary start-walkthrough-btn">Start Walkthrough</button>
        </div>
      `;

      card.querySelector('.start-walkthrough-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.startWalkthrough(id);
      });

      card.querySelector('.edit-positions-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.startCalibration(id);
      });

      this.controllerTypeGrid.appendChild(card);
    });
  }

  startWalkthrough(controllerId) {
    if (this.selectedGamepadIndex === null) {
      alert('Please connect and select a controller first!');
      return;
    }

    this.walkthroughController = CONTROLLER_DEFINITIONS[controllerId];
    this.walkthroughControllerId = controllerId;
    this.walkthroughStep = 0;
    this.walkthroughMappings = {};
    this.walkthroughActive = true;
    this.calibrationMode = false;

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

  // ============ CALIBRATION MODE ============
  startCalibration(controllerId) {
    this.walkthroughController = CONTROLLER_DEFINITIONS[controllerId];
    this.walkthroughControllerId = controllerId;
    this.walkthroughActive = false;
    this.calibrationMode = true;
    this.selectedControl = null;

    // Show walkthrough UI (reusing the same layout)
    this.walkthroughSetup.classList.add('hidden');
    this.walkthroughActiveEl.classList.remove('hidden');

    // Set controller image
    this.walkthroughImage.src = this.walkthroughController.image;
    this.walkthroughControllerName.textContent = this.walkthroughController.name + ' - Edit Mode';
    this.walkthroughTotalEl.textContent = this.walkthroughController.controls.length;
    this.walkthroughStepEl.textContent = '0';
    this.progressFill.style.width = '0%';

    // Update instruction panel for calibration mode
    this.instructionType.textContent = 'EDIT MODE';
    this.instructionType.classList.remove('axis');
    this.instructionLabel.textContent = 'Click and drag boxes to move them';
    document.querySelector('.instruction-hint').textContent = 'Drag corners to resize. Use arrow keys for fine adjustment.';

    // Hide walkthrough-specific elements
    this.detectionStatus.innerHTML = `
      <span class="status-icon">🔧</span>
      <span class="status-text">Calibration mode active</span>
    `;
    this.detectedInputEl.innerHTML = '';
    this.currentMappingEl.innerHTML = '';

    // Update buttons for calibration mode
    this.walkthroughSkipBtn.textContent = 'Prev';
    this.walkthroughBackBtn.textContent = 'Next';
    this.walkthroughNextBtn.classList.add('hidden');
    this.walkthroughFinishBtn.classList.remove('hidden');
    this.walkthroughFinishBtn.textContent = 'Export Positions';
    this.walkthroughSkipBtn.disabled = false;
    this.walkthroughBackBtn.disabled = false;

    // Show edit mode controls panel
    this.editModeControls.classList.remove('hidden');
    this.editControlName.value = '';
    this.newControlForm.classList.add('hidden');
    this.editPendingPosition = null;

    // Enable pointer events on overlay for calibration
    this.highlightOverlay.classList.add('calibration-active');

    // Render all control boxes for editing
    this.renderCalibrationBoxes();

    // Add click listener for adding new controls
    this.calibrationOverlayClickHandler = (e) => this.onCalibrationOverlayClick(e);
    this.highlightOverlay.addEventListener('click', this.calibrationOverlayClickHandler);

    // Add keyboard listener for fine adjustments
    this.calibrationKeyHandler = (e) => this.handleCalibrationKey(e);
    document.addEventListener('keydown', this.calibrationKeyHandler);
  }

  renderCalibrationBoxes() {
    this.highlightOverlay.innerHTML = '';

    this.walkthroughController.controls.forEach((control, index) => {
      const box = document.createElement('div');
      box.className = 'highlight-box calibration-box';
      box.dataset.index = index;
      box.dataset.controlId = control.id;
      box.style.left = `${control.x}%`;
      box.style.top = `${control.y}%`;
      box.style.width = `${control.w}%`;
      box.style.height = `${control.h}%`;

      // Add label
      const label = document.createElement('span');
      label.className = 'calibration-label';
      label.textContent = control.label.substring(0, 15);
      box.appendChild(label);

      // Add resize handle
      const resizeHandle = document.createElement('div');
      resizeHandle.className = 'resize-handle';
      box.appendChild(resizeHandle);

      // Event listeners for drag
      box.addEventListener('mousedown', (e) => this.onCalibrationMouseDown(e, index));

      this.highlightOverlay.appendChild(box);
    });

    // Add mouse move and up listeners to the overlay
    this.highlightOverlay.addEventListener('mousemove', (e) => this.onCalibrationMouseMove(e));
    this.highlightOverlay.addEventListener('mouseup', (e) => this.onCalibrationMouseUp(e));
    this.highlightOverlay.addEventListener('mouseleave', (e) => this.onCalibrationMouseUp(e));
  }

  onCalibrationMouseDown(e, index) {
    e.preventDefault();
    e.stopPropagation();

    const control = this.walkthroughController.controls[index];
    this.selectedControl = index;

    // Highlight selected box
    this.highlightOverlay.querySelectorAll('.calibration-box').forEach((box, i) => {
      box.classList.toggle('selected', i === index);
    });

    // Update info panel
    this.instructionLabel.textContent = control.label;
    this.currentMappingEl.innerHTML = `
      <div class="mapping-label">Position:</div>
      <div class="mapping-value">x: ${control.x.toFixed(1)}%, y: ${control.y.toFixed(1)}%</div>
      <div class="mapping-label">Size:</div>
      <div class="mapping-value">w: ${control.w.toFixed(1)}%, h: ${control.h.toFixed(1)}%</div>
    `;

    // Update edit control name field
    this.editControlName.value = control.label;

    // Update step counter
    this.walkthroughStepEl.textContent = index + 1;

    // Check if clicking on resize handle
    if (e.target.classList.contains('resize-handle')) {
      this.isResizing = true;
      this.isDragging = false;
    } else {
      this.isDragging = true;
      this.isResizing = false;
    }

    // Get overlay bounds for percentage calculations
    const overlayRect = this.highlightOverlay.getBoundingClientRect();
    this.overlayRect = overlayRect;

    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.controlStartX = control.x;
    this.controlStartY = control.y;
    this.controlStartW = control.w;
    this.controlStartH = control.h;
  }

  onCalibrationMouseMove(e) {
    if (!this.isDragging && !this.isResizing) return;
    if (this.selectedControl === null) return;

    const control = this.walkthroughController.controls[this.selectedControl];
    const box = this.highlightOverlay.querySelector(`[data-index="${this.selectedControl}"]`);

    // Calculate delta in percentage
    const deltaX = ((e.clientX - this.dragStartX) / this.overlayRect.width) * 100;
    const deltaY = ((e.clientY - this.dragStartY) / this.overlayRect.height) * 100;

    if (this.isDragging) {
      // Move the box
      control.x = Math.max(0, Math.min(100 - control.w, this.controlStartX + deltaX));
      control.y = Math.max(0, Math.min(100 - control.h, this.controlStartY + deltaY));
      box.style.left = `${control.x}%`;
      box.style.top = `${control.y}%`;
    } else if (this.isResizing) {
      // Resize the box
      control.w = Math.max(2, Math.min(50, this.controlStartW + deltaX));
      control.h = Math.max(2, Math.min(50, this.controlStartH + deltaY));
      box.style.width = `${control.w}%`;
      box.style.height = `${control.h}%`;
    }

    // Update info panel
    this.currentMappingEl.innerHTML = `
      <div class="mapping-label">Position:</div>
      <div class="mapping-value">x: ${control.x.toFixed(1)}%, y: ${control.y.toFixed(1)}%</div>
      <div class="mapping-label">Size:</div>
      <div class="mapping-value">w: ${control.w.toFixed(1)}%, h: ${control.h.toFixed(1)}%</div>
    `;
  }

  onCalibrationMouseUp() {
    this.isDragging = false;
    this.isResizing = false;
  }

  handleCalibrationKey(e) {
    if (!this.calibrationMode || this.selectedControl === null) return;

    const control = this.walkthroughController.controls[this.selectedControl];
    const box = this.highlightOverlay.querySelector(`[data-index="${this.selectedControl}"]`);
    const step = e.shiftKey ? 0.1 : 0.5; // Smaller step with shift

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        control.x = Math.max(0, control.x - step);
        box.style.left = `${control.x}%`;
        break;
      case 'ArrowRight':
        e.preventDefault();
        control.x = Math.min(100 - control.w, control.x + step);
        box.style.left = `${control.x}%`;
        break;
      case 'ArrowUp':
        e.preventDefault();
        control.y = Math.max(0, control.y - step);
        box.style.top = `${control.y}%`;
        break;
      case 'ArrowDown':
        e.preventDefault();
        control.y = Math.min(100 - control.h, control.y + step);
        box.style.top = `${control.y}%`;
        break;
      case 'w':
      case 'W':
        control.h = Math.max(2, control.h - step);
        box.style.height = `${control.h}%`;
        break;
      case 's':
      case 'S':
        control.h = Math.min(50, control.h + step);
        box.style.height = `${control.h}%`;
        break;
      case 'a':
      case 'A':
        control.w = Math.max(2, control.w - step);
        box.style.width = `${control.w}%`;
        break;
      case 'd':
      case 'D':
        control.w = Math.min(50, control.w + step);
        box.style.width = `${control.w}%`;
        break;
    }

    // Update info panel
    this.currentMappingEl.innerHTML = `
      <div class="mapping-label">Position:</div>
      <div class="mapping-value">x: ${control.x.toFixed(1)}%, y: ${control.y.toFixed(1)}%</div>
      <div class="mapping-label">Size:</div>
      <div class="mapping-value">w: ${control.w.toFixed(1)}%, h: ${control.h.toFixed(1)}%</div>
    `;
  }

  selectPrevControl() {
    if (this.selectedControl === null) {
      this.selectedControl = 0;
    } else {
      this.selectedControl = (this.selectedControl - 1 + this.walkthroughController.controls.length) % this.walkthroughController.controls.length;
    }
    this.highlightSelectedControl();
  }

  selectNextControl() {
    if (this.selectedControl === null) {
      this.selectedControl = 0;
    } else {
      this.selectedControl = (this.selectedControl + 1) % this.walkthroughController.controls.length;
    }
    this.highlightSelectedControl();
  }

  highlightSelectedControl() {
    const control = this.walkthroughController.controls[this.selectedControl];

    // Update visual selection
    this.highlightOverlay.querySelectorAll('.calibration-box').forEach((box, i) => {
      box.classList.toggle('selected', i === this.selectedControl);
    });

    // Update step counter
    this.walkthroughStepEl.textContent = this.selectedControl + 1;

    // Update info
    this.instructionLabel.textContent = control.label;
    this.currentMappingEl.innerHTML = `
      <div class="mapping-label">Position:</div>
      <div class="mapping-value">x: ${control.x.toFixed(1)}%, y: ${control.y.toFixed(1)}%</div>
      <div class="mapping-label">Size:</div>
      <div class="mapping-value">w: ${control.w.toFixed(1)}%, h: ${control.h.toFixed(1)}%</div>
    `;

    // Update edit control name field
    this.editControlName.value = control.label;
  }

  async exportCalibrationData() {
    const data = {
      controllerId: this.walkthroughControllerId,
      controllerName: this.walkthroughController.name,
      timestamp: new Date().toISOString(),
      controls: this.walkthroughController.controls.map(control => ({
        id: control.id,
        label: control.label,
        type: control.type,
        x: Math.round(control.x * 10) / 10,
        y: Math.round(control.y * 10) / 10,
        w: Math.round(control.w * 10) / 10,
        h: Math.round(control.h * 10) / 10
      }))
    };

    // Also generate JS code for easy copy-paste
    let jsCode = `'${this.walkthroughControllerId}': {\n`;
    jsCode += `  name: '${this.walkthroughController.name}',\n`;
    jsCode += `  image: '${this.walkthroughController.image}',\n`;
    jsCode += `  description: '${this.walkthroughController.description}',\n`;
    jsCode += `  controls: [\n`;

    this.walkthroughController.controls.forEach((control, i) => {
      jsCode += `    { id: '${control.id}', label: '${control.label}', type: '${control.type}'`;
      if (control.stick) jsCode += `, stick: '${control.stick}'`;
      jsCode += `, x: ${Math.round(control.x * 10) / 10}, y: ${Math.round(control.y * 10) / 10}, w: ${Math.round(control.w * 10) / 10}, h: ${Math.round(control.h * 10) / 10} }`;
      jsCode += i < this.walkthroughController.controls.length - 1 ? ',\n' : '\n';
    });

    jsCode += `  ]\n}`;

    data.jsCode = jsCode;

    try {
      const result = await window.electronAPI.saveFile(data);
      if (result.success) {
        // Also copy JS code to clipboard
        await navigator.clipboard.writeText(jsCode);
        alert(`Positions saved to: ${result.path}\n\nJS code also copied to clipboard!`);
      }
    } catch (error) {
      alert(`Export error: ${error.message}`);
    }
  }

  // ============ EDIT MODE - Rename/Delete/Add Controls ============
  onCalibrationOverlayClick(e) {
    // Only handle clicks directly on the overlay (not on control boxes)
    if (e.target !== this.highlightOverlay) return;
    if (this.isDragging || this.isResizing) return;

    const rect = this.highlightOverlay.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Store position and show new control form
    this.editPendingPosition = { x, y };
    this.newControlForm.classList.remove('hidden');
    this.newControlName.value = '';
    this.newControlName.focus();

    // Show preview box
    this.showEditPlacingPreview(x, y);
  }

  showEditPlacingPreview(x, y) {
    // Remove existing preview
    const existing = this.highlightOverlay.querySelector('.placing-preview');
    if (existing) existing.remove();

    const preview = document.createElement('div');
    preview.className = 'placing-preview';
    preview.style.left = `${x - 4}%`;
    preview.style.top = `${y - 2}%`;
    preview.style.width = '8%';
    preview.style.height = '4%';
    this.highlightOverlay.appendChild(preview);
  }

  setEditControlType(type) {
    this.editNewControlType = type;
    this.editTypeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });
  }

  confirmNewControl() {
    const label = this.newControlName.value.trim();
    if (!label) {
      alert('Please enter a control name');
      return;
    }
    if (!this.editPendingPosition) {
      alert('Please click on the image to place the control');
      return;
    }

    // Create new control
    const newControl = {
      id: `${this.walkthroughControllerId}_custom_${Date.now()}`,
      label: label,
      type: this.editNewControlType,
      x: Math.round((this.editPendingPosition.x - 4) * 10) / 10,
      y: Math.round((this.editPendingPosition.y - 2) * 10) / 10,
      w: 8,
      h: 4
    };

    // Add to controller controls
    this.walkthroughController.controls.push(newControl);

    // Remove preview
    const preview = this.highlightOverlay.querySelector('.placing-preview');
    if (preview) preview.remove();

    // Re-render boxes
    this.renderCalibrationBoxes();

    // Update total count
    this.walkthroughTotalEl.textContent = this.walkthroughController.controls.length;

    // Select the new control
    this.selectedControl = this.walkthroughController.controls.length - 1;
    this.highlightSelectedControl();

    // Hide form and reset
    this.newControlForm.classList.add('hidden');
    this.editPendingPosition = null;
  }

  cancelNewControl() {
    // Remove preview
    const preview = this.highlightOverlay.querySelector('.placing-preview');
    if (preview) preview.remove();

    this.newControlForm.classList.add('hidden');
    this.editPendingPosition = null;
  }

  renameSelectedControl() {
    if (this.selectedControl === null) {
      alert('Please select a control first');
      return;
    }

    const newName = this.editControlName.value.trim();
    if (!newName) {
      alert('Please enter a control name');
      return;
    }

    // Update control label
    const control = this.walkthroughController.controls[this.selectedControl];
    control.label = newName;

    // Update the box label
    const box = this.highlightOverlay.querySelector(`[data-index="${this.selectedControl}"]`);
    if (box) {
      const labelEl = box.querySelector('.calibration-label');
      if (labelEl) {
        labelEl.textContent = newName.substring(0, 15);
      }
    }

    // Update instruction label
    this.instructionLabel.textContent = newName;
  }

  deleteSelectedControl() {
    if (this.selectedControl === null) {
      alert('Please select a control first');
      return;
    }

    const control = this.walkthroughController.controls[this.selectedControl];
    if (!confirm(`Delete "${control.label}"?`)) {
      return;
    }

    // Remove control from array
    this.walkthroughController.controls.splice(this.selectedControl, 1);

    // Re-render boxes
    this.renderCalibrationBoxes();

    // Update total count
    this.walkthroughTotalEl.textContent = this.walkthroughController.controls.length;

    // Reset selection
    if (this.walkthroughController.controls.length > 0) {
      this.selectedControl = Math.min(this.selectedControl, this.walkthroughController.controls.length - 1);
      this.highlightSelectedControl();
    } else {
      this.selectedControl = null;
      this.editControlName.value = '';
      this.instructionLabel.textContent = 'No controls';
      this.currentMappingEl.innerHTML = '';
      this.walkthroughStepEl.textContent = '0';
    }
  }

  exitCalibrationMode() {
    this.calibrationMode = false;

    // Remove keyboard listener
    if (this.calibrationKeyHandler) {
      document.removeEventListener('keydown', this.calibrationKeyHandler);
    }

    // Remove click listener for adding controls
    if (this.calibrationOverlayClickHandler) {
      this.highlightOverlay.removeEventListener('click', this.calibrationOverlayClickHandler);
    }

    // Disable pointer events on overlay
    this.highlightOverlay.classList.remove('calibration-active');

    // Hide edit mode controls
    this.editModeControls.classList.add('hidden');

    // Restore button text
    this.walkthroughSkipBtn.textContent = 'Skip';
    this.walkthroughBackBtn.textContent = 'Back';
    this.walkthroughFinishBtn.textContent = 'Finish & Export';

    // Go back to setup
    this.walkthroughSetup.classList.remove('hidden');
    this.walkthroughActiveEl.classList.add('hidden');
  }

  // ============ CUSTOM CONTROLLER CREATOR ============
  openCustomCreator() {
    this.customCreatorMode = true;
    this.customControls = [];
    this.customImageData = null;
    this.pendingControlPosition = null;

    // Reset form
    this.customControllerName.value = '';
    this.customControllerDesc.value = '';
    this.controlLabelInput.value = '';

    // Reset UI
    this.uploadPlaceholder.classList.remove('hidden');
    this.customImage.classList.add('hidden');
    this.changeImageBtn.classList.add('hidden');
    this.clearControlsBtn.classList.add('hidden');
    this.customControlForm.classList.add('hidden');
    this.customOverlay.classList.remove('placing');
    this.customOverlay.innerHTML = '';
    this.updateCustomControlsList();
    this.updateCustomSaveButton();

    // Show custom creator
    this.walkthroughSetup.classList.add('hidden');
    this.customCreator.classList.remove('hidden');
  }

  closeCustomCreator() {
    this.customCreatorMode = false;
    this.customCreator.classList.add('hidden');
    this.walkthroughSetup.classList.remove('hidden');
  }

  onCustomImageSelected(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      this.customImageData = event.target.result;
      this.customImage.src = this.customImageData;
      this.customImage.classList.remove('hidden');
      this.uploadPlaceholder.classList.add('hidden');
      this.changeImageBtn.classList.remove('hidden');
      this.clearControlsBtn.classList.remove('hidden');
      this.customOverlay.classList.add('placing');
      this.updateCustomSaveButton();
    };
    reader.readAsDataURL(file);
  }

  onCustomOverlayClick(e) {
    if (this.customIsDragging || this.customIsResizing) return;
    if (!this.customImageData) return;
    if (e.target !== this.customOverlay) return; // Clicked on a control box

    const rect = this.customOverlay.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Store position and show control form
    this.pendingControlPosition = { x, y };
    this.customControlForm.classList.remove('hidden');
    this.controlLabelInput.value = '';
    this.controlLabelInput.focus();

    // Add a preview box
    this.showPendingControlPreview(x, y);
  }

  showPendingControlPreview(x, y) {
    // Remove existing preview
    const existing = this.customOverlay.querySelector('.placing-indicator');
    if (existing) existing.remove();

    const preview = document.createElement('div');
    preview.className = 'placing-indicator';
    preview.style.left = `${x - 4}%`;
    preview.style.top = `${y - 2}%`;
    preview.style.width = '8%';
    preview.style.height = '4%';
    this.customOverlay.appendChild(preview);
  }

  setCustomControlType(type) {
    this.customControlType = type;
    this.typeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });
  }

  addCustomControl() {
    const label = this.controlLabelInput.value.trim();
    if (!label) {
      alert('Please enter a control name');
      return;
    }
    if (!this.pendingControlPosition) {
      alert('Please click on the image to place the control');
      return;
    }

    // Create control
    const control = {
      id: `custom_${Date.now()}_${this.customControls.length}`,
      label: label,
      type: this.customControlType,
      x: Math.round((this.pendingControlPosition.x - 4) * 10) / 10,
      y: Math.round((this.pendingControlPosition.y - 2) * 10) / 10,
      w: 8,
      h: 4
    };

    this.customControls.push(control);

    // Remove preview and add real control box
    const preview = this.customOverlay.querySelector('.placing-indicator');
    if (preview) preview.remove();

    this.renderCustomControlBox(control, this.customControls.length - 1);
    this.updateCustomControlsList();
    this.updateCustomSaveButton();

    // Hide form
    this.customControlForm.classList.add('hidden');
    this.pendingControlPosition = null;
  }

  cancelCustomControl() {
    // Remove preview
    const preview = this.customOverlay.querySelector('.placing-indicator');
    if (preview) preview.remove();

    this.customControlForm.classList.add('hidden');
    this.pendingControlPosition = null;
  }

  renderCustomControlBox(control, index) {
    const box = document.createElement('div');
    box.className = `custom-control-box ${control.type}`;
    box.dataset.index = index;
    box.style.left = `${control.x}%`;
    box.style.top = `${control.y}%`;
    box.style.width = `${control.w}%`;
    box.style.height = `${control.h}%`;

    const label = document.createElement('span');
    label.className = 'control-box-label';
    label.textContent = control.label;
    box.appendChild(label);

    const resize = document.createElement('div');
    resize.className = 'control-box-resize';
    box.appendChild(resize);

    // Drag handlers
    box.addEventListener('mousedown', (e) => this.onCustomControlMouseDown(e, index));

    this.customOverlay.appendChild(box);
  }

  onCustomControlMouseDown(e, index) {
    e.preventDefault();
    e.stopPropagation();

    this.customSelectedControl = index;

    // Highlight
    this.customOverlay.querySelectorAll('.custom-control-box').forEach((box, i) => {
      box.classList.toggle('selected', i === index);
    });

    if (e.target.classList.contains('control-box-resize')) {
      this.customIsResizing = true;
      this.customIsDragging = false;
    } else {
      this.customIsDragging = true;
      this.customIsResizing = false;
    }

    const rect = this.customOverlay.getBoundingClientRect();
    this.customOverlayRect = rect;
    this.customDragStartX = e.clientX;
    this.customDragStartY = e.clientY;

    const control = this.customControls[index];
    this.customControlStartX = control.x;
    this.customControlStartY = control.y;
    this.customControlStartW = control.w;
    this.customControlStartH = control.h;
  }

  onCustomOverlayMouseMove(e) {
    if (!this.customIsDragging && !this.customIsResizing) return;
    if (this.customSelectedControl === null) return;

    const control = this.customControls[this.customSelectedControl];
    const box = this.customOverlay.querySelector(`[data-index="${this.customSelectedControl}"]`);

    const deltaX = ((e.clientX - this.customDragStartX) / this.customOverlayRect.width) * 100;
    const deltaY = ((e.clientY - this.customDragStartY) / this.customOverlayRect.height) * 100;

    if (this.customIsDragging) {
      control.x = Math.max(0, Math.min(100 - control.w, this.customControlStartX + deltaX));
      control.y = Math.max(0, Math.min(100 - control.h, this.customControlStartY + deltaY));
      box.style.left = `${control.x}%`;
      box.style.top = `${control.y}%`;
    } else if (this.customIsResizing) {
      control.w = Math.max(3, Math.min(50, this.customControlStartW + deltaX));
      control.h = Math.max(2, Math.min(30, this.customControlStartH + deltaY));
      box.style.width = `${control.w}%`;
      box.style.height = `${control.h}%`;
    }
  }

  onCustomOverlayMouseUp() {
    this.customIsDragging = false;
    this.customIsResizing = false;
  }

  updateCustomControlsList() {
    this.controlsCount.textContent = this.customControls.length;

    if (this.customControls.length === 0) {
      this.controlsListItems.innerHTML = '<p class="no-controls">No controls added yet</p>';
      return;
    }

    this.controlsListItems.innerHTML = '';
    this.customControls.forEach((control, index) => {
      const item = document.createElement('div');
      item.className = 'control-list-item';
      item.innerHTML = `
        <span class="control-type-badge ${control.type}">${control.type}</span>
        <span class="control-name">${control.label}</span>
        <button class="control-delete" data-index="${index}">×</button>
      `;

      item.querySelector('.control-delete').addEventListener('click', () => this.deleteCustomControl(index));
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('control-delete')) return;
        this.highlightCustomControl(index);
      });

      this.controlsListItems.appendChild(item);
    });
  }

  deleteCustomControl(index) {
    this.customControls.splice(index, 1);

    // Re-render all boxes
    this.customOverlay.querySelectorAll('.custom-control-box').forEach(box => box.remove());
    this.customControls.forEach((control, i) => {
      this.renderCustomControlBox(control, i);
    });

    this.updateCustomControlsList();
    this.updateCustomSaveButton();
  }

  highlightCustomControl(index) {
    this.customOverlay.querySelectorAll('.custom-control-box').forEach((box, i) => {
      box.classList.toggle('selected', i === index);
    });
  }

  clearCustomControls() {
    if (!confirm('Clear all controls?')) return;
    this.customControls = [];
    this.customOverlay.querySelectorAll('.custom-control-box, .placing-indicator').forEach(el => el.remove());
    this.updateCustomControlsList();
    this.updateCustomSaveButton();
  }

  updateCustomSaveButton() {
    const hasImage = !!this.customImageData;
    const hasControls = this.customControls.length > 0;
    this.customSaveBtn.disabled = !(hasImage && hasControls);
  }

  saveCustomController() {
    if (this.selectedGamepadIndex === null) {
      alert('Please connect and select a controller first!');
      return;
    }

    const name = this.customControllerName.value.trim() || 'Custom Controller';
    const desc = this.customControllerDesc.value.trim() || 'User-created custom controller';

    // Generate a unique ID
    const id = `custom_${Date.now()}`;

    // Create controller definition
    const controller = {
      name: name,
      image: this.customImageData,
      description: desc,
      controls: this.customControls.map(c => ({
        id: c.id,
        label: c.label,
        type: c.type,
        x: Math.round(c.x * 10) / 10,
        y: Math.round(c.y * 10) / 10,
        w: Math.round(c.w * 10) / 10,
        h: Math.round(c.h * 10) / 10
      }))
    };

    // Add to definitions temporarily
    CONTROLLER_DEFINITIONS[id] = controller;

    // Close creator and start walkthrough
    this.customCreator.classList.add('hidden');
    this.customCreatorMode = false;

    // Start walkthrough with this controller
    this.startWalkthrough(id);
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
