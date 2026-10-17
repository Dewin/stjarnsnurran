// app.js - Rupert Star Spinner Master Application
// Features: Modes (Colors, Dice 1-6, Animals), Player Turn Tracking,
// Shake to Roll, Custom Voice Recording Studio, Disco Jackpot, Confetti Particles

const GAME_MODES = {
  colors: {
    id: 'colors',
    name: 'Färger',
    items: [
      {
        index: 0,
        name: 'Regnbågsstjärna!',
        speech: 'Regnbågsstjärna!',
        sub: 'Alla färgers stjärna!',
        color: '#E040FB',
        badgeGradient: 'linear-gradient(135deg, #BA68C8, #FFEA00, #00B0FF, #FF6D00, #00E676)',
        textColor: '#FF4081',
        audioKey: 'color_0'
      },
      {
        index: 1,
        name: 'Gul stjärna!',
        speech: 'Gul stjärna!',
        sub: 'Solig och varm som honung!',
        color: '#FFEA00',
        badgeGradient: '#FFEA00',
        textColor: '#FFD600',
        audioKey: 'color_1'
      },
      {
        index: 2,
        name: 'Blå stjärna!',
        speech: 'Blå stjärna!',
        sub: 'Djupblå som stjärnhimlen!',
        color: '#00B0FF',
        badgeGradient: '#00B0FF',
        textColor: '#40C4FF',
        audioKey: 'color_2'
      },
      {
        index: 3,
        name: 'Orange stjärna!',
        speech: 'Orange stjärna!',
        sub: 'Pigg och glad som en apelsin!',
        color: '#FF6D00',
        badgeGradient: '#FF6D00',
        textColor: '#FF9E80',
        audioKey: 'color_3'
      },
      {
        index: 4,
        name: 'Grön stjärna!',
        speech: 'Grön stjärna!',
        sub: 'Skön som sommargräset!',
        color: '#00E676',
        badgeGradient: '#00E676',
        textColor: '#69F0AE',
        audioKey: 'color_4'
      },
      {
        index: 5,
        name: 'Lila stjärna!',
        speech: 'Lila stjärna!',
        sub: 'Kunglig och magisk!',
        color: '#BA68C8',
        badgeGradient: '#BA68C8',
        textColor: '#EA80FC',
        audioKey: 'color_5'
      }
    ]
  },
  dice: {
    id: 'dice',
    name: 'Tärning 1–6',
    items: [
      {
        index: 0,
        name: 'Etta! ⚀',
        speech: 'Etta!',
        sub: 'Ett steg framåt!',
        color: '#BA68C8',
        badgeGradient: '#BA68C8',
        textColor: '#EA80FC',
        dicePips: 1,
        audioKey: 'dice_1'
      },
      {
        index: 1,
        name: 'Tvåa! ⚁',
        speech: 'Tvåa!',
        sub: 'Två kliv på spelplanen!',
        color: '#FFEA00',
        badgeGradient: '#FFEA00',
        textColor: '#FFD600',
        dicePips: 2,
        audioKey: 'dice_2'
      },
      {
        index: 2,
        name: 'Trea! ⚂',
        speech: 'Trea!',
        sub: 'Tre steg!',
        color: '#00B0FF',
        badgeGradient: '#00B0FF',
        textColor: '#40C4FF',
        dicePips: 3,
        audioKey: 'dice_3'
      },
      {
        index: 3,
        name: 'Fyra! ⚃',
        speech: 'Fyra!',
        sub: 'Fyra steg!',
        color: '#FF6D00',
        badgeGradient: '#FF6D00',
        textColor: '#FF9E80',
        dicePips: 4,
        audioKey: 'dice_4'
      },
      {
        index: 4,
        name: 'Femma! ⚄',
        speech: 'Femma!',
        sub: 'Fem snabba steg!',
        color: '#00E676',
        badgeGradient: '#00E676',
        textColor: '#69F0AE',
        dicePips: 5,
        audioKey: 'dice_5'
      },
      {
        index: 5,
        name: 'Sexa! ⚅',
        speech: 'Sexa!',
        sub: 'Sex steg framåt!',
        color: '#FFD600',
        badgeGradient: '#FFD600',
        textColor: '#FFE082',
        dicePips: 6,
        audioKey: 'dice_6'
      }
    ]
  },
  animals: {
    id: 'animals',
    name: 'Djur',
    items: [
      {
        index: 0,
        name: '🐶 Hund!',
        speech: 'Vovve! Voff voff!',
        sub: 'Människans bästa vän!',
        color: '#FFD54F',
        badgeGradient: '#FFD54F',
        textColor: '#FFE082',
        emoji: '🐶',
        animalType: 'dog',
        audioKey: 'animal_0'
      },
      {
        index: 1,
        name: '🐱 Katt!',
        speech: 'Katt! Mjau mjau!',
        sub: 'Smyger mjukt på tassar!',
        color: '#FF8A65',
        badgeGradient: '#FF8A65',
        textColor: '#FFAB91',
        emoji: '🐱',
        animalType: 'cat',
        audioKey: 'animal_1'
      },
      {
        index: 2,
        name: '🐮 Ko!',
        speech: 'Ko! Muuu!',
        sub: 'Gillar saftigt sommargräs!',
        color: '#81C784',
        badgeGradient: '#81C784',
        textColor: '#A5D6A7',
        emoji: '🐮',
        animalType: 'cow',
        audioKey: 'animal_2'
      },
      {
        index: 3,
        name: '🦁 Lejon!',
        speech: 'Lejon! Rrroooaaar!',
        sub: 'Djurens konung på savannen!',
        color: '#FFA726',
        badgeGradient: '#FFA726',
        textColor: '#FFCC80',
        emoji: '🦁',
        animalType: 'lion',
        audioKey: 'animal_3'
      },
      {
        index: 4,
        name: '🐸 Groda!',
        speech: 'Groda! Kvack kvack!',
        sub: 'Hoppar högt i näckrosdammen!',
        color: '#4CAF50',
        badgeGradient: '#4CAF50',
        textColor: '#81C784',
        emoji: '🐸',
        animalType: 'frog',
        audioKey: 'animal_4'
      },
      {
        index: 5,
        name: '🐵 Apa!',
        speech: 'Apa! Ooh ooh aah aah!',
        sub: 'Klättrar och äter bananer!',
        color: '#BA68C8',
        badgeGradient: '#BA68C8',
        textColor: '#CE93D8',
        emoji: '🐵',
        animalType: 'monkey',
        audioKey: 'animal_5'
      }
    ]
  }
};

