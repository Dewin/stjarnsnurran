// app.js - Rupert Bear Star Spinner Logic
// Handles spinning animations, LED states, audio synchronization, haptics, and PWA setup

const STARS_DATA = [
  {
    index: 0,
    name: "Regnbåge!",
    speech: "Regnbåge! Välj valfri färg!",
    sub: "Joker – Välj vilken färg du vill!",
    color: "#E040FB",
    badgeGradient: "linear-gradient(135deg, #9D65A0, #F5C518, #20637A, #D96144, #2E7D32)",
    textColor: "#FF80AB"
  },
  {
    index: 1,
    name: "Gul stjärna!",
    speech: "Gult!",
    sub: "Solig och varm som honung!",
    color: "#F5C518",
    badgeGradient: "#F5C518",
    textColor: "#F5C518"
  },
  {
    index: 2,
    name: "Blå stjärna!",
    speech: "Blått!",
    sub: "Djupblå som stjärnhimlen!",
    color: "#20637A",
    badgeGradient: "#20637A",
    textColor: "#4FC3F7"
  },
  {
    index: 3,
    name: "Orange stjärna!",
    speech: "Orange!",
    sub: "Pigg och glad som en apelsin!",
    color: "#D96144",
    badgeGradient: "#D96144",
    textColor: "#FF8A65"
  },
  {
    index: 4,
    name: "Grön stjärna!",
    speech: "Grönt!",
    sub: "Skön som sommargräset!",
    color: "#2E7D32",
    badgeGradient: "#2E7D32",
    textColor: "#81C784"
  },
  {
    index: 5,
    name: "Lila stjärna!",
    speech: "Lila!",
    sub: "Kunglig och magisk!",
    color: "#9D65A0",
    badgeGradient: "#9D65A0",
    textColor: "#CE93D8"
  }
];

class StarSpinner {
  constructor() {
    this.isSpinning = false;
    this.currentLedIndex = -1;
    this.history = [];
    this.deferredPrompt = null;

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
    this.btnSound = document.getElementById('btn-sound');
    this.btnVoice = document.getElementById('btn-voice');
    this.btnFullscreen = document.getElementById('btn-fullscreen');
    this.btnQr = document.getElementById('btn-qr');
    this.qrModal = document.getElementById('qr-modal');
    this.btnCloseQr = document.getElementById('btn-close-qr');
    this.installBanner = document.getElementById('install-banner');
    this.btnDoInstall = document.getElementById('btn-do-install');

    // Cache star & LED elements
    this.starElements = [];
    this.ledLayers = [];
    for (let i = 0; i < 6; i++) {
      this.starElements[i] = document.getElementById(`star-${i}`);
      const ledAssembly = document.getElementById(`led-${i}`);
      this.ledLayers[i] = ledAssembly.querySelector('.led-active-layer');
    }

    this.initEvents();
    this.loadHistory();
  }

