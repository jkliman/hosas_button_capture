// Controller definitions for walkthrough wizard
// Each controller has an image and list of controls with their positions

const CONTROLLER_DEFINITIONS = {
  'sol-r2-hosas': {
    name: 'Sol-R2 HOSAS (Dual Stick)',
    image: 'controllers/sol-r2-hosas.png',
    description: 'Sol-R2 dual stick controller setup for space sims',
    controls: [
      // ============ LEFT STICK ============
      // Top section - Thumb buttons
      { id: 'left_thumb_hat_up', label: 'Thumb Hat Up', type: 'button', stick: 'left', x: 8.5, y: 18, w: 14, h: 5 },
      { id: 'left_thumb_hat_right', label: 'Thumb Hat Right', type: 'button', stick: 'left', x: 8.5, y: 23, w: 14, h: 5 },
      { id: 'left_thumb_hat_down', label: 'Thumb Hat Down', type: 'button', stick: 'left', x: 8.5, y: 28, w: 14, h: 5 },
      { id: 'left_thumb_hat_left', label: 'Thumb Hat Left', type: 'button', stick: 'left', x: 8.5, y: 33, w: 14, h: 5 },

      // Fire/Menu buttons
      { id: 'left_fire_menu', label: 'Fire Menu', type: 'button', stick: 'left', x: 3, y: 10, w: 12, h: 5 },

      // Fire Groups
      { id: 'left_fire_groups_1', label: 'Fire Groups 1', type: 'button', stick: 'left', x: 8.5, y: 40, w: 14, h: 5 },

      // Trigger
      { id: 'left_trigger', label: 'Trigger', type: 'button', stick: 'left', x: 24, y: 38, w: 10, h: 5 },

      // Ping
      { id: 'left_ping', label: 'Ping', type: 'button', stick: 'left', x: 8.5, y: 53, w: 14, h: 5 },

      // Scroll/POV controls
      { id: 'left_scroll_up', label: 'Scroll Up', type: 'button', stick: 'left', x: 24, y: 46, w: 10, h: 4 },
      { id: 'left_scroll_down', label: 'Scroll Down', type: 'button', stick: 'left', x: 24, y: 50, w: 10, h: 4 },
      { id: 'left_scroll_click', label: 'Scroll Click', type: 'button', stick: 'left', x: 24, y: 54, w: 10, h: 4 },

      // Base buttons
      { id: 'left_base_1', label: 'Base 1', type: 'button', stick: 'left', x: 2, y: 62, w: 10, h: 5 },
      { id: 'left_base_2', label: 'Base 2', type: 'button', stick: 'left', x: 2, y: 68, w: 10, h: 5 },
      { id: 'left_base_3', label: 'Base 3', type: 'button', stick: 'left', x: 2, y: 74, w: 10, h: 5 },
      { id: 'left_base_4', label: 'Base 4', type: 'button', stick: 'left', x: 2, y: 80, w: 10, h: 5 },

      // Stick axes
      { id: 'left_stick_x', label: 'Left Stick X (Strafe)', type: 'axis', stick: 'left', x: 35, y: 62, w: 12, h: 5 },
      { id: 'left_stick_y', label: 'Left Stick Y (Fwd/Back)', type: 'axis', stick: 'left', x: 35, y: 68, w: 12, h: 5 },
      { id: 'left_stick_twist', label: 'Left Stick Twist', type: 'axis', stick: 'left', x: 35, y: 74, w: 12, h: 5 },
      { id: 'left_throttle', label: 'Left Throttle', type: 'axis', stick: 'left', x: 35, y: 80, w: 12, h: 5 },

      // ============ RIGHT STICK ============
      // Top section - Thumb buttons
      { id: 'right_npc_interactions', label: 'NPC Interactions', type: 'button', stick: 'right', x: 77, y: 18, w: 14, h: 5 },
      { id: 'right_exit', label: 'Exit', type: 'button', stick: 'right', x: 85, y: 10, w: 10, h: 5 },

      // Menu/Mode buttons
      { id: 'right_menu_menu', label: 'Menu Menu', type: 'button', stick: 'right', x: 77, y: 23, w: 14, h: 5 },
      { id: 'right_edit_disable', label: 'Edit Disable', type: 'button', stick: 'right', x: 77, y: 28, w: 14, h: 5 },

      // Fire Groups
      { id: 'right_fire_groups_2', label: 'Fire Groups 2', type: 'button', stick: 'right', x: 77, y: 35, w: 14, h: 5 },

      // Targeting controls
      { id: 'right_target_nearest', label: 'Target Nearest', type: 'button', stick: 'right', x: 55, y: 40, w: 12, h: 4 },
      { id: 'right_cycle_hostile_fwd', label: 'Cycle Hostile Fwd', type: 'button', stick: 'right', x: 55, y: 44, w: 12, h: 4 },
      { id: 'right_cycle_hostile_back', label: 'Cycle Hostile Back', type: 'button', stick: 'right', x: 55, y: 48, w: 12, h: 4 },
      { id: 'right_cycle_all_fwd', label: 'Cycle All Fwd', type: 'button', stick: 'right', x: 55, y: 52, w: 12, h: 4 },
      { id: 'right_cycle_all_back', label: 'Cycle All Back', type: 'button', stick: 'right', x: 55, y: 56, w: 12, h: 4 },

      // Trigger
      { id: 'right_trigger', label: 'Trigger', type: 'button', stick: 'right', x: 68, y: 38, w: 10, h: 5 },

      // Right side controls
      { id: 'right_lights_on_off', label: 'Lights On/Off', type: 'button', stick: 'right', x: 85, y: 40, w: 12, h: 5 },
      { id: 'right_power_pref_1', label: 'Power Pref', type: 'button', stick: 'right', x: 85, y: 46, w: 12, h: 4 },
      { id: 'right_power_on', label: 'Power On', type: 'button', stick: 'right', x: 85, y: 50, w: 12, h: 4 },
      { id: 'right_engine_on', label: 'Engine On', type: 'button', stick: 'right', x: 85, y: 54, w: 12, h: 4 },
      { id: 'right_shield_on', label: 'Shield On', type: 'button', stick: 'right', x: 85, y: 58, w: 12, h: 4 },

      // Base buttons right side
      { id: 'right_mining_mode', label: 'Mining Mode', type: 'button', stick: 'right', x: 85, y: 65, w: 12, h: 5 },
      { id: 'right_salvage_mode', label: 'Salvage Mode', type: 'button', stick: 'right', x: 85, y: 71, w: 12, h: 5 },
      { id: 'right_scanning_mode', label: 'Scanning Mode', type: 'button', stick: 'right', x: 85, y: 77, w: 12, h: 5 },
      { id: 'right_reset', label: 'Reset', type: 'button', stick: 'right', x: 85, y: 83, w: 12, h: 5 },

      // Stick axes
      { id: 'right_stick_x', label: 'Right Stick X (Roll)', type: 'axis', stick: 'right', x: 55, y: 65, w: 12, h: 5 },
      { id: 'right_stick_y', label: 'Right Stick Y (Pitch)', type: 'axis', stick: 'right', x: 55, y: 71, w: 12, h: 5 },
      { id: 'right_stick_twist', label: 'Right Stick Twist (Yaw)', type: 'axis', stick: 'right', x: 55, y: 77, w: 12, h: 5 },
      { id: 'right_throttle', label: 'Right Throttle', type: 'axis', stick: 'right', x: 55, y: 83, w: 12, h: 5 },
    ]
  },

  'ursa-minor-winwing': {
    name: 'Ursa Minor WinWing (Dual Stick)',
    image: 'controllers/ursa-minor-winwing.webp',
    description: 'WinWing Ursa Minor dual stick HOSAS setup for space sims',
    controls: [
      // ============ LEFT STICK - BASE BUTTONS ============
      { id: 'left_base_1', label: 'Left Base Button 1', type: 'button', stick: 'left', x: 2, y: 77, w: 6, h: 4 },
      { id: 'left_base_2', label: 'Left Base Button 2', type: 'button', stick: 'left', x: 2, y: 82, w: 6, h: 4 },
      { id: 'left_base_3', label: 'Left Base Button 3', type: 'button', stick: 'left', x: 2, y: 87, w: 6, h: 4 },
      { id: 'left_base_4', label: 'Left Base Button 4', type: 'button', stick: 'left', x: 9, y: 77, w: 6, h: 4 },
      { id: 'left_base_5', label: 'Left Base Button 5', type: 'button', stick: 'left', x: 9, y: 82, w: 6, h: 4 },
      { id: 'left_base_6', label: 'Left Base Button 6', type: 'button', stick: 'left', x: 9, y: 87, w: 6, h: 4 },
      { id: 'left_base_7', label: 'Left Base Button 7', type: 'button', stick: 'left', x: 16, y: 77, w: 6, h: 4 },
      { id: 'left_base_8', label: 'Left Base Button 8', type: 'button', stick: 'left', x: 16, y: 82, w: 6, h: 4 },
      { id: 'left_base_9', label: 'Left Base Button 9', type: 'button', stick: 'left', x: 16, y: 87, w: 6, h: 4 },
      { id: 'left_base_10', label: 'Left Base Button 10', type: 'button', stick: 'left', x: 23, y: 77, w: 6, h: 4 },
      { id: 'left_base_11', label: 'Left Base Button 11', type: 'button', stick: 'left', x: 23, y: 82, w: 6, h: 4 },
      { id: 'left_base_12', label: 'Left Base Button 12', type: 'button', stick: 'left', x: 23, y: 87, w: 6, h: 4 },
      { id: 'left_base_13', label: 'Left Base Button 13', type: 'button', stick: 'left', x: 30, y: 82, w: 6, h: 4 },
      { id: 'left_base_14', label: 'Left Base Button 14', type: 'button', stick: 'left', x: 30, y: 87, w: 6, h: 4 },

      // ============ LEFT STICK - GRIP BUTTONS ============
      // Trigger and side buttons
      { id: 'left_btn_20', label: 'Left Button 20 (Trigger)', type: 'button', stick: 'left', x: 22, y: 35, w: 8, h: 5 },
      { id: 'left_btn_21', label: 'Left Button 21', type: 'button', stick: 'left', x: 22, y: 41, w: 8, h: 5 },
      { id: 'left_btn_22', label: 'Left Button 22', type: 'button', stick: 'left', x: 14, y: 35, w: 7, h: 5 },
      { id: 'left_btn_23', label: 'Left Button 23', type: 'button', stick: 'left', x: 14, y: 41, w: 7, h: 5 },
      { id: 'left_btn_24', label: 'Left Button 24', type: 'button', stick: 'left', x: 14, y: 47, w: 7, h: 5 },

      // Thumb buttons/hats
      { id: 'left_btn_25', label: 'Left Button 25', type: 'button', stick: 'left', x: 5, y: 18, w: 6, h: 4 },
      { id: 'left_btn_26', label: 'Left Button 26', type: 'button', stick: 'left', x: 5, y: 23, w: 6, h: 4 },
      { id: 'left_btn_27', label: 'Left Button 27', type: 'button', stick: 'left', x: 5, y: 28, w: 6, h: 4 },
      { id: 'left_btn_28', label: 'Left Button 28', type: 'button', stick: 'left', x: 5, y: 33, w: 6, h: 4 },

      // POV/Hat
      { id: 'left_btn_29', label: 'Left Button 29 (POV Up)', type: 'button', stick: 'left', x: 12, y: 18, w: 6, h: 4 },
      { id: 'left_btn_30', label: 'Left Button 30 (POV Right)', type: 'button', stick: 'left', x: 12, y: 23, w: 6, h: 4 },
      { id: 'left_btn_31', label: 'Left Button 31 (POV Down)', type: 'button', stick: 'left', x: 12, y: 28, w: 6, h: 4 },
      { id: 'left_btn_32', label: 'Left Button 32 (POV Left)', type: 'button', stick: 'left', x: 12, y: 33, w: 6, h: 4 },

      // Ministick
      { id: 'left_btn_33', label: 'Left Button 33 (Ministick Up)', type: 'button', stick: 'left', x: 19, y: 18, w: 7, h: 4 },
      { id: 'left_btn_34', label: 'Left Button 34 (Ministick Right)', type: 'button', stick: 'left', x: 19, y: 23, w: 7, h: 4 },
      { id: 'left_btn_35', label: 'Left Button 35 (Ministick Down)', type: 'button', stick: 'left', x: 19, y: 28, w: 7, h: 4 },
      { id: 'left_btn_36', label: 'Left Button 36 (Ministick Left)', type: 'button', stick: 'left', x: 19, y: 33, w: 7, h: 4 },
      { id: 'left_btn_37', label: 'Left Button 37 (Ministick Press)', type: 'button', stick: 'left', x: 26, y: 18, w: 7, h: 4 },

      // Upper buttons
      { id: 'left_btn_38', label: 'Left Button 38', type: 'button', stick: 'left', x: 26, y: 23, w: 7, h: 4 },
      { id: 'left_btn_39', label: 'Left Button 39', type: 'button', stick: 'left', x: 26, y: 28, w: 7, h: 4 },

      // Slider axis
      { id: 'left_slider', label: 'Left Slider', type: 'axis', stick: 'left', x: 37, y: 45, w: 8, h: 20 },

      // Stick axes
      { id: 'left_stick_x', label: 'Left Stick X', type: 'axis', stick: 'left', x: 2, y: 65, w: 10, h: 4 },
      { id: 'left_stick_y', label: 'Left Stick Y', type: 'axis', stick: 'left', x: 13, y: 65, w: 10, h: 4 },
      { id: 'left_stick_twist', label: 'Left Stick Twist', type: 'axis', stick: 'left', x: 24, y: 65, w: 10, h: 4 },

      // ============ RIGHT STICK - BASE BUTTONS ============
      { id: 'right_base_1', label: 'Right Base Button 1', type: 'button', stick: 'right', x: 62, y: 77, w: 6, h: 4 },
      { id: 'right_base_2', label: 'Right Base Button 2', type: 'button', stick: 'right', x: 62, y: 82, w: 6, h: 4 },
      { id: 'right_base_3', label: 'Right Base Button 3', type: 'button', stick: 'right', x: 62, y: 87, w: 6, h: 4 },
      { id: 'right_base_4', label: 'Right Base Button 4', type: 'button', stick: 'right', x: 69, y: 77, w: 6, h: 4 },
      { id: 'right_base_5', label: 'Right Base Button 5', type: 'button', stick: 'right', x: 69, y: 82, w: 6, h: 4 },
      { id: 'right_base_6', label: 'Right Base Button 6', type: 'button', stick: 'right', x: 69, y: 87, w: 6, h: 4 },
      { id: 'right_base_7', label: 'Right Base Button 7', type: 'button', stick: 'right', x: 76, y: 77, w: 6, h: 4 },
      { id: 'right_base_8', label: 'Right Base Button 8', type: 'button', stick: 'right', x: 76, y: 82, w: 6, h: 4 },
      { id: 'right_base_9', label: 'Right Base Button 9', type: 'button', stick: 'right', x: 76, y: 87, w: 6, h: 4 },
      { id: 'right_base_10', label: 'Right Base Button 10', type: 'button', stick: 'right', x: 83, y: 77, w: 6, h: 4 },
      { id: 'right_base_11', label: 'Right Base Button 11', type: 'button', stick: 'right', x: 83, y: 82, w: 6, h: 4 },
      { id: 'right_base_12', label: 'Right Base Button 12', type: 'button', stick: 'right', x: 83, y: 87, w: 6, h: 4 },
      { id: 'right_base_13', label: 'Right Base Button 13', type: 'button', stick: 'right', x: 90, y: 82, w: 6, h: 4 },
      { id: 'right_base_14', label: 'Right Base Button 14', type: 'button', stick: 'right', x: 90, y: 87, w: 6, h: 4 },

      // ============ RIGHT STICK - GRIP BUTTONS ============
      // Trigger and side buttons
      { id: 'right_btn_20', label: 'Right Button 20 (Trigger)', type: 'button', stick: 'right', x: 70, y: 35, w: 8, h: 5 },
      { id: 'right_btn_21', label: 'Right Button 21', type: 'button', stick: 'right', x: 70, y: 41, w: 8, h: 5 },
      { id: 'right_btn_22', label: 'Right Button 22', type: 'button', stick: 'right', x: 79, y: 35, w: 7, h: 5 },
      { id: 'right_btn_23', label: 'Right Button 23', type: 'button', stick: 'right', x: 79, y: 41, w: 7, h: 5 },
      { id: 'right_btn_24', label: 'Right Button 24', type: 'button', stick: 'right', x: 79, y: 47, w: 7, h: 5 },

      // Thumb buttons/hats
      { id: 'right_btn_25', label: 'Right Button 25', type: 'button', stick: 'right', x: 89, y: 18, w: 6, h: 4 },
      { id: 'right_btn_26', label: 'Right Button 26', type: 'button', stick: 'right', x: 89, y: 23, w: 6, h: 4 },
      { id: 'right_btn_27', label: 'Right Button 27', type: 'button', stick: 'right', x: 89, y: 28, w: 6, h: 4 },
      { id: 'right_btn_28', label: 'Right Button 28', type: 'button', stick: 'right', x: 89, y: 33, w: 6, h: 4 },

      // POV/Hat
      { id: 'right_btn_29', label: 'Right Button 29 (POV Up)', type: 'button', stick: 'right', x: 82, y: 18, w: 6, h: 4 },
      { id: 'right_btn_30', label: 'Right Button 30 (POV Right)', type: 'button', stick: 'right', x: 82, y: 23, w: 6, h: 4 },
      { id: 'right_btn_31', label: 'Right Button 31 (POV Down)', type: 'button', stick: 'right', x: 82, y: 28, w: 6, h: 4 },
      { id: 'right_btn_32', label: 'Right Button 32 (POV Left)', type: 'button', stick: 'right', x: 82, y: 33, w: 6, h: 4 },

      // Ministick
      { id: 'right_btn_33', label: 'Right Button 33 (Ministick Up)', type: 'button', stick: 'right', x: 75, y: 18, w: 7, h: 4 },
      { id: 'right_btn_34', label: 'Right Button 34 (Ministick Right)', type: 'button', stick: 'right', x: 75, y: 23, w: 7, h: 4 },
      { id: 'right_btn_35', label: 'Right Button 35 (Ministick Down)', type: 'button', stick: 'right', x: 75, y: 28, w: 7, h: 4 },
      { id: 'right_btn_36', label: 'Right Button 36 (Ministick Left)', type: 'button', stick: 'right', x: 75, y: 33, w: 7, h: 4 },
      { id: 'right_btn_37', label: 'Right Button 37 (Ministick Press)', type: 'button', stick: 'right', x: 68, y: 18, w: 7, h: 4 },

      // Upper buttons
      { id: 'right_btn_38', label: 'Right Button 38', type: 'button', stick: 'right', x: 68, y: 23, w: 7, h: 4 },
      { id: 'right_btn_39', label: 'Right Button 39', type: 'button', stick: 'right', x: 68, y: 28, w: 7, h: 4 },

      // Slider axis
      { id: 'right_slider', label: 'Right Slider', type: 'axis', stick: 'right', x: 55, y: 45, w: 8, h: 20 },

      // Stick axes
      { id: 'right_stick_x', label: 'Right Stick X', type: 'axis', stick: 'right', x: 62, y: 65, w: 10, h: 4 },
      { id: 'right_stick_y', label: 'Right Stick Y', type: 'axis', stick: 'right', x: 73, y: 65, w: 10, h: 4 },
      { id: 'right_stick_twist', label: 'Right Stick Twist', type: 'axis', stick: 'right', x: 84, y: 65, w: 10, h: 4 },
    ]
  },

  'virpil-constellation-alpha': {
    name: 'Virpil Constellation Alpha',
    image: 'controllers/virpil-constellation-alpha.png',
    description: 'Virpil VPC Constellation Alpha grip - premium space sim joystick',
    controls: [
      // ============ TOP SECTION - POV Hats ============
      // POV Hat 1 (Top left, 4-way)
      { id: 'pov1_up', label: 'POV1 Up (Btn 5)', type: 'button', x: 5, y: 8, w: 8, h: 4 },
      { id: 'pov1_right', label: 'POV1 Right (Btn 6)', type: 'button', x: 5, y: 13, w: 8, h: 4 },
      { id: 'pov1_down', label: 'POV1 Down (Btn 7)', type: 'button', x: 5, y: 18, w: 8, h: 4 },
      { id: 'pov1_left', label: 'POV1 Left (Btn 8)', type: 'button', x: 5, y: 23, w: 8, h: 4 },

      // POV Hat 2 (Top center-left, 5-way with push)
      { id: 'pov2_up', label: 'POV2 Up (Btn 9)', type: 'button', x: 15, y: 8, w: 8, h: 4 },
      { id: 'pov2_right', label: 'POV2 Right (Btn 10)', type: 'button', x: 15, y: 13, w: 8, h: 4 },
      { id: 'pov2_down', label: 'POV2 Down (Btn 11)', type: 'button', x: 15, y: 18, w: 8, h: 4 },
      { id: 'pov2_left', label: 'POV2 Left (Btn 12)', type: 'button', x: 15, y: 23, w: 8, h: 4 },
      { id: 'pov2_push', label: 'POV2 Push (Btn 13)', type: 'button', x: 15, y: 28, w: 8, h: 4 },

      // Ministick / Analog stick (center-right)
      { id: 'ministick_up', label: 'Ministick Up (Btn 14)', type: 'button', x: 25, y: 8, w: 8, h: 4 },
      { id: 'ministick_right', label: 'Ministick Right (Btn 15)', type: 'button', x: 25, y: 13, w: 8, h: 4 },
      { id: 'ministick_down', label: 'Ministick Down (Btn 16)', type: 'button', x: 25, y: 18, w: 8, h: 4 },
      { id: 'ministick_left', label: 'Ministick Left (Btn 17)', type: 'button', x: 25, y: 23, w: 8, h: 4 },
      { id: 'ministick_push', label: 'Ministick Push (Btn 18)', type: 'button', x: 25, y: 28, w: 8, h: 4 },

      // ============ FRONT FACE BUTTONS ============
      // Button 1 (red button, top)
      { id: 'btn_1', label: 'Button 1 (Red)', type: 'button', x: 35, y: 10, w: 8, h: 5 },

      // Button 2 (below button 1)
      { id: 'btn_2', label: 'Button 2', type: 'button', x: 35, y: 16, w: 8, h: 5 },

      // Button 3 (side)
      { id: 'btn_3', label: 'Button 3', type: 'button', x: 35, y: 22, w: 8, h: 5 },

      // Button 4 (side)
      { id: 'btn_4', label: 'Button 4', type: 'button', x: 35, y: 28, w: 8, h: 5 },

      // ============ TRIGGER SECTION ============
      // Primary trigger (2-stage)
      { id: 'trigger_stage1', label: 'Trigger Stage 1 (Btn 19)', type: 'button', x: 45, y: 35, w: 10, h: 5 },
      { id: 'trigger_stage2', label: 'Trigger Stage 2 (Btn 20)', type: 'button', x: 45, y: 41, w: 10, h: 5 },

      // Flip trigger (underneath)
      { id: 'flip_trigger', label: 'Flip Trigger (Btn 21)', type: 'button', x: 45, y: 47, w: 10, h: 5 },

      // ============ THUMB BUTTONS (Left side) ============
      { id: 'btn_22', label: 'Button 22', type: 'button', x: 5, y: 40, w: 8, h: 5 },
      { id: 'btn_23', label: 'Button 23', type: 'button', x: 5, y: 46, w: 8, h: 5 },
      { id: 'btn_24', label: 'Button 24', type: 'button', x: 5, y: 52, w: 8, h: 5 },

      // ============ ENCODER / SCROLL WHEEL ============
      { id: 'encoder_up', label: 'Encoder Up (Btn 25)', type: 'button', x: 15, y: 40, w: 8, h: 4 },
      { id: 'encoder_down', label: 'Encoder Down (Btn 26)', type: 'button', x: 15, y: 45, w: 8, h: 4 },
      { id: 'encoder_push', label: 'Encoder Push (Btn 27)', type: 'button', x: 15, y: 50, w: 8, h: 4 },

      // ============ BOTTOM / BRAKE LEVER ============
      { id: 'brake_btn', label: 'Brake Button (Btn 28)', type: 'button', x: 25, y: 55, w: 10, h: 5 },

      // ============ SIDE BUTTONS (Right side view) ============
      { id: 'btn_29', label: 'Button 29', type: 'button', x: 60, y: 20, w: 8, h: 5 },
      { id: 'btn_30', label: 'Button 30', type: 'button', x: 60, y: 26, w: 8, h: 5 },
      { id: 'btn_31', label: 'Button 31', type: 'button', x: 60, y: 32, w: 8, h: 5 },

      // ============ PINKY BUTTONS (Bottom right view) ============
      { id: 'pinky_btn', label: 'Pinky Button (Btn 32)', type: 'button', x: 75, y: 50, w: 10, h: 5 },
      { id: 'pinky_rocker_up', label: 'Pinky Rocker Up (Btn 33)', type: 'button', x: 75, y: 56, w: 10, h: 4 },
      { id: 'pinky_rocker_down', label: 'Pinky Rocker Down (Btn 34)', type: 'button', x: 75, y: 61, w: 10, h: 4 },

      // ============ AXES ============
      { id: 'stick_x', label: 'Stick X Axis', type: 'axis', x: 5, y: 70, w: 12, h: 4 },
      { id: 'stick_y', label: 'Stick Y Axis', type: 'axis', x: 18, y: 70, w: 12, h: 4 },
      { id: 'ministick_x_axis', label: 'Ministick X Axis', type: 'axis', x: 31, y: 70, w: 12, h: 4 },
      { id: 'ministick_y_axis', label: 'Ministick Y Axis', type: 'axis', x: 44, y: 70, w: 12, h: 4 },
      { id: 'brake_axis', label: 'Brake Lever Axis', type: 'axis', x: 57, y: 70, w: 12, h: 4 },
    ]
  },

  'virpil-cm3-throttle': {
    name: 'Virpil VPC MongoosT-50CM3 Throttle',
    image: 'controllers/virpil-cm3-throttle.png',
    description: 'Virpil VPC MongoosT-50CM3 dual throttle with extensive buttons and switches',
    controls: [
      // ============ LEFT THROTTLE GRIP ============
      // POV Hat 1 (left grip top)
      { id: 'left_pov1_up', label: 'Left POV1 Up (Btn 1)', type: 'button', x: 2, y: 5, w: 7, h: 3 },
      { id: 'left_pov1_right', label: 'Left POV1 Right (Btn 2)', type: 'button', x: 2, y: 9, w: 7, h: 3 },
      { id: 'left_pov1_down', label: 'Left POV1 Down (Btn 3)', type: 'button', x: 2, y: 13, w: 7, h: 3 },
      { id: 'left_pov1_left', label: 'Left POV1 Left (Btn 4)', type: 'button', x: 2, y: 17, w: 7, h: 3 },
      { id: 'left_pov1_push', label: 'Left POV1 Push (Btn 5)', type: 'button', x: 2, y: 21, w: 7, h: 3 },

      // Left grip buttons
      { id: 'left_btn_6', label: 'Left Button 6', type: 'button', x: 2, y: 26, w: 7, h: 3 },
      { id: 'left_btn_7', label: 'Left Button 7', type: 'button', x: 2, y: 30, w: 7, h: 3 },
      { id: 'left_btn_8', label: 'Left Button 8', type: 'button', x: 2, y: 34, w: 7, h: 3 },

      // Left encoder
      { id: 'left_encoder_cw', label: 'Left Encoder CW (Btn 9)', type: 'button', x: 2, y: 39, w: 7, h: 3 },
      { id: 'left_encoder_ccw', label: 'Left Encoder CCW (Btn 10)', type: 'button', x: 2, y: 43, w: 7, h: 3 },
      { id: 'left_encoder_push', label: 'Left Encoder Push (Btn 11)', type: 'button', x: 2, y: 47, w: 7, h: 3 },

      // Left ministick
      { id: 'left_ministick_up', label: 'Left Ministick Up (Btn 12)', type: 'button', x: 2, y: 52, w: 7, h: 3 },
      { id: 'left_ministick_right', label: 'Left Ministick Right (Btn 13)', type: 'button', x: 2, y: 56, w: 7, h: 3 },
      { id: 'left_ministick_down', label: 'Left Ministick Down (Btn 14)', type: 'button', x: 2, y: 60, w: 7, h: 3 },
      { id: 'left_ministick_left', label: 'Left Ministick Left (Btn 15)', type: 'button', x: 2, y: 64, w: 7, h: 3 },
      { id: 'left_ministick_push', label: 'Left Ministick Push (Btn 16)', type: 'button', x: 2, y: 68, w: 7, h: 3 },

      // ============ RIGHT THROTTLE GRIP ============
      // POV Hat 2 (right grip top)
      { id: 'right_pov2_up', label: 'Right POV2 Up (Btn 17)', type: 'button', x: 55, y: 5, w: 7, h: 3 },
      { id: 'right_pov2_right', label: 'Right POV2 Right (Btn 18)', type: 'button', x: 55, y: 9, w: 7, h: 3 },
      { id: 'right_pov2_down', label: 'Right POV2 Down (Btn 19)', type: 'button', x: 55, y: 13, w: 7, h: 3 },
      { id: 'right_pov2_left', label: 'Right POV2 Left (Btn 20)', type: 'button', x: 55, y: 17, w: 7, h: 3 },
      { id: 'right_pov2_push', label: 'Right POV2 Push (Btn 21)', type: 'button', x: 55, y: 21, w: 7, h: 3 },

      // Right grip buttons
      { id: 'right_btn_22', label: 'Right Button 22', type: 'button', x: 55, y: 26, w: 7, h: 3 },
      { id: 'right_btn_23', label: 'Right Button 23', type: 'button', x: 55, y: 30, w: 7, h: 3 },
      { id: 'right_btn_24', label: 'Right Button 24', type: 'button', x: 55, y: 34, w: 7, h: 3 },

      // Right encoder
      { id: 'right_encoder_cw', label: 'Right Encoder CW (Btn 25)', type: 'button', x: 55, y: 39, w: 7, h: 3 },
      { id: 'right_encoder_ccw', label: 'Right Encoder CCW (Btn 26)', type: 'button', x: 55, y: 43, w: 7, h: 3 },
      { id: 'right_encoder_push', label: 'Right Encoder Push (Btn 27)', type: 'button', x: 55, y: 47, w: 7, h: 3 },

      // Right ministick
      { id: 'right_ministick_up', label: 'Right Ministick Up (Btn 28)', type: 'button', x: 55, y: 52, w: 7, h: 3 },
      { id: 'right_ministick_right', label: 'Right Ministick Right (Btn 29)', type: 'button', x: 55, y: 56, w: 7, h: 3 },
      { id: 'right_ministick_down', label: 'Right Ministick Down (Btn 30)', type: 'button', x: 55, y: 60, w: 7, h: 3 },
      { id: 'right_ministick_left', label: 'Right Ministick Left (Btn 31)', type: 'button', x: 55, y: 64, w: 7, h: 3 },
      { id: 'right_ministick_push', label: 'Right Ministick Push (Btn 32)', type: 'button', x: 55, y: 68, w: 7, h: 3 },

      // ============ CENTER PANEL - TOP BUTTONS ============
      { id: 'btn_33', label: 'Button 33 (Red)', type: 'button', x: 25, y: 5, w: 7, h: 4 },
      { id: 'btn_34', label: 'Button 34', type: 'button', x: 33, y: 5, w: 7, h: 4 },
      { id: 'btn_35', label: 'Button 35', type: 'button', x: 41, y: 5, w: 7, h: 4 },

      // ============ CENTER PANEL - TOGGLE SWITCHES ============
      // Row 1 toggles
      { id: 'toggle_1_up', label: 'Toggle 1 Up (Btn 36)', type: 'button', x: 25, y: 12, w: 6, h: 3 },
      { id: 'toggle_1_down', label: 'Toggle 1 Down (Btn 37)', type: 'button', x: 25, y: 16, w: 6, h: 3 },
      { id: 'toggle_2_up', label: 'Toggle 2 Up (Btn 38)', type: 'button', x: 32, y: 12, w: 6, h: 3 },
      { id: 'toggle_2_down', label: 'Toggle 2 Down (Btn 39)', type: 'button', x: 32, y: 16, w: 6, h: 3 },
      { id: 'toggle_3_up', label: 'Toggle 3 Up (Btn 40)', type: 'button', x: 39, y: 12, w: 6, h: 3 },
      { id: 'toggle_3_down', label: 'Toggle 3 Down (Btn 41)', type: 'button', x: 39, y: 16, w: 6, h: 3 },

      // Row 2 toggles
      { id: 'toggle_4_up', label: 'Toggle 4 Up (Btn 42)', type: 'button', x: 25, y: 22, w: 6, h: 3 },
      { id: 'toggle_4_down', label: 'Toggle 4 Down (Btn 43)', type: 'button', x: 25, y: 26, w: 6, h: 3 },
      { id: 'toggle_5_up', label: 'Toggle 5 Up (Btn 44)', type: 'button', x: 32, y: 22, w: 6, h: 3 },
      { id: 'toggle_5_down', label: 'Toggle 5 Down (Btn 45)', type: 'button', x: 32, y: 26, w: 6, h: 3 },
      { id: 'toggle_6_up', label: 'Toggle 6 Up (Btn 46)', type: 'button', x: 39, y: 22, w: 6, h: 3 },
      { id: 'toggle_6_down', label: 'Toggle 6 Down (Btn 47)', type: 'button', x: 39, y: 26, w: 6, h: 3 },

      // ============ CENTER PANEL - ENCODERS ============
      { id: 'center_encoder1_cw', label: 'Center Encoder 1 CW (Btn 48)', type: 'button', x: 25, y: 32, w: 6, h: 3 },
      { id: 'center_encoder1_ccw', label: 'Center Encoder 1 CCW (Btn 49)', type: 'button', x: 25, y: 36, w: 6, h: 3 },
      { id: 'center_encoder1_push', label: 'Center Encoder 1 Push (Btn 50)', type: 'button', x: 25, y: 40, w: 6, h: 3 },

      { id: 'center_encoder2_cw', label: 'Center Encoder 2 CW (Btn 51)', type: 'button', x: 32, y: 32, w: 6, h: 3 },
      { id: 'center_encoder2_ccw', label: 'Center Encoder 2 CCW (Btn 52)', type: 'button', x: 32, y: 36, w: 6, h: 3 },
      { id: 'center_encoder2_push', label: 'Center Encoder 2 Push (Btn 53)', type: 'button', x: 32, y: 40, w: 6, h: 3 },

      { id: 'center_encoder3_cw', label: 'Center Encoder 3 CW (Btn 54)', type: 'button', x: 39, y: 32, w: 6, h: 3 },
      { id: 'center_encoder3_ccw', label: 'Center Encoder 3 CCW (Btn 55)', type: 'button', x: 39, y: 36, w: 6, h: 3 },
      { id: 'center_encoder3_push', label: 'Center Encoder 3 Push (Btn 56)', type: 'button', x: 39, y: 40, w: 6, h: 3 },

      // ============ CENTER PANEL - MODE SWITCH ============
      { id: 'mode_1', label: 'Mode Switch 1 (Btn 57)', type: 'button', x: 25, y: 46, w: 6, h: 3 },
      { id: 'mode_2', label: 'Mode Switch 2 (Btn 58)', type: 'button', x: 32, y: 46, w: 6, h: 3 },
      { id: 'mode_3', label: 'Mode Switch 3 (Btn 59)', type: 'button', x: 39, y: 46, w: 6, h: 3 },

      // ============ BOTTOM BUTTONS ============
      { id: 'btn_60', label: 'Button 60 (Green)', type: 'button', x: 70, y: 75, w: 6, h: 4 },
      { id: 'btn_61', label: 'Button 61 (Blue)', type: 'button', x: 77, y: 75, w: 6, h: 4 },
      { id: 'btn_62', label: 'Button 62 (Yellow)', type: 'button', x: 84, y: 75, w: 6, h: 4 },
      { id: 'btn_63', label: 'Button 63 (Orange)', type: 'button', x: 91, y: 75, w: 6, h: 4 },

      // ============ AXES ============
      { id: 'left_throttle', label: 'Left Throttle Axis', type: 'axis', x: 5, y: 80, w: 10, h: 4 },
      { id: 'right_throttle', label: 'Right Throttle Axis', type: 'axis', x: 16, y: 80, w: 10, h: 4 },
      { id: 'left_ministick_x', label: 'Left Ministick X Axis', type: 'axis', x: 27, y: 80, w: 10, h: 4 },
      { id: 'left_ministick_y', label: 'Left Ministick Y Axis', type: 'axis', x: 38, y: 80, w: 10, h: 4 },
      { id: 'right_ministick_x', label: 'Right Ministick X Axis', type: 'axis', x: 49, y: 80, w: 10, h: 4 },
      { id: 'right_ministick_y', label: 'Right Ministick Y Axis', type: 'axis', x: 60, y: 80, w: 10, h: 4 },
    ]
  },

  'vkb-stecs-throttle': {
    name: 'VKB STECS Throttle',
    image: 'controllers/vkb-stecs-throttle.webp',
    description: 'VKB STECS modular throttle system with extensive buttons, encoders, and switches',
    controls: [
      // ============ THROTTLE GRIP - TOP SECTION ============
      // DOT button
      { id: 'dot_1', label: 'DOT Button 1', type: 'button', x: 2, y: 28, w: 6, h: 3 },

      // Red Start button
      { id: 'red_start_2', label: 'Red Start Button 2', type: 'button', x: 18, y: 28, w: 7, h: 3 },

      // Main numbered buttons (throttle grip)
      { id: 'btn_1_3', label: 'Button 1/3', type: 'button', x: 12, y: 33, w: 6, h: 3 },
      { id: 'btn_2_4', label: 'Button 2/4', type: 'button', x: 12, y: 37, w: 6, h: 3 },
      { id: 'btn_3_5', label: 'Button 3/5', type: 'button', x: 12, y: 41, w: 6, h: 3 },
      { id: 'btn_4_6', label: 'Button 4/6', type: 'button', x: 12, y: 45, w: 6, h: 3 },
      { id: 'btn_5_7', label: 'Button 5/7', type: 'button', x: 12, y: 49, w: 6, h: 3 },

      // Triggers
      { id: 'trig_8', label: 'TRIG Button 8', type: 'button', x: 35, y: 45, w: 6, h: 3 },
      { id: 'trig_l_9', label: 'TRIG L Button 9', type: 'button', x: 55, y: 45, w: 6, h: 3 },
      { id: 'trig_16', label: 'TRIG Button 16', type: 'button', x: 35, y: 49, w: 6, h: 3 },
      { id: 'trig_r_17', label: 'TRIG R Button 17', type: 'button', x: 55, y: 49, w: 6, h: 3 },

      // RST and ENT buttons
      { id: 'rst_11', label: 'RST Button 11', type: 'button', x: 55, y: 10, w: 6, h: 3 },
      { id: 'red_btn_10', label: 'Red Button 10', type: 'button', x: 55, y: 14, w: 6, h: 3 },
      { id: 'ent_18', label: 'ENT Button 18', type: 'button', x: 55, y: 18, w: 6, h: 3 },

      // Roller encoders
      { id: 'roller_12_back', label: 'Roller 12 - Roll Backward', type: 'button', x: 30, y: 5, w: 7, h: 3 },
      { id: 'roller_13_fwd', label: 'Roller 13 - Roll Forward', type: 'button', x: 30, y: 9, w: 7, h: 3 },
      { id: 'roller_14_fwd', label: 'Roller 14 - Roll Forward', type: 'button', x: 42, y: 5, w: 7, h: 3 },
      { id: 'roller_15_back', label: 'Roller 15 - Roll Backward', type: 'button', x: 42, y: 9, w: 7, h: 3 },

      // ============ LEFT HAT (5-way) ============
      { id: 'left_hat_20_depress', label: 'Left Hat Depress 20', type: 'button', x: 2, y: 18, w: 6, h: 3 },
      { id: 'left_hat_22_depress', label: 'Left Hat 22 Depress', type: 'button', x: 2, y: 10, w: 6, h: 3 },
      { id: 'left_hat_33_down', label: 'Left Hat 33 - Down', type: 'button', x: 2, y: 14, w: 6, h: 3 },
      { id: 'left_hat_34_up', label: 'Left Hat 34 - Up', type: 'button', x: 10, y: 10, w: 6, h: 3 },

      // ============ CENTER LEFT HAT (5-way) ============
      { id: 'hat_24_depress', label: 'Hat 24 - Button not Hat', type: 'button', x: 2, y: 35, w: 7, h: 3 },
      { id: 'hat_25_up', label: 'Hat 25 - Up', type: 'button', x: 2, y: 39, w: 7, h: 3 },
      { id: 'hat_26_down', label: 'Hat 26 - Down', type: 'button', x: 2, y: 43, w: 7, h: 3 },
      { id: 'hat_27_push', label: 'Hat 27 - Push', type: 'button', x: 2, y: 47, w: 7, h: 3 },
      { id: 'hat_28_pull', label: 'Hat 28 - Pull', type: 'button', x: 2, y: 51, w: 7, h: 3 },

      // ============ RIGHT HAT (5-way) ============
      { id: 'hat_21_depress', label: 'Hat 21 Depress', type: 'button', x: 55, y: 25, w: 7, h: 3 },
      { id: 'hat_23_depress', label: 'Hat 23 - Button not Hat', type: 'button', x: 55, y: 29, w: 7, h: 3 },
      { id: 'hat_29', label: 'Hat Button 29', type: 'button', x: 55, y: 33, w: 7, h: 3 },
      { id: 'hat_30', label: 'Hat Button 30', type: 'button', x: 55, y: 37, w: 7, h: 3 },
      { id: 'hat_31_down', label: 'Hat 31 - Down (Push)', type: 'button', x: 55, y: 41, w: 7, h: 3 },
      { id: 'hat_32_up', label: 'Hat 32 - Up (Pull)', type: 'button', x: 48, y: 37, w: 7, h: 3 },

      // ============ BASE PANEL - TOP ROW ============
      // SW1 / SW2 rockers
      { id: 'sw1_43', label: 'SW1 Up (43)', type: 'button', x: 25, y: 55, w: 6, h: 3 },
      { id: 'sw1_44', label: 'SW1 Button 44', type: 'button', x: 25, y: 59, w: 6, h: 3 },
      { id: 'sw1_45', label: 'SW1 Down (45)', type: 'button', x: 25, y: 63, w: 6, h: 3 },
      { id: 'sw2_46', label: 'SW2 Up (46)', type: 'button', x: 40, y: 55, w: 6, h: 3 },
      { id: 'sw2_47', label: 'SW2 Button 47', type: 'button', x: 40, y: 59, w: 6, h: 3 },
      { id: 'sw2_48', label: 'SW2 Down (48)', type: 'button', x: 40, y: 63, w: 6, h: 3 },

      // Toggle switches TGL
      { id: 'tgl_up_49', label: 'TGL Up (49)', type: 'button', x: 8, y: 60, w: 6, h: 3 },
      { id: 'tgl_dn_50', label: 'TGL Down (50)', type: 'button', x: 8, y: 64, w: 6, h: 3 },

      // ============ BASE PANEL - ENCODERS ============
      { id: 'en1_51', label: 'EN1 Depress (51)', type: 'button', x: 32, y: 88, w: 6, h: 3 },
      { id: 'en2_52', label: 'EN2 Depress (52)', type: 'button', x: 32, y: 92, w: 6, h: 3 },
      { id: 'en2_53', label: 'EN2 CW (53)', type: 'button', x: 8, y: 85, w: 6, h: 3 },
      { id: 'en2_54', label: 'EN2 CCW (54)', type: 'button', x: 8, y: 89, w: 6, h: 3 },

      // ============ BASE PANEL - BUTTONS B1-B5 ============
      { id: 'b1_38', label: 'B1 Button (38)', type: 'button', x: 55, y: 60, w: 6, h: 3 },
      { id: 'b2_39', label: 'B2 Button (39)', type: 'button', x: 55, y: 64, w: 6, h: 3 },
      { id: 'b3_40', label: 'B3 Button (40)', type: 'button', x: 55, y: 68, w: 6, h: 3 },
      { id: 'b4_41', label: 'B4 Button (41)', type: 'button', x: 55, y: 72, w: 6, h: 3 },
      { id: 'b5_42', label: 'B5 Button (42)', type: 'button', x: 55, y: 76, w: 6, h: 3 },

      // ============ BASE PANEL - A BUTTONS ============
      { id: 'a1_35', label: 'A1 Button (35)', type: 'button', x: 32, y: 78, w: 6, h: 3 },
      { id: 'a2_36', label: 'A2 Button (36)', type: 'button', x: 40, y: 78, w: 6, h: 3 },
      { id: 'c1_37', label: 'C1 Button (37)', type: 'button', x: 36, y: 82, w: 6, h: 3 },

      // ============ BASE PANEL - UP/DN ROCKER ============
      { id: 'up_57', label: 'UP Button (57)', type: 'button', x: 2, y: 75, w: 6, h: 4 },
      { id: 'dn_58', label: 'DN Button (58)', type: 'button', x: 2, y: 80, w: 6, h: 4 },

      // ============ AXES ============
      { id: 'throttle_axis', label: 'Throttle Axis', type: 'axis', x: 5, y: 95, w: 12, h: 4 },
      { id: 'h_v_axis_h', label: 'H/V Axis - Horizontal', type: 'axis', x: 18, y: 95, w: 12, h: 4 },
      { id: 'h_v_axis_v', label: 'H/V Axis - Vertical', type: 'axis', x: 31, y: 95, w: 12, h: 4 },
    ]
  },

  'vkb-gunfighter-scg': {
    name: 'VKB Gunfighter IV SCG',
    image: 'controllers/vkb-gunfighter-scg.png',
    description: 'VKB Gunfighter IV with Space Combat Grip (SCG) - Right Hand',
    controls: [
      // ============ A1 - MINISTICK (5-way + analog) ============
      { id: 'a1_o', label: 'A1 Ministick Press (O)', type: 'button', x: 2, y: 5, w: 8, h: 4 },
      { id: 'a1_up', label: 'A1 Ministick Up (^)', type: 'button', x: 2, y: 10, w: 8, h: 4 },
      { id: 'a1_down', label: 'A1 Ministick Down (v)', type: 'button', x: 2, y: 15, w: 8, h: 4 },
      { id: 'a1_left', label: 'A1 Ministick Left (<)', type: 'button', x: 2, y: 20, w: 8, h: 4 },
      { id: 'a1_right', label: 'A1 Ministick Right (>)', type: 'button', x: 2, y: 25, w: 8, h: 4 },

      // ============ A2 - RED BUTTON ============
      { id: 'a2_red', label: 'A2 Red Button', type: 'button', x: 2, y: 32, w: 10, h: 5 },

      // ============ RAPID FIRE TRIGGER ============
      { id: 'rapid_fire_up', label: 'Rapid Fire Trigger Up (^)', type: 'button', x: 2, y: 40, w: 10, h: 4 },
      { id: 'rapid_fire_down', label: 'Rapid Fire Trigger Down (v)', type: 'button', x: 2, y: 45, w: 10, h: 4 },

      // ============ MAIN TRIGGER (2-stage) ============
      { id: 'main_trigger_1', label: 'Main Trigger Stage 1', type: 'button', x: 2, y: 52, w: 10, h: 4 },
      { id: 'main_trigger_2', label: 'Main Trigger Stage 2', type: 'button', x: 2, y: 57, w: 10, h: 4 },

      // ============ C1 - THUMB HAT (5-way) ============
      { id: 'c1_o', label: 'C1 Thumb Hat Press (O)', type: 'button', x: 2, y: 64, w: 8, h: 4 },
      { id: 'c1_up', label: 'C1 Thumb Hat Up (^)', type: 'button', x: 2, y: 69, w: 8, h: 4 },
      { id: 'c1_down', label: 'C1 Thumb Hat Down (v)', type: 'button', x: 2, y: 74, w: 8, h: 4 },
      { id: 'c1_left', label: 'C1 Thumb Hat Left (<)', type: 'button', x: 2, y: 79, w: 8, h: 4 },
      { id: 'c1_right', label: 'C1 Thumb Hat Right (>)', type: 'button', x: 2, y: 84, w: 8, h: 4 },

      // ============ D1 - PINKY BUTTON ============
      { id: 'd1_pinky', label: 'D1 Pinky Button', type: 'button', x: 2, y: 91, w: 10, h: 5 },

      // ============ B1 - SIDE BUTTON ============
      { id: 'b1_side', label: 'B1 Side Button', type: 'button', x: 55, y: 5, w: 10, h: 5 },

      // ============ A4 - TOP RIGHT HAT (5-way) ============
      { id: 'a4_o', label: 'A4 Top Right Hat Press (O)', type: 'button', x: 55, y: 14, w: 8, h: 4 },
      { id: 'a4_up', label: 'A4 Top Right Hat Up (^)', type: 'button', x: 55, y: 19, w: 8, h: 4 },
      { id: 'a4_down', label: 'A4 Top Right Hat Down (v)', type: 'button', x: 55, y: 24, w: 8, h: 4 },
      { id: 'a4_left', label: 'A4 Top Right Hat Left (<)', type: 'button', x: 55, y: 29, w: 8, h: 4 },
      { id: 'a4_right', label: 'A4 Top Right Hat Right (>)', type: 'button', x: 55, y: 34, w: 8, h: 4 },

      // ============ A3 - CENTER HAT (5-way) ============
      { id: 'a3_o', label: 'A3 Center Hat Press (O)', type: 'button', x: 55, y: 42, w: 8, h: 4 },
      { id: 'a3_up', label: 'A3 Center Hat Up (^)', type: 'button', x: 55, y: 47, w: 8, h: 4 },
      { id: 'a3_down', label: 'A3 Center Hat Down (v)', type: 'button', x: 55, y: 52, w: 8, h: 4 },
      { id: 'a3_left', label: 'A3 Center Hat Left (<)', type: 'button', x: 55, y: 57, w: 8, h: 4 },
      { id: 'a3_right', label: 'A3 Center Hat Right (>)', type: 'button', x: 55, y: 62, w: 8, h: 4 },

      // ============ AXES ============
      { id: 'stick_x', label: 'Stick X Axis', type: 'axis', x: 5, y: 75, w: 12, h: 4 },
      { id: 'stick_y', label: 'Stick Y Axis', type: 'axis', x: 18, y: 75, w: 12, h: 4 },
      { id: 'stick_twist', label: 'Stick Twist Axis', type: 'axis', x: 31, y: 75, w: 12, h: 4 },
      { id: 'throttle', label: 'Throttle Axis', type: 'axis', x: 44, y: 75, w: 12, h: 4 },

      // ============ A1 MINISTICK ANALOG AXES ============
      { id: 'a1_x', label: 'A1 Ministick X Axis (Analog)', type: 'axis', x: 55, y: 75, w: 12, h: 4 },
      { id: 'a1_y', label: 'A1 Ministick Y Axis (Analog)', type: 'axis', x: 68, y: 75, w: 12, h: 4 },
    ]
  },

  't16000m-duo': {
    name: 'T.16000M FCS Space Sim Duo',
    image: 'controllers/t16000m-duo.png',
    description: 'Thrustmaster T.16000M dual stick HOSAS setup',
    controls: [
      // ============ LEFT STICK ============
      // POV Hat (H1)
      { id: 'left_h1_up', label: 'H1 (POV Hat Up)', type: 'button', stick: 'left', x: 1, y: 5, w: 10, h: 4 },
      { id: 'left_h1_right', label: 'H1R (POV Hat Right)', type: 'button', stick: 'left', x: 1, y: 10, w: 10, h: 4 },
      { id: 'left_h1_down', label: 'H1D (POV Hat Down)', type: 'button', stick: 'left', x: 1, y: 15, w: 10, h: 4 },
      { id: 'left_h1_left', label: 'H1L (POV Hat Left)', type: 'button', stick: 'left', x: 1, y: 20, w: 10, h: 4 },

      // Top buttons
      { id: 'left_ts1', label: 'TS1 (Trigger)', type: 'button', stick: 'left', x: 12, y: 8, w: 8, h: 4 },
      { id: 'left_ts3', label: 'TS3', type: 'button', stick: 'left', x: 1, y: 32, w: 8, h: 4 },

      // Base buttons (B11-B16)
      { id: 'left_b11', label: 'B11', type: 'button', stick: 'left', x: 1, y: 40, w: 8, h: 4 },
      { id: 'left_b12', label: 'B12', type: 'button', stick: 'left', x: 1, y: 45, w: 8, h: 4 },
      { id: 'left_b13', label: 'B13', type: 'button', stick: 'left', x: 1, y: 50, w: 8, h: 4 },
      { id: 'left_b14', label: 'B14', type: 'button', stick: 'left', x: 1, y: 55, w: 8, h: 4 },
      { id: 'left_b15', label: 'B15', type: 'button', stick: 'left', x: 1, y: 60, w: 8, h: 4 },
      { id: 'left_b16', label: 'B16', type: 'button', stick: 'left', x: 1, y: 65, w: 8, h: 4 },

      // Center base buttons (B5-B10)
      { id: 'left_b5', label: 'B5', type: 'button', stick: 'left', x: 32, y: 32, w: 8, h: 4 },
      { id: 'left_b6', label: 'B6', type: 'button', stick: 'left', x: 32, y: 37, w: 8, h: 4 },
      { id: 'left_b7', label: 'B7', type: 'button', stick: 'left', x: 32, y: 42, w: 8, h: 4 },
      { id: 'left_b8', label: 'B8', type: 'button', stick: 'left', x: 32, y: 47, w: 8, h: 4 },
      { id: 'left_b9', label: 'B9', type: 'button', stick: 'left', x: 32, y: 52, w: 8, h: 4 },
      { id: 'left_b10', label: 'B10', type: 'button', stick: 'left', x: 32, y: 57, w: 8, h: 4 },

      // TS4 button
      { id: 'left_ts4', label: 'TS4', type: 'button', stick: 'left', x: 32, y: 27, w: 8, h: 4 },

      // Axes
      { id: 'left_joy_x', label: 'JOYX (Stick X)', type: 'axis', stick: 'left', x: 1, y: 72, w: 10, h: 4 },
      { id: 'left_joy_y', label: 'JOYY (Stick Y)', type: 'axis', stick: 'left', x: 32, y: 26, w: 10, h: 4 },
      { id: 'left_rudder', label: 'RUDDER (Twist)', type: 'axis', stick: 'left', x: 14, y: 72, w: 10, h: 4 },
      { id: 'left_ts2', label: 'TS2 (Throttle)', type: 'axis', stick: 'left', x: 27, y: 72, w: 10, h: 4 },

      // ============ RIGHT STICK ============
      // POV Hat (H1)
      { id: 'right_h1_up', label: 'H1 (POV Hat Up)', type: 'button', stick: 'right', x: 89, y: 5, w: 10, h: 4 },
      { id: 'right_h1_right', label: 'H1R (POV Hat Right)', type: 'button', stick: 'right', x: 89, y: 10, w: 10, h: 4 },
      { id: 'right_h1_down', label: 'H1D (POV Hat Down)', type: 'button', stick: 'right', x: 89, y: 15, w: 10, h: 4 },
      { id: 'right_h1_left', label: 'H1L (POV Hat Left)', type: 'button', stick: 'right', x: 89, y: 20, w: 10, h: 4 },

      // Top buttons
      { id: 'right_ts1', label: 'TS1 (Trigger)', type: 'button', stick: 'right', x: 80, y: 8, w: 8, h: 4 },
      { id: 'right_ts3', label: 'TS3', type: 'button', stick: 'right', x: 55, y: 32, w: 8, h: 4 },

      // Base buttons (B11-B16) - right side
      { id: 'right_b11', label: 'B11', type: 'button', stick: 'right', x: 89, y: 40, w: 8, h: 4 },
      { id: 'right_b12', label: 'B12', type: 'button', stick: 'right', x: 89, y: 45, w: 8, h: 4 },
      { id: 'right_b13', label: 'B13', type: 'button', stick: 'right', x: 89, y: 50, w: 8, h: 4 },
      { id: 'right_b14', label: 'B14', type: 'button', stick: 'right', x: 89, y: 55, w: 8, h: 4 },
      { id: 'right_b15', label: 'B15', type: 'button', stick: 'right', x: 89, y: 60, w: 8, h: 4 },
      { id: 'right_b16', label: 'B16', type: 'button', stick: 'right', x: 89, y: 65, w: 8, h: 4 },

      // Center base buttons (B5-B10) - right stick
      { id: 'right_b5', label: 'B5', type: 'button', stick: 'right', x: 55, y: 32, w: 8, h: 4 },
      { id: 'right_b6', label: 'B6', type: 'button', stick: 'right', x: 55, y: 37, w: 8, h: 4 },
      { id: 'right_b7', label: 'B7', type: 'button', stick: 'right', x: 55, y: 42, w: 8, h: 4 },
      { id: 'right_b8', label: 'B8', type: 'button', stick: 'right', x: 55, y: 47, w: 8, h: 4 },
      { id: 'right_b9', label: 'B9', type: 'button', stick: 'right', x: 55, y: 52, w: 8, h: 4 },
      { id: 'right_b10', label: 'B10', type: 'button', stick: 'right', x: 55, y: 57, w: 8, h: 4 },

      // TS4 button
      { id: 'right_ts4', label: 'TS4', type: 'button', stick: 'right', x: 55, y: 27, w: 8, h: 4 },

      // Axes
      { id: 'right_joy_x', label: 'JOYX (Stick X)', type: 'axis', stick: 'right', x: 89, y: 72, w: 10, h: 4 },
      { id: 'right_joy_y', label: 'JOYY (Stick Y)', type: 'axis', stick: 'right', x: 55, y: 26, w: 10, h: 4 },
      { id: 'right_rudder', label: 'RUDDER (Twist)', type: 'axis', stick: 'right', x: 76, y: 72, w: 10, h: 4 },
      { id: 'right_ts2', label: 'TS2 (Throttle)', type: 'axis', stick: 'right', x: 63, y: 72, w: 10, h: 4 },
    ]
  }
};

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONTROLLER_DEFINITIONS;
}