const EMOJI_CATEGORIES = [
  {
    id: 'all',
    name: '🌟 Alla',
    emojis: []
  },
  {
    id: 'people',
    name: '👦 Figurer',
    emojis: [
      '👦', '👧', '👶', '👩', '👨', '👵', '👴', '👱‍♀️', '👱‍♂️', '🧒',
      '🦸', '🦸‍♀️', '🦹', '🧙', '🧙‍♀️', '🧚', '👸', '🤴', '👑',
      '🤖', '👽', '👻', '🤠', '🥷', '🧑‍🚀', '🧑‍🚒', '👮', '🧑‍🎨'
    ]
  },
  {
    id: 'animals',
    name: '🐶 Djur',
    emojis: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
      '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🦆', '🦉', '🐴',
      '🦄', '🐝', '🐛', '🦋', '🐞', '🐢', '🦖', '🦕', '🐙', '🐬',
      '🐳', '🦈', '🦀', '🦥', '🦘', '🦔', '🐘', '🦒'
    ]
  },
  {
    id: 'vehicles',
    name: '🚀 Fordon',
    emojis: [
      '🚗', '🚙', '🏎️', '🚓', '🚑', '🚒', '🚜', '🚂', '✈️', '🚀',
      '🛸', '🚁', '⛵', '🚢', '🚲', '🛹', '🛴', '🏍️'
    ]
  },
  {
    id: 'fun',
    name: '🎮 Skoj & Sport',
    emojis: [
      '🎮', '🎲', '🧩', '🎈', '🎪', '🎠', '🎨', '🎸', '🥁', '🎤',
      '⚽', '🏀', '🏈', '⚾', '🎾', '🎳', '🏆', '🥇', '⭐', '🌈',
      '☀️', '🌙', '⚡', '❄️', '🔥', '💎', '💖'
    ]
  },
  {
    id: 'food',
    name: '🍦 Godsaker',
    emojis: [
      '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🧁', '🍫', '🍿', '🍭',
      '🍬', '🍕', '🍔', '🍟', '🍓', '🍉', '🍌', '🍎', '🍇', '🍒'
    ]
  }
];

const ALL_AVATAR_EMOJIS = [];
EMOJI_CATEGORIES.forEach((cat) => {
  if (cat.id !== 'all') {
    cat.emojis.forEach((em) => {
      if (!ALL_AVATAR_EMOJIS.includes(em)) ALL_AVATAR_EMOJIS.push(em);
    });
  }
});
EMOJI_CATEGORIES[0].emojis = ALL_AVATAR_EMOJIS;
const AVATAR_EMOJIS = ALL_AVATAR_EMOJIS;

class StarSpinner {
  constructor() {
    this.isSpinning = false;
    this.currentLedIndex = -1;
    this.activeMode = 'colors';
    this.history = [];
    this.deferredPrompt = null;

    // Player mode state
    this.playerModeEnabled = false;
    this.players = [
      { id: 1, name: 'Ian', avatar: '👦', color: '#FFD600', history: [] },
      { id: 2, name: 'Mamma', avatar: '👩', color: '#FF4081', history: [] },
      { id: 3, name: 'Pappa', avatar: '👨', color: '#00B0FF', history: [] }
    ];
    this.currentPlayerIdx = 0;
    this.selectedNewPlayerAvatar = '👦';
    this.editingPlayerIndex = null;

    // Shake sensor state
    this.shakeEnabled = true;
    this.lastShakeTime = 0;

    // DOM Elements
    this.toyContainer = document.getElementById('toy-container');
    this.centerButton = document.getElementById('center-button');
    this.quickSpinBtn = document.getElementById('btn-spin-quick');
    this.resultCard = document.getElementById('result-card');
    this.resultBadge = document.getElementById('result-badge');
    this.resultTitle = document.getElementById('result-title');
    this.resultSub = document.getElementById('result-sub');
    this.historyItems = document.getElementById('history-items');

    // Controls
    this.btnTogglePlayers = document.getElementById('btn-toggle-players');
    this.btnVoiceStudio = document.getElementById('btn-voice-studio');
    this.btnShake = document.getElementById('btn-shake');
    this.btnSound = document.getElementById('btn-sound');
    this.btnForceRefresh = document.getElementById('btn-force-refresh');
    this.btnFullscreen = document.getElementById('btn-fullscreen');
    this.btnQr = document.getElementById('btn-qr');

    // Player UI
    this.playerBanner = document.getElementById('player-banner');
    this.currentPlayerAvatar = document.getElementById('current-player-avatar');
    this.currentPlayerText = document.getElementById('current-player-text');
    this.btnOpenPlayerSettings = document.getElementById('btn-open-player-settings');

    // Modals
    this.modalVoice = document.getElementById('modal-voice');
    this.btnCloseVoice = document.getElementById('btn-close-voice');
    this.voiceItemsContainer = document.getElementById('voice-items-container');
    this.voicePlayersContainer = document.getElementById('voice-players-container');
    this.voiceModeHeader = document.getElementById('voice-mode-header');
    this.currentRecorder = null;

    this.modalPlayers = document.getElementById('modal-players');
    this.btnClosePlayers = document.getElementById('btn-close-players');
    this.playerListContainer = document.getElementById('player-list-container');
    this.inputNewPlayer = document.getElementById('input-new-player');
    this.btnAddPlayer = document.getElementById('btn-add-player');
    this.btnSelectNewAvatar = document.getElementById('btn-select-new-avatar');
    this.newPlayerAvatarPreview = document.getElementById('new-player-avatar-preview');
    this.btnShufflePlayers = document.getElementById('btn-shuffle-players');
    this.btnResetHistory = document.getElementById('btn-reset-history');
    this.btnStartPlayerMode = document.getElementById('btn-start-player-mode');
    this.btnStopPlayerMode = document.getElementById('btn-stop-player-mode');
    this.btnModalRefresh = document.getElementById('btn-modal-refresh');

    this.modalEmojiPicker = document.getElementById('modal-emoji-picker');
    this.btnCloseEmoji = document.getElementById('btn-close-emoji');
    this.emojiCategoryPills = document.getElementById('emoji-category-pills');
    this.emojiGrid = document.getElementById('emoji-grid');
    this.emojiPickerSubtitle = document.getElementById('emoji-picker-subtitle');
    this.activeEmojiCategory = 'all';

    this.qrModal = document.getElementById('qr-modal');
    this.btnCloseQr = document.getElementById('btn-close-qr');

    // Ian Avatar elements in SVG
    this.ianAvatar = document.getElementById('ian-avatar');
    this.ianColorOverlay = document.getElementById('ian-color-overlay');
    this.ianAura = document.getElementById('ian-aura');
    this.ianRing = document.getElementById('ian-ring');

    // Cache slot elements (representing the 6 positions)
    this.starElements = [];
    for (let i = 0; i < 6; i++) {
      this.starElements[i] = document.getElementById(`star-${i}`);
    }

    this.initEvents();
    this.loadState();
    this.updateMode(this.activeMode);
    this.updatePlayerBanner();
    this.renderHistory();
  }

  get currentItems() {
    return GAME_MODES[this.activeMode].items;
  }