  initEvents() {
    // Spin trigger on center button
    const handleSpin = (e) => {
      e.preventDefault();
      if (this.isSpinning) return;
      this.spin();
    };

    this.centerButton.addEventListener('click', handleSpin);
    this.centerButton.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        handleSpin(e);
      }
    });

    // Touch feedback on center button
    this.centerButton.addEventListener('pointerdown', () => {
      if (!this.isSpinning) {
        this.centerButton.classList.add('pressed');
        if (window.soundFX) window.soundFX.playButtonPress();
      }
    });

    const releaseButton = () => this.centerButton.classList.remove('pressed');
    this.centerButton.addEventListener('pointerup', releaseButton);
    this.centerButton.addEventListener('pointercancel', releaseButton);
    this.centerButton.addEventListener('pointerleave', releaseButton);

    // Quick spin button
    this.quickSpinBtn.addEventListener('click', handleSpin);

    // Sound toggle
    this.btnSound.addEventListener('click', () => {
      const active = this.btnSound.classList.toggle('active');
      this.btnSound.textContent = active ? '🔊' : '🔇';
      if (window.soundFX) window.soundFX.setSoundEnabled(active);
    });

    // Voice toggle
    this.btnVoice.addEventListener('click', () => {
      const active = this.btnVoice.classList.toggle('active');
      this.btnVoice.textContent = active ? '🗣️' : '🤫';
      if (window.soundFX) window.soundFX.setVoiceEnabled(active);
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

    // QR Code Modal
    this.btnQr.addEventListener('click', () => this.openQrModal());
    this.btnCloseQr.addEventListener('click', () => this.closeQrModal());
    this.qrModal.addEventListener('click', (e) => {
      if (e.target === this.qrModal) this.closeQrModal();
    });

    // PWA Install event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      if (this.installBanner) this.installBanner.style.display = 'flex';
    });

    if (this.btnDoInstall) {
      this.btnDoInstall.addEventListener('click', async () => {
        if (!this.deferredPrompt) return;
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          if (this.installBanner) this.installBanner.style.display = 'none';
        }
        this.deferredPrompt = null;
      });
    }

    // Keyboard shortcut (Space / Enter anywhere spins)
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'BUTTON' && !this.isSpinning) {
        e.preventDefault();
        this.spin();
      }
    });
  }

  setLed(index, isLit) {
    if (index >= 0 && index < 6) {
      this.ledLayers[index].style.display = isLit ? 'block' : 'none';
      if (isLit) {
        this.starElements[index].classList.add('lit');
      } else {
        this.starElements[index].classList.remove('lit', 'winner');
        this.ledLayers[index].classList.remove('pulsing');
      }
    }
  }

  clearAllLeds() {
    for (let i = 0; i < 6; i++) {
      this.setLed(i, false);
    }
  }

  async spin() {
    if (this.isSpinning) return;
    this.isSpinning = true;

    // Unlock Web Audio on mobile touch
    if (window.soundFX) window.soundFX.init();

    // Visual button and app state
    this.centerButton.classList.add('disabled');
    this.quickSpinBtn.disabled = true;
    this.toyContainer.classList.add('spinning');
    this.clearAllLeds();

    // Haptic initial buzz
    this.vibrate(25);

    // Pick random winner (0 to 5)
    const winningIndex = Math.floor(Math.random() * 6);

    // Start position
    let currentPos = this.currentLedIndex >= 0 ? this.currentLedIndex : Math.floor(Math.random() * 6);

    // Calculate total steps: 3 full revolutions + delta to reach winner
    const fullLaps = 3 + Math.floor(Math.random() * 2); // 3 or 4 laps
    const delta = (winningIndex - currentPos + 6) % 6;
    const totalSteps = fullLaps * 6 + delta + (delta < 2 ? 6 : 0);

    // Update Result UI during spin
    this.resultBadge.textContent = '⏳';
    this.resultBadge.style.background = '#333344';
    this.resultBadge.classList.remove('active-badge');
    this.resultTitle.textContent = "Snurrar runt...";
    this.resultTitle.style.color = "#FFFFFF";
    this.resultSub.textContent = "Vilken färg blir det?";

    // Step animation loop with physics-inspired deceleration
    let step = 0;
    while (step < totalSteps) {
      // Calculate delay based on progress
      const progress = step / totalSteps;
      let delay = 50; // Fast initial flurry

      if (progress > 0.45) {
        // Smooth exponential deceleration
        const slowFactor = (progress - 0.45) / 0.55; // 0 to 1
        delay = 55 + Math.pow(slowFactor, 2.6) * 780; // 55ms -> 835ms
      }

      // Advance to next star clockwise
      const prevPos = currentPos;
      currentPos = (currentPos + 1) % 6;

      this.setLed(prevPos, false);
      this.setLed(currentPos, true);

      // Play blipp and haptic
      if (window.soundFX) {
        window.soundFX.playBlip(step, totalSteps, delay);
      }
      this.vibrate(12);

      await new Promise(r => setTimeout(r, delay));
      step++;
    }

    // Landed on winner!
    this.currentLedIndex = winningIndex;
    const winnerData = STARS_DATA[winningIndex];

    // Winner celebration effects
    this.toyContainer.classList.remove('spinning');
    this.starElements[winningIndex].classList.add('winner');
    this.ledLayers[winningIndex].classList.add('pulsing');

    // Winning victory fanfare
    if (window.soundFX) {
      window.soundFX.playWin(winningIndex);
      // Small timeout before announcing in Swedish so fanfare is heard
      setTimeout(() => {
        window.soundFX.speakColor(winnerData.speech);
      }, 550);
    }

    // Android victory haptics: distinctive celebratory pulse
    this.vibrate([35, 60, 35, 60, 140]);

    // Update Result Card
    this.resultBadge.textContent = '⭐';
    this.resultBadge.style.background = winnerData.badgeGradient;
    this.resultBadge.classList.add('active-badge');
    this.resultTitle.textContent = winnerData.name;
    this.resultTitle.style.color = winnerData.textColor;
    this.resultSub.textContent = winnerData.sub;

    // Add to history
    this.addToHistory(winnerData);

    // Re-enable controls
    this.centerButton.classList.remove('disabled');
    this.quickSpinBtn.disabled = false;
    this.isSpinning = false;
  }

  addToHistory(winner) {
    this.history.unshift(winner);
    if (this.history.length > 8) this.history.pop();
    this.renderHistory();

    try {
      localStorage.setItem('stjarn_history', JSON.stringify(this.history.map(h => h.index)));
    } catch (e) {}
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('stjarn_history');
      if (saved) {
        const indices = JSON.parse(saved);
        if (Array.isArray(indices)) {
          this.history = indices.map(idx => STARS_DATA[idx]).filter(Boolean);
          this.renderHistory();
        }
      }
    } catch (e) {}
  }

  renderHistory() {
    if (this.history.length === 0) {
      this.historyItems.innerHTML = '<span style="font-size: 0.75rem; color: var(--text-dim);">Inga snurr än</span>';
      return;
    }

    this.historyItems.innerHTML = '';
    this.history.forEach(item => {
      const dot = document.createElement('div');
      dot.className = 'history-dot';
      dot.style.background = item.badgeGradient;
      dot.title = item.name;
      this.historyItems.appendChild(dot);
    });
  }

  vibrate(pattern) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  openQrModal() {
    // Build QR code URL using local network IP
    const localUrl = `http://192.168.1.57:8080`;
    const qrImg = document.getElementById('qr-img');
    const qrUrlText = document.getElementById('qr-url');

    qrUrlText.textContent = localUrl;
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(localUrl)}`;
    this.qrModal.classList.add('open');
  }

  closeQrModal() {
    this.qrModal.classList.remove('open');
  }
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.starSpinner = new StarSpinner();
});