  initEvents() {
    // Spin trigger on center button (Ian) and Quick Spin Button
    const handleSpin = (e) => {
      if (e) {
        try { e.preventDefault(); } catch (err) {}
      }
      if (this.centerButton) this.centerButton.blur();
      if (this.quickSpinBtn) this.quickSpinBtn.blur();
      if (this.isSpinning) return;
      this.spin();
    };

    // Robust pointer handling for center button: handles desktop mouse clicks and fast mobile taps seamlessly
    let centerPointerActive = false;
    let centerPointerStartX = 0;
    let centerPointerStartY = 0;

    this.centerButton.addEventListener('pointerdown', (e) => {
      if (this.isSpinning) return;
      centerPointerActive = true;
      centerPointerStartX = e.clientX;
      centerPointerStartY = e.clientY;
      this.centerButton.classList.add('pressed');
      if (this.centerButton) this.centerButton.blur();
    });

    this.centerButton.addEventListener('pointerup', (e) => {
      if (!centerPointerActive) return;
      centerPointerActive = false;
      this.centerButton.classList.remove('pressed');
      if (this.centerButton) this.centerButton.blur();

      const dist = Math.hypot(e.clientX - centerPointerStartX, e.clientY - centerPointerStartY);
      if (dist < 25 && !this.isSpinning) {
        handleSpin(e);
      }
    });

    const releaseButton = () => {
      centerPointerActive = false;
      this.centerButton.classList.remove('pressed');
      if (this.centerButton) this.centerButton.blur();
    };

    this.centerButton.addEventListener('pointercancel', releaseButton);
    this.centerButton.addEventListener('pointerleave', releaseButton);
    this.centerButton.addEventListener('click', handleSpin);
    this.centerButton.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') handleSpin(e);
    });

    // Quick spin button
    this.quickSpinBtn.addEventListener('click', handleSpin);

    // Mode Selector Pills
    document.querySelectorAll('.mode-pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        this.setMode(mode);
      });
    });

    // Sound toggle
    this.btnSound.addEventListener('click', () => {
      const active = this.btnSound.classList.toggle('active');
      this.btnSound.textContent = active ? '🔊' : '🔇';
      if (window.soundFX) window.soundFX.setSoundEnabled(active);
    });

    // Refresh / Cache clearing buttons
    if (this.btnForceRefresh) {
      this.btnForceRefresh.addEventListener('click', () => this.forceRefreshApp());
    }
    if (this.btnModalRefresh) {
      this.btnModalRefresh.addEventListener('click', () => this.forceRefreshApp());
    }

    // Shake sensor toggle
    this.btnShake.addEventListener('click', () => {
      this.shakeEnabled = !this.shakeEnabled;
      this.btnShake.classList.toggle('active', this.shakeEnabled);
      this.btnShake.textContent = this.shakeEnabled ? '📳' : '📴';
    });

    // Device motion for Shake to Roll
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', (e) => this.handleDeviceMotion(e));
    }

    // Player mode: opening the modal lets the user choose order, shuffle, or start
    this.btnTogglePlayers.addEventListener('click', () => {
      this.openPlayerModal();
    });

    this.btnOpenPlayerSettings.addEventListener('click', () => this.openPlayerModal());
    this.btnClosePlayers.addEventListener('click', () => this.closePlayerModal());
    this.modalPlayers.addEventListener('click', (e) => {
      if (e.target === this.modalPlayers) this.closePlayerModal();
    });

    if (this.btnShufflePlayers) {
      this.btnShufflePlayers.addEventListener('click', () => this.shufflePlayers());
    }

    if (this.btnResetHistory) {
      this.btnResetHistory.addEventListener('click', () => {
        if (confirm('Vill du nollställa alla spelares historik för en ny spelomgång?')) {
          this.resetHistory();
        }
      });
    }

    if (this.btnStartPlayerMode) {
      this.btnStartPlayerMode.addEventListener('click', () => this.startPlayerMode());
    }

    if (this.btnStopPlayerMode) {
      this.btnStopPlayerMode.addEventListener('click', () => this.stopPlayerMode());
    }

    this.btnAddPlayer.addEventListener('click', () => this.addNewPlayer());
    this.inputNewPlayer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.addNewPlayer();
    });
    this.inputNewPlayer.addEventListener('focus', () => {
      setTimeout(() => {
        this.inputNewPlayer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 250);
    });

    if (this.btnSelectNewAvatar) {
      this.btnSelectNewAvatar.addEventListener('click', () => this.openEmojiPicker(null));
    }

    if (this.btnCloseEmoji) {
      this.btnCloseEmoji.addEventListener('click', () => this.closeEmojiPicker());
    }

    if (this.modalEmojiPicker) {
      this.modalEmojiPicker.addEventListener('click', (e) => {
        if (e.target === this.modalEmojiPicker) this.closeEmojiPicker();
      });
    }

    // Voice studio modal
    this.btnVoiceStudio.addEventListener('click', () => this.openVoiceModal());
    this.btnCloseVoice.addEventListener('click', () => this.closeVoiceModal());
    this.modalVoice.addEventListener('click', (e) => {
      if (e.target === this.modalVoice) this.closeVoiceModal();
    });

    // Fullscreen toggle
    this.btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        this.btnFullscreen.textContent = '✕';
      } else {
        document.exitFullscreen().catch(() => {});
        this.btnFullscreen.textContent = '⛶';
      }
    });

    // QR modal
    this.btnQr.addEventListener('click', () => this.openQrModal());
    this.btnCloseQr.addEventListener('click', () => this.closeQrModal());
    this.qrModal.addEventListener('click', (e) => {
      if (e.target === this.qrModal) this.closeQrModal();
    });

    // PWA Install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      const banner = document.getElementById('install-banner');
      if (banner) banner.style.display = 'flex';
    });

    const doInstall = document.getElementById('btn-do-install');
    if (doInstall) {
      doInstall.addEventListener('click', async () => {
        if (!this.deferredPrompt) return;
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          const banner = document.getElementById('install-banner');
          if (banner) banner.style.display = 'none';
        }
        this.deferredPrompt = null;
      });
    }

    // Spacebar to spin
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON' && !this.isSpinning) {
        e.preventDefault();
        this.spin();
      }
    });
  }

  // Handle physical phone shake
  handleDeviceMotion(e) {
    if (!this.shakeEnabled || this.isSpinning) return;
    const acc = e.accelerationIncludingGravity || e.acceleration;
    if (!acc) return;

    const total = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
    const delta = Math.abs(total - 9.8);

    const now = Date.now();
    if (delta > 14 && now - this.lastShakeTime > 1400) {
      this.lastShakeTime = now;
      if (window.soundFX) window.soundFX.playShakeRattle();
      this.vibrate([20, 40, 30]);
      setTimeout(() => this.spin(), 200);
    }
  }

  setMode(modeId) {
    if (!GAME_MODES[modeId] || this.isSpinning) return;
    this.updateMode(modeId);
    this.saveState();
  }

  updateMode(modeId) {
    if (!GAME_MODES[modeId]) return;
    this.activeMode = modeId;

    // 1. Sync navigation mode pills
    document.querySelectorAll('.mode-pill').forEach((pill) => {
      pill.classList.toggle('active', pill.dataset.mode === modeId);
    });

    // 2. Toggle SVG slot graphics for each star position
    for (let i = 0; i < 6; i++) {
      const star = this.starElements[i];
      if (star) {
        const colEl = star.querySelector('.slot-mode-colors');
        const diceEl = star.querySelector('.slot-mode-dice');
        const animEl = star.querySelector('.slot-mode-animals');
        if (colEl) colEl.style.display = modeId === 'colors' ? 'block' : 'none';
        if (diceEl) diceEl.style.display = modeId === 'dice' ? 'block' : 'none';
        if (animEl) animEl.style.display = modeId === 'animals' ? 'block' : 'none';
      }
    }

    // 3. Refresh LED state for newly active mode
    this.clearAllLeds();
    if (this.currentLedIndex >= 0) {
      this.setLed(this.currentLedIndex, true);
    }

    // 4. Update Result Card initial badge & text for mode (if not currently spinning)
    if (!this.isSpinning) {
      if (modeId === 'dice') {
        this.resultBadge.textContent = '🎲';
        this.resultSub.textContent = 'Vilken siffra slår du?';
      } else if (modeId === 'animals') {
        this.resultBadge.textContent = '🦁';
        this.resultSub.textContent = 'Vilket djur får du?';
      } else {
        this.resultBadge.textContent = '⭐';
        this.resultSub.textContent = 'Vilken stjärnfärg blir det?';
      }
      this.resultBadge.style.background = '#333344';
      this.resultBadge.classList.remove('active-badge');

      if (this.playerModeEnabled && this.players.length > 0) {
        const player = this.players[this.currentPlayerIdx];
        this.resultTitle.textContent = `${player.avatar} ${player.name}s tur!`;
      } else {
        this.resultTitle.textContent = 'Tryck på Ian för att snurra!';
      }
    }
  }

  setLed(index, isLit) {
    if (index >= 0 && index < 6) {
      const star = this.starElements[index];
      if (!star) return;
      const activeGroup = star.querySelector(`.slot-mode-${this.activeMode}`);
      if (activeGroup) {
        const ledLayer = activeGroup.querySelector('.led-active-layer');
        if (ledLayer) {
          ledLayer.style.display = isLit ? 'block' : 'none';
          if (!isLit) ledLayer.classList.remove('pulsing');
        }
      }
      if (isLit) {
        star.classList.add('lit');
      } else {
        star.classList.remove('lit', 'winner');
      }
    }
  }

  clearAllLeds() {
    for (let i = 0; i < 6; i++) {
      this.setLed(i, false);
      const star = this.starElements[i];
      if (star) {
        star.querySelectorAll('.led-active-layer').forEach((layer) => {
          layer.style.display = 'none';
          layer.classList.remove('pulsing');
        });
        star.classList.remove('lit', 'winner');
      }
    }
  }

  async spin() {
    if (this.isSpinning) return;
    this.isSpinning = true;

    // Unlock Web Audio & Play the "Click on Ian" sound (custom recorded voice or tactile click)
    // Always plays whenever a spin starts, regardless of trigger (center button, quick button, shake, spacebar)
    if (window.soundFX) {
      window.soundFX.init();
      window.soundFX.playButtonPress();
    }

    // Reset visual states & drop focus outlines
    if (this.centerButton) this.centerButton.blur();
    this.centerButton.classList.add('disabled');
    this.quickSpinBtn.disabled = true;
    this.toyContainer.classList.add('spinning');
    this.clearAllLeds();

    if (this.ianAvatar) {
      this.ianAvatar.classList.remove('flashing-win');
      if (this.ianColorOverlay) this.ianColorOverlay.style.opacity = '0';
      if (this.ianAura) this.ianAura.style.opacity = '0';
    }

    this.vibrate(25);

    // Pick random winner
    const items = this.currentItems;
    const winningIndex = Math.floor(Math.random() * 6);
    const winnerData = items[winningIndex];

    let currentPos = this.currentLedIndex >= 0 ? this.currentLedIndex : Math.floor(Math.random() * 6);
    
    // Slumpmässig variation i snurrtid & karaktär (2 till 6 varv):
    // Från snabba kvicka snurr (~2s) till långa spännande rysare (~6s)
    const fullLaps = 2 + Math.floor(Math.random() * 5); // 2, 3, 4, 5 eller 6 varv
    const delta = (winningIndex - currentPos + 6) % 6;
    const totalSteps = fullLaps * 6 + delta + (delta < 2 ? 6 : 0);

    // Slumpmässiga parametrar för inbromsning & fart:
    const baseDelay = 36 + Math.floor(Math.random() * 16); // 36ms - 51ms initial fart
    const finalCrawlDelay = 600 + Math.floor(Math.random() * 380); // 600ms - 980ms sista krypfart
    const decelThreshold = 0.40 + Math.random() * 0.18; // Var avmattningen startar (40% - 58%)
    const decelPower = 2.2 + Math.random() * 0.7; // Hur brant inbromsningskurvan är

    // Status banner
    this.resultBadge.textContent = '⏳';
    this.resultBadge.style.background = '#333344';
    this.resultBadge.classList.remove('active-badge');
    this.resultTitle.textContent = fullLaps >= 5 ? 'Långsnurr! Spännande...' : 'Snurrar runt...';
    this.resultTitle.style.color = '#FFFFFF';
    this.resultSub.textContent = this.playerModeEnabled
      ? `${this.players[this.currentPlayerIdx].name} snurrar...`
      : 'Vem vinner?';

    // Step animation loop with exponential deceleration
    let step = 0;
    while (step < totalSteps) {
      const progress = step / totalSteps;
      let delay = baseDelay;

      if (progress > decelThreshold) {
        const slowFactor = (progress - decelThreshold) / (1 - decelThreshold);
        delay = baseDelay + Math.pow(slowFactor, decelPower) * finalCrawlDelay;
      }

      const prevPos = currentPos;
      currentPos = (currentPos + 1) % 6;

      this.setLed(prevPos, false);
      this.setLed(currentPos, true);

      if (window.soundFX) {
        window.soundFX.playBlip(step, totalSteps, delay);
      }
      this.vibrate(12);

      await new Promise((r) => setTimeout(r, delay));
      step++;
    }

    // Landed on winner!
    this.currentLedIndex = winningIndex;

    this.toyContainer.classList.remove('spinning');
    this.starElements[winningIndex].classList.add('winner');

    // Ensure strictly only the winning LED is lit
    for (let i = 0; i < 6; i++) {
      this.setLed(i, i === winningIndex);
    }
    const activeGroup = this.starElements[winningIndex].querySelector(`.slot-mode-${this.activeMode}`);
    if (activeGroup) {
      const activeLed = activeGroup.querySelector('.led-active-layer');
      if (activeLed) activeLed.classList.add('pulsing');
    }

    // Trigger Ian's face flash in winner color
    if (this.ianAvatar) {
      const flashColor = winnerData.color;
      if (this.ianColorOverlay) {
        this.ianColorOverlay.setAttribute('fill', flashColor);
      }
      if (this.ianAura) {
        this.ianAura.setAttribute('fill', flashColor);
      }
      if (this.ianRing) {
        this.ianRing.setAttribute('stroke', winnerData.textColor || flashColor);
      }
      this.ianAvatar.classList.remove('flashing-win');
      void this.ianAvatar.offsetWidth;
      this.ianAvatar.classList.add('flashing-win');
    }

    // Confetti burst!
    if (window.confetti) {
      window.confetti.burst({
        count: 45,
        colors: [winnerData.color || '#FFE082', '#FFFFFF', '#FFE082']
      });
    }

    // Play victory sound & announcement
    if (window.soundFX) {
      window.soundFX.playWin(winningIndex);
      setTimeout(() => {
        window.soundFX.speakResult(winnerData.audioKey, winnerData.speech, winnerData.animalType);
      }, 550);
    }

    this.vibrate([35, 60, 35, 60, 140]);

    // Update Result Card
    const currentPlayer = this.playerModeEnabled ? this.players[this.currentPlayerIdx] : null;
    this.resultBadge.textContent = this.getOutcomeSymbol(winnerData, true);
    this.resultBadge.style.background = winnerData.badgeGradient;
    this.resultBadge.classList.add('active-badge');

    if (currentPlayer) {
      this.resultTitle.textContent = `${currentPlayer.avatar} ${currentPlayer.name}: ${winnerData.name}`;
      this.resultSub.textContent = winnerData.sub;
    } else {
      this.resultTitle.textContent = winnerData.name;
      this.resultSub.textContent = winnerData.sub;
    }
    this.resultTitle.style.color = winnerData.textColor;

    this.addToHistory(winnerData, currentPlayer);

    // If player mode is active, advance to next player after 2.5s
    if (this.playerModeEnabled) {
      setTimeout(() => {
        this.advancePlayer();
      }, 2600);
    }

    // Re-enable
    this.centerButton.classList.remove('disabled');
    this.quickSpinBtn.disabled = false;
    this.isSpinning = false;
  }

  // Player Management
  updatePlayerBanner() {
    if (!this.playerModeEnabled) {
      this.playerBanner.style.display = 'none';
      return;
    }
    this.playerBanner.style.display = 'flex';
    const player = this.players[this.currentPlayerIdx];
    if (!player) return;
    this.currentPlayerAvatar.textContent = player.avatar;

    const lastRoll = (player.history && player.history.length > 0) ? player.history[0] : null;
    if (lastRoll) {
      this.currentPlayerText.innerHTML = `${player.name}s tur att snurra! <span class="player-turn-last-roll" title="${player.name}s förra resultat">(Senast: ${lastRoll.name})</span>`;
    } else {
      this.currentPlayerText.textContent = `${player.name}s tur att snurra!`;
    }
    this.playerBanner.style.setProperty('--player-color', player.color);
    this.renderHistory();
  }

  advancePlayer() {
    this.currentPlayerIdx = (this.currentPlayerIdx + 1) % this.players.length;
    this.updatePlayerBanner();
    this.speakCurrentPlayerTurn();
  }

  speakCurrentPlayerTurn() {
    if (!this.playerModeEnabled || !this.players || this.players.length === 0) return;
    const player = this.players[this.currentPlayerIdx];
    if (player && window.soundFX) {
      window.soundFX.speakPlayerTurn(player);
    }
  }

  openPlayerModal() {
    if (this.btnStartPlayerMode) {
      this.btnStartPlayerMode.textContent = this.playerModeEnabled ? '✅ Klar / Spara ordning' : '🚀 Starta spelarläge!';
    }
    if (this.btnStopPlayerMode) {
      this.btnStopPlayerMode.style.display = this.playerModeEnabled ? 'block' : 'none';
    }
    this.renderPlayerList();
    this.modalPlayers.classList.add('open');
  }

  closePlayerModal() {
    this.modalPlayers.classList.remove('open');
  }

  startPlayerMode() {
    if (this.players.length === 0) {
      alert('Lägg till minst en spelare först!');
      return;
    }
    this.playerModeEnabled = true;
    this.currentPlayerIdx = 0; // Top player in order always starts!
    this.btnTogglePlayers.classList.add('active');
    this.closePlayerModal();
    this.updatePlayerBanner();
    this.saveState();
    this.vibrate([25, 40, 60]);
    if (window.soundFX) window.soundFX.playButtonPress();

    // Congratulatory starting prompt in Result Card
    const starter = this.players[0];
    this.resultTitle.textContent = `${starter.avatar} ${starter.name} börjar!`;
    this.resultSub.textContent = 'Tryck på Ian för att snurra!';
    this.resultBadge.textContent = starter.avatar;
    this.resultBadge.style.background = starter.color;
    this.resultBadge.classList.add('active-badge');

    setTimeout(() => {
      this.speakCurrentPlayerTurn();
    }, 350);
  }

  stopPlayerMode() {
    this.playerModeEnabled = false;
    this.btnTogglePlayers.classList.remove('active');
    this.closePlayerModal();
    this.updatePlayerBanner();
    this.saveState();
    this.resultTitle.textContent = 'Tryck på Ian för att snurra!';
    this.resultSub.textContent = 'Spelarläge avstängt.';
    this.resultBadge.textContent = '⭐';
    this.resultBadge.style.background = '#333344';
    this.resultBadge.classList.remove('active-badge');
  }

  shufflePlayers() {
    if (this.players.length < 2) return;
    // Modern Fisher-Yates shuffle
    for (let i = this.players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
    }
    this.currentPlayerIdx = 0;
    if (window.soundFX) window.soundFX.playShakeRattle();
    this.vibrate([20, 30, 20]);
    this.renderPlayerList();
    this.updatePlayerBanner();
    this.saveState();
  }

  movePlayer(index, direction) {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= this.players.length) return;
    const temp = this.players[index];
    this.players[index] = this.players[targetIdx];
    this.players[targetIdx] = temp;
    this.currentPlayerIdx = 0;
    if (window.soundFX) window.soundFX.playUiClick();
    this.vibrate(15);
    this.renderPlayerList();
    this.updatePlayerBanner();
    this.saveState();
  }

  setStartPlayer(index) {
    if (index <= 0 || index >= this.players.length) return;
    const [starter] = this.players.splice(index, 1);
    this.players.unshift(starter);
    this.currentPlayerIdx = 0;
    if (window.soundFX) window.soundFX.playUiClick();
    this.vibrate(25);
    this.renderPlayerList();
    this.updatePlayerBanner();
    this.saveState();
    if (this.playerModeEnabled) {
      this.speakCurrentPlayerTurn();
    }
  }

  renderPlayerList() {
    this.playerListContainer.innerHTML = '';
    this.players.forEach((p, idx) => {
      const isStarter = idx === 0;
      const key = `player_turn_${p.id}`;
      const hasRec = window.soundFX && window.soundFX.hasCustomRecording(key);
      const row = document.createElement('div');
      row.className = 'player-item' + (isStarter ? ' is-start-player' : '');
      row.innerHTML = `
        <div class="player-order-num" title="Plats ${idx + 1}">${idx + 1}</div>
        <button class="btn-player-avatar" data-idx="${idx}" type="button" title="Klicka för att välja emoji för ${p.name}">
          <span class="player-avatar-icon">${p.avatar}</span>
          <span class="avatar-edit-badge">✏️</span>
        </button>
        <div class="player-details" data-idx="${idx}" title="Klicka för att sätta som startspelare">
          <span class="player-name">${p.name}</span>
          ${p.history && p.history.length > 0 ? `<span class="player-list-last-roll" title="${p.name}s senaste snurr">Senast: ${p.history[0].name}</span>` : ''}
          ${isStarter ? '<span class="tag-start-player">👑 Startar först!</span>' : '<span class="tag-set-starter">Klicka för att starta</span>'}
        </div>
        <div class="player-voice-actions">
          <button class="btn-player-rec ${hasRec ? 'has-recording' : ''}" data-idx="${idx}" type="button" title="${hasRec ? 'Byt inspelad röst för ' + p.name : 'Spela in röst för när det är ' + p.name + 's tur'}">
            ${hasRec ? '🎙️✓' : '🎙️'}
          </button>
          ${hasRec ? `<button class="btn-player-play" data-idx="${idx}" type="button" title="Lyssna på ${p.name}s röst">▶️</button>` : ''}
          ${hasRec ? `<button class="btn-player-del" data-idx="${idx}" type="button" title="Ta bort inspelad röst för ${p.name}">🗑️</button>` : ''}
        </div>
        <div class="player-reorder-btns">
          <button class="btn-move-player" data-idx="${idx}" data-dir="-1" type="button" title="Flytta upp" ${idx === 0 ? 'disabled' : ''}>⬆️</button>
          <button class="btn-move-player" data-idx="${idx}" data-dir="1" type="button" title="Flytta ner" ${idx === this.players.length - 1 ? 'disabled' : ''}>⬇️</button>
          ${this.players.length > 1 ? `<button class="btn-del-player" data-idx="${idx}" type="button" title="Ta bort">❌</button>` : ''}
        </div>
      `;

      // Avatar picker
      const avatarBtn = row.querySelector('.btn-player-avatar');
      if (avatarBtn) {
        avatarBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openEmojiPicker(idx);
        });
      }

      // Tap on player details to set as start player
      const details = row.querySelector('.player-details');
      if (details) {
        details.addEventListener('click', () => {
          if (idx !== 0) this.setStartPlayer(idx);
        });
      }

      // Voice record button
      const voiceRecBtn = row.querySelector('.btn-player-rec');
      if (voiceRecBtn) {
        voiceRecBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          if (this.currentRecorder && this.currentRecorder.state === 'recording') {
            this.currentRecorder.stop();
            return;
          }
          await this.recordVoice(
            key,
            () => {
              voiceRecBtn.classList.add('recording');
              voiceRecBtn.textContent = '⏹️';
              this.vibrate(25);
            },
            (saved) => {
              voiceRecBtn.classList.remove('recording');
              this.renderPlayerList();
              if (this.modalVoice && this.modalVoice.classList.contains('open')) {
                this.renderVoiceItems();
              }
              this.vibrate([20, 30]);
            }
          );
        });
      }

      // Voice play button
      const voicePlayBtn = row.querySelector('.btn-player-play');
      if (voicePlayBtn) {
        voicePlayBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (window.soundFX) window.soundFX.playCustomAudio(key);
        });
      }

      // Voice delete button
      const voiceDelBtn = row.querySelector('.btn-player-del');
      if (voiceDelBtn) {
        voiceDelBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (window.soundFX) window.soundFX.deleteCustomRecording(key);
          this.renderPlayerList();
          if (this.modalVoice && this.modalVoice.classList.contains('open')) {
            this.renderVoiceItems();
          }
          this.vibrate(15);
        });
      }

      // Move up/down buttons
      const moveBtns = row.querySelectorAll('.btn-move-player');
      moveBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const dir = parseInt(btn.dataset.dir, 10);
          this.movePlayer(idx, dir);
        });
      });

      // Delete button
      const delBtn = row.querySelector('.btn-del-player');
      if (delBtn) {
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const [removed] = this.players.splice(idx, 1);
          if (removed && window.soundFX) {
            window.soundFX.deleteCustomRecording(`player_turn_${removed.id}`);
          }
          if (this.currentPlayerIdx >= this.players.length) this.currentPlayerIdx = 0;
          this.renderPlayerList();
          this.updatePlayerBanner();
          this.renderHistory();
          this.saveState();
        });
      }

      this.playerListContainer.appendChild(row);
    });
  }

  addNewPlayer() {
    const name = this.inputNewPlayer.value.trim();
    if (!name) return;
    const colors = ['#FFD600', '#FF4081', '#00B0FF', '#00E676', '#FF6D00', '#AB47BC'];
    const randomColor = colors[this.players.length % colors.length];

    this.players.push({
      id: Date.now(),
      name: name,
      avatar: this.selectedNewPlayerAvatar || '👦',
      color: randomColor,
      history: []
    });

    this.inputNewPlayer.value = '';
    const defaultAvatars = ['👦', '👧', '👩', '👨', '🐶', '🐱', '🦁', '🐻', '⭐'];
    this.selectedNewPlayerAvatar = defaultAvatars[this.players.length % defaultAvatars.length];
    if (this.newPlayerAvatarPreview) {
      this.newPlayerAvatarPreview.textContent = this.selectedNewPlayerAvatar;
    }
    this.renderPlayerList();
    this.updatePlayerBanner();
    this.saveState();
    setTimeout(() => {
      if (this.playerListContainer) {
        this.playerListContainer.scrollTop = this.playerListContainer.scrollHeight;
      }
    }, 60);
  }

  // Emoji Picker for Players
  openEmojiPicker(playerIndex = null) {
    this.editingPlayerIndex = playerIndex;
    const currentEmoji = playerIndex !== null
      ? this.players[playerIndex].avatar
      : this.selectedNewPlayerAvatar;

    if (playerIndex !== null) {
      const p = this.players[playerIndex];
      if (this.emojiPickerSubtitle) {
        this.emojiPickerSubtitle.textContent = `Välj en emoji för ${p.name}:`;
      }
    } else {
      if (this.emojiPickerSubtitle) {
        this.emojiPickerSubtitle.textContent = 'Välj en emoji för ny spelare:';
      }
    }

    const foundCat = EMOJI_CATEGORIES.find((c) => c.id !== 'all' && c.emojis.includes(currentEmoji));
    this.activeEmojiCategory = foundCat ? foundCat.id : 'all';

    this.renderEmojiPicker(currentEmoji);
    if (this.modalEmojiPicker) {
      this.modalEmojiPicker.classList.add('open');
    }
  }

  closeEmojiPicker() {
    if (this.modalEmojiPicker) {
      this.modalEmojiPicker.classList.remove('open');
    }
    this.editingPlayerIndex = null;
  }

  renderEmojiPicker(selectedEmoji) {
    if (!this.emojiGrid) return;

    // Render Category Pills
    if (this.emojiCategoryPills) {
      this.emojiCategoryPills.innerHTML = '';
      EMOJI_CATEGORIES.forEach((cat) => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = 'emoji-cat-pill' + (cat.id === this.activeEmojiCategory ? ' active' : '');
        pill.textContent = cat.name;
        pill.addEventListener('click', () => {
          this.activeEmojiCategory = cat.id;
          this.renderEmojiPicker(selectedEmoji);
          if (window.soundFX) window.soundFX.playUiClick();
        });
        this.emojiCategoryPills.appendChild(pill);
      });
    }

    // Determine list of emojis to show
    const currentCat = EMOJI_CATEGORIES.find((c) => c.id === this.activeEmojiCategory) || EMOJI_CATEGORIES[0];
    const emojis = currentCat.id === 'all' ? ALL_AVATAR_EMOJIS : currentCat.emojis;

    // Render Emoji Grid
    this.emojiGrid.innerHTML = '';
    emojis.forEach((em) => {
      const btn = document.createElement('button');
      btn.className = 'emoji-opt' + (em === selectedEmoji ? ' selected' : '');
      btn.textContent = em;
      btn.type = 'button';
      btn.setAttribute('aria-label', `Välj ${em}`);
      btn.addEventListener('click', () => {
        this.selectEmoji(em);
      });
      this.emojiGrid.appendChild(btn);
    });

    // Scroll selected emoji into view if in current category
    setTimeout(() => {
      const selectedBtn = this.emojiGrid.querySelector('.emoji-opt.selected');
      if (selectedBtn) {
        selectedBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 60);
  }

  selectEmoji(emoji) {
    if (this.editingPlayerIndex !== null) {
      this.players[this.editingPlayerIndex].avatar = emoji;
      this.renderPlayerList();
      this.updatePlayerBanner();
      this.saveState();
    } else {
      this.selectedNewPlayerAvatar = emoji;
      if (this.newPlayerAvatarPreview) {
        this.newPlayerAvatarPreview.textContent = emoji;
      }
    }
    if (window.soundFX) window.soundFX.playUiClick();
    this.vibrate(15);
    this.closeEmojiPicker();
  }

  // Voice Studio Modal
  openVoiceModal() {
    this.renderVoiceItems();
    this.modalVoice.classList.add('open');
  }

  closeVoiceModal() {
    this.modalVoice.classList.remove('open');
  }

  // Voice Recording Helper
  async recordVoice(key, onStart, onStop) {
    if (this.currentRecorder && this.currentRecorder.state === 'recording') {
      try {
        this.currentRecorder.stop();
      } catch (e) {}
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      this.currentRecorder = mediaRecorder;
      const audioChunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result;
          if (window.soundFX) window.soundFX.saveCustomRecording(key, base64Data);
          if (onStop) onStop(true);
        };
        reader.readAsDataURL(blob);

        stream.getTracks().forEach((track) => track.stop());
        this.currentRecorder = null;
      };

      mediaRecorder.start();
      if (onStart) onStart();

      // Auto stop after 3.5s
      setTimeout(() => {
        if (this.currentRecorder && this.currentRecorder === mediaRecorder && mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 3500);
    } catch (err) {
      alert('Kunde inte få tillgång till mikrofonen. Kontrollera behörigheter i webbläsaren.');
      if (onStop) onStop(false);
    }
  }

  renderVoiceItems() {
    // 1. Ian click row setup
    this.setupRecordRow('ian_click', document.getElementById('row-rec-ian'));

    // 2. Player turn voice recordings
    if (this.voicePlayersContainer) {
      this.voicePlayersContainer.innerHTML = '';
      this.players.forEach((p) => {
        const pKey = `player_turn_${p.id}`;
        const row = document.createElement('div');
        row.className = 'record-row';
        const possessive = window.soundFX ? window.soundFX.getPossessive(p.name) : `${p.name}s tur`;
        row.innerHTML = `
          <div class="record-row-info">
            <span>${p.avatar}</span>
            <span>${p.name} ("${possessive}")</span>
          </div>
          <div class="record-row-btns">
            <button class="btn-record" data-key="${pKey}">🔴 Spela in</button>
            <button class="btn-play-rec" data-key="${pKey}" style="display: none;">▶️</button>
            <button class="btn-del-rec" data-key="${pKey}" style="display: none;">🗑️</button>
          </div>
        `;
        this.setupRecordRow(pKey, row, () => this.renderPlayerList());
        this.voicePlayersContainer.appendChild(row);
      });
    }

    // 3. Dynamic rows for current mode
    if (this.voiceModeHeader) {
      this.voiceModeHeader.textContent = `⭐ ${GAME_MODES[this.activeMode].name} & Resultat:`;
    }

    this.voiceItemsContainer.innerHTML = '';
    const items = this.currentItems;

    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'record-row';
      row.innerHTML = `
        <div class="record-row-info">
          <span>${item.emoji || (item.dicePips ? '🎲' : '⭐')}</span>
          <span>${item.name}</span>
        </div>
        <div class="record-row-btns">
          <button class="btn-record" data-key="${item.audioKey}">🔴 Spela in</button>
          <button class="btn-play-rec" data-key="${item.audioKey}" style="display: none;">▶️</button>
          <button class="btn-del-rec" data-key="${item.audioKey}" style="display: none;">🗑️</button>
        </div>
      `;
      this.setupRecordRow(item.audioKey, row);
      this.voiceItemsContainer.appendChild(row);
    });
  }

  setupRecordRow(key, container, onUpdate = null) {
    const btnRec = container.querySelector(`.btn-record[data-key="${key}"]`);
    const btnPlay = container.querySelector(`.btn-play-rec[data-key="${key}"]`);
    const btnDel = container.querySelector(`.btn-del-rec[data-key="${key}"]`);

    const updateBtns = () => {
      const hasRec = window.soundFX && window.soundFX.hasCustomRecording(key);
      if (btnPlay) btnPlay.style.display = hasRec ? 'inline-block' : 'none';
      if (btnDel) btnDel.style.display = hasRec ? 'inline-block' : 'none';
      if (btnRec) btnRec.textContent = hasRec ? '🔄 Byt röst' : '🔴 Spela in';
    };

    updateBtns();

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (window.soundFX) window.soundFX.playCustomAudio(key);
      });
    }

    if (btnDel) {
      btnDel.addEventListener('click', () => {
        if (window.soundFX) window.soundFX.deleteCustomRecording(key);
        updateBtns();
        if (onUpdate) onUpdate();
      });
    }

    if (btnRec) {
      btnRec.addEventListener('click', async () => {
        if (this.currentRecorder && this.currentRecorder.state === 'recording') {
          this.currentRecorder.stop();
          return;
        }

        await this.recordVoice(
          key,
          () => {
            btnRec.classList.add('recording');
            btnRec.textContent = '⏹️ Stoppa';
          },
          (saved) => {
            btnRec.classList.remove('recording');
            updateBtns();
            if (onUpdate) onUpdate();
          }
        );
      });
    }
  }

  // History & Storage
  resetHistory() {
    this.history = [];
    this.players.forEach((p) => { p.history = []; });
    this.saveState();
    this.renderHistory();
    this.updatePlayerBanner();
    this.renderPlayerList();
    this.vibrate([20, 20]);
    if (window.soundFX) window.soundFX.playUiClick();
  }

  getOutcomeSymbol(winner, isLargeBadge = false) {
    if (!winner) return '⭐';
    if (winner.emoji) return winner.emoji; // Animals: 🐶, 🐱, 🐮, 🦁, 🐸, 🐵
    if (winner.dicePips) {
      const diceIcons = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
      return isLargeBadge ? (diceIcons[winner.dicePips - 1] || `${winner.dicePips}`) : `${winner.dicePips}`;
    }
    if (winner.index === 0) return '🌈';
    return '⭐';
  }

  addToHistory(winner, player = null) {
    this.history.unshift({
      winner: winner,
      player: player ? { id: player.id, name: player.name, avatar: player.avatar } : null,
      time: Date.now()
    });
    if (this.history.length > 20) this.history.pop();

    if (player) {
      if (!Array.isArray(player.history)) player.history = [];
      player.history.unshift({
        name: winner.name,
        color: winner.color,
        badgeGradient: winner.badgeGradient,
        dicePips: winner.dicePips,
        emoji: winner.emoji,
        index: winner.index,
        time: Date.now()
      });
      if (player.history.length > 8) player.history.pop();
    }

    this.renderHistory();
    this.saveState();
  }

  renderHistory() {
    if (!this.historyItems) return;

    if (this.playerModeEnabled) {
      if (!this.players || this.players.length === 0) {
        this.historyItems.innerHTML = '<span style="font-size: 0.75rem; color: var(--text-dim);">Inga spelare</span>';
        return;
      }

      this.historyItems.innerHTML = '';
      this.players.forEach((p, pIdx) => {
        const isCurrentTurn = pIdx === this.currentPlayerIdx;
        const card = document.createElement('div');
        card.className = `player-history-card ${isCurrentTurn ? 'active-turn' : ''}`;
        card.style.setProperty('--p-color', p.color || '#FFD600');
        card.title = `${p.name} (${isCurrentTurn ? 'Har turen nu!' : 'Klicka för att välja'})`;

        card.addEventListener('click', () => {
          if (this.currentPlayerIdx !== pIdx && !this.isSpinning) {
            this.currentPlayerIdx = pIdx;
            this.updatePlayerBanner();
            this.speakCurrentPlayerTurn();
            this.vibrate(15);
            if (window.soundFX) window.soundFX.playUiClick();
          }
        });

        const header = document.createElement('div');
        header.className = 'player-history-header';
        header.innerHTML = `
          <span class="player-history-avatar">${p.avatar}</span>
          <span class="player-history-name">${p.name}:</span>
          ${isCurrentTurn ? '<span class="player-turn-tag">Nu</span>' : ''}
        `;
        card.appendChild(header);

        const outcomes = document.createElement('div');
        outcomes.className = 'player-history-outcomes';

        const pHistory = Array.isArray(p.history) ? p.history : [];
        if (pHistory.length === 0) {
          const empty = document.createElement('span');
          empty.className = 'player-history-empty';
          empty.textContent = '–';
          empty.title = `${p.name} har inte snurrat än`;
          outcomes.appendChild(empty);
        } else {
          // Show up to 5 most recent spins for this player
          pHistory.slice(0, 5).forEach((item) => {
            const dot = document.createElement('div');
            dot.className = 'history-dot';
            dot.style.background = item.badgeGradient || item.color;
            const isLightBg = item.color === '#FFEA00' || item.color === '#FFD600' || item.color === '#FFD54F';
            dot.style.color = isLightBg ? '#1A1A24' : '#FFFFFF';
            dot.title = `${p.name}: ${item.name}`;
            dot.textContent = this.getOutcomeSymbol(item, false);
            outcomes.appendChild(dot);
          });
        }

        card.appendChild(outcomes);
        this.historyItems.appendChild(card);
      });
      return;
    }

    // Default Single Player Mode
    if (this.history.length === 0) {
      this.historyItems.innerHTML = '<span style="font-size: 0.75rem; color: var(--text-dim);">Inga snurr än</span>';
      return;
    }

    this.historyItems.innerHTML = '';
    this.history.slice(0, 8).forEach((item) => {
      const dot = document.createElement('div');
      dot.className = 'history-dot';
      dot.style.background = item.winner.badgeGradient || item.winner.color;
      const isLightBg = item.winner.color === '#FFEA00' || item.winner.color === '#FFD600' || item.winner.color === '#FFD54F';
      dot.style.color = isLightBg ? '#1A1A24' : '#FFFFFF';
      dot.title = item.winner.name;
      dot.textContent = this.getOutcomeSymbol(item.winner, false);
      this.historyItems.appendChild(dot);
    });
  }

  saveState() {
    try {
      localStorage.setItem('stjarn_active_mode', this.activeMode);
      localStorage.setItem('stjarn_player_mode', JSON.stringify(this.playerModeEnabled));
      localStorage.setItem('stjarn_players', JSON.stringify(this.players));
    } catch (e) {}
  }

  loadState() {
    try {
      const mode = localStorage.getItem('stjarn_active_mode');
      if (mode && GAME_MODES[mode]) this.activeMode = mode;

      const pMode = localStorage.getItem('stjarn_player_mode');
      if (pMode !== null) this.playerModeEnabled = JSON.parse(pMode);
      this.btnTogglePlayers.classList.toggle('active', this.playerModeEnabled);

      const pList = localStorage.getItem('stjarn_players');
      if (pList) {
        const parsed = JSON.parse(pList);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.players = parsed.map((p) => ({
            ...p,
            history: Array.isArray(p.history) ? p.history : []
          }));
        }
      }
    } catch (e) {}
  }

  vibrate(pattern) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  async forceRefreshApp() {
    this.vibrate([30, 50]);
    if (window.soundFX) window.soundFX.playUiClick();

    if (this.btnForceRefresh) {
      this.btnForceRefresh.style.transition = 'transform 0.8s ease';
      this.btnForceRefresh.style.transform = 'rotate(720deg)';
    }

    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.unregister();
        }
      }
    } catch (err) {
      console.warn('Cache clearing error:', err);
    }

    // Force hard reload with timestamp cache-buster parameter
    const cleanUrl = window.location.origin + window.location.pathname.split('?')[0].split('#')[0];
    window.location.replace(`${cleanUrl}?v=${Date.now()}`);
  }

  openQrModal() {
    const publicUrl = `https://dewin.github.io/stjarnsnurran/`;
    const qrImg = document.getElementById('qr-img');
    const qrUrlText = document.getElementById('qr-url');
    qrUrlText.textContent = publicUrl;
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(publicUrl)}`;
    this.qrModal.classList.add('open');
  }

  closeQrModal() {
    this.qrModal.classList.remove('open');
  }
}

// Start app on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.starSpinner = new StarSpinner();
});
