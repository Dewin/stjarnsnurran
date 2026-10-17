// audio.js - Web Audio API Synthesizer & Custom Voice Player for Stjärnsnurran
// 100% offline, zero latency

class SoundFX {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.voiceEnabled = true;
    this.customRecordings = {}; // Map of key -> dataUrl/blobUrl
    this.currentAudioElement = null;
    this.loadCustomRecordings();
  }

  stopAllVoice() {
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch (e) {}
      this.currentAudioElement = null;
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
  }

  setVoiceEnabled(enabled) {
    this.voiceEnabled = enabled;
  }

  // Load custom voice recordings from localStorage
  loadCustomRecordings() {
    try {
      const saved = localStorage.getItem('stjarn_custom_audio');
      if (saved) {
        this.customRecordings = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load custom recordings:', e);
    }
  }

  saveCustomRecording(key, dataUrl) {
    this.customRecordings[key] = dataUrl;
    try {
      localStorage.setItem('stjarn_custom_audio', JSON.stringify(this.customRecordings));
    } catch (e) {
      console.warn('Storage quota exceeded or error:', e);
    }
  }

  deleteCustomRecording(key) {
    delete this.customRecordings[key];
    try {
      localStorage.setItem('stjarn_custom_audio', JSON.stringify(this.customRecordings));
    } catch (e) {}
  }

  hasCustomRecording(key) {
    return !!this.customRecordings[key];
  }

  playCustomAudio(key, onEnded = null) {
    if (!this.customRecordings[key]) return false;
    try {
      this.stopAllVoice();
      const audio = new Audio(this.customRecordings[key]);
      this.currentAudioElement = audio;

      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        if (this.currentAudioElement === audio) {
          this.currentAudioElement = null;
        }
        if (typeof onEnded === 'function') {
          onEnded();
        }
      };

      audio.onended = done;
      audio.onerror = done;

      // Safety timeout in case audio element hangs or fails silently
      const safetyTimer = setTimeout(done, 8000);
      audio.addEventListener('ended', () => clearTimeout(safetyTimer));
      audio.addEventListener('error', () => clearTimeout(safetyTimer));

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          clearTimeout(safetyTimer);
          done();
        });
      }
      return true;
    } catch (e) {
      if (typeof onEnded === 'function') {
        onEnded();
      }
      return false;
    }
  }

  // Mechanical tactile click or custom recorded sound when pressing Ian
  playButtonPress() {
    if (!this.soundEnabled) return;
    if (this.playCustomAudio('ian_click')) return;

    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.04);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Subtle clean UI click for generic modal buttons and controls
  playUiClick() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.03);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  }

  // Dice rattle sound when phone is physically shaken
  playShakeRattle() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // 3 short rattles
    [0, 0.04, 0.09, 0.14].forEach((offset, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280 + Math.random() * 200, now + offset);
      osc.frequency.exponentialRampToValueAtTime(70, now + offset + 0.03);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now + offset);

      gain.gain.setValueAtTime(0.25, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.04);
    });
  }

  // The iconic retro electronic "blipp" as light spins
  playBlip(stepIndex, totalSteps, speedMs) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const progress = Math.min(1, stepIndex / Math.max(1, totalSteps));
    const baseFreq = 960 + progress * 260; // 960Hz -> 1220Hz

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'square';
    osc1.frequency.setValueAtTime(baseFreq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(baseFreq * 1.01, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2600, now);

    const dur = Math.min(0.045, Math.max(0.025, (speedMs / 1000) * 0.7));
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + dur + 0.01);
    osc2.stop(now + dur + 0.01);
  }

  // Triumphant victory fanfare when landing on the chosen star
  playWin(starIndex) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Standard joyful victory arpeggio: C5, E5, G5, C6
    const notes = [
      { freq: 523.25, delay: 0.0, dur: 0.16, vol: 0.28 },
      { freq: 659.25, delay: 0.11, dur: 0.16, vol: 0.28 },
      { freq: 783.99, delay: 0.22, dur: 0.2, vol: 0.32 },
      { freq: 1046.5, delay: 0.35, dur: 0.65, vol: 0.38 }
    ];

    notes.forEach((n) => {
      this.playChimeNote(n.freq, now + n.delay, n.dur, n.vol);
    });
  }

  // High-energy Disco / Rainbow Jackpot Fanfare
  playDiscoJingle() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Fast arpeggiated melodic chime with sparkle shimmer
    const fanfare = [
      { freq: 523.25, delay: 0.0, dur: 0.12, vol: 0.25 }, // C5
      { freq: 659.25, delay: 0.08, dur: 0.12, vol: 0.25 }, // E5
      { freq: 783.99, delay: 0.16, dur: 0.12, vol: 0.28 }, // G5
      { freq: 987.77, delay: 0.24, dur: 0.12, vol: 0.28 }, // B5
      { freq: 1046.5, delay: 0.32, dur: 0.2, vol: 0.35 }, // C6
      { freq: 1318.51, delay: 0.44, dur: 0.22, vol: 0.35 }, // E6
      { freq: 1567.98, delay: 0.58, dur: 0.75, vol: 0.4 } // G6 sustained!
    ];

    fanfare.forEach((n) => {
      this.playChimeNote(n.freq, now + n.delay, n.dur, n.vol);
    });
  }

  playChimeNote(freq, startTime, duration, volume) {
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(freq * 2, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    oscHarmonic.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    oscHarmonic.start(startTime);
    osc.stop(startTime + duration + 0.05);
    oscHarmonic.stop(startTime + duration + 0.05);
  }

  // Animal Sound Synthesizer / FX for Animal Mode
  playAnimalFX(type) {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    switch (type) {
      case 'dog': // Playful bark
        this.playBark(now);
        break;
      case 'cat': // Gentle meow
        this.playMeow(now);
        break;
      case 'cow': // Low moo
        this.playMoo(now);
        break;
      case 'lion': // Roar
        this.playRoar(now);
        break;
      case 'frog': // Ribbit
        this.playRibbit(now);
        break;
      case 'monkey': // Monkey chatter
        this.playMonkey(now);
        break;
    }
  }

  playBark(t) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.12);
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.13);
  }

  playMeow(t) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(550, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.18);
    osc.frequency.exponentialRampToValueAtTime(620, t + 0.4);
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.42);
  }

  playMoo(t) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.linearRampToValueAtTime(155, t + 0.2);
    osc.frequency.linearRampToValueAtTime(125, t + 0.55);
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.6);
  }

  playRoar(t) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.linearRampToValueAtTime(170, t + 0.2);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.6);
    gain.gain.setValueAtTime(0.45, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.65);
  }

  playRibbit(t) {
    for (let i = 0; i < 4; i++) {
      const off = i * 0.05;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(280 + i * 20, t + off);
      gain.gain.setValueAtTime(0.2, t + off);
      gain.gain.exponentialRampToValueAtTime(0.001, t + off + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + off);
      osc.stop(t + off + 0.04);
    }
  }

  playMonkey(t) {
    [0, 0.12, 0.24].forEach((off, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + idx * 150, t + off);
      osc.frequency.exponentialRampToValueAtTime(1200 + idx * 150, t + off + 0.08);
      gain.gain.setValueAtTime(0.3, t + off);
      gain.gain.exponentialRampToValueAtTime(0.001, t + off + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + off);
      osc.stop(t + off + 0.1);
    });
  }

  // Announces result: first checks if custom recording exists, else speaks in Swedish
  speakResult(audioKey, textToSpeak, animalType = null, onComplete = null) {
    if (!this.voiceEnabled) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    // Check custom audio first
    if (this.hasCustomRecording(audioKey)) {
      this.playCustomAudio(audioKey, onComplete);
      return;
    }

    // If animal mode, play cute animal FX first
    if (animalType) {
      this.playAnimalFX(animalType);
    }

    // Web Speech API in Swedish
    if ('speechSynthesis' in window) {
      this.stopAllVoice();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'sv-SE';
      utterance.rate = 1.05;
      utterance.pitch = 1.15;

      const voices = window.speechSynthesis.getVoices();
      const svVoice = voices.find((v) => v.lang.startsWith('sv'));
      if (svVoice) {
        utterance.voice = svVoice;
      }

      let completed = false;
      const done = () => {
        if (completed) return;
        completed = true;
        if (typeof onComplete === 'function') {
          onComplete();
        }
      };

      utterance.onend = done;
      utterance.onerror = done;

      // Web Speech API safety timeout (SpeechSynthesis on Chrome/Android can sometimes hang without firing onend)
      const safetyTimer = setTimeout(done, 4500);

      // Small delay if animal sound played first
      const delay = animalType ? 350 : 50;
      setTimeout(() => {
        try {
          window.speechSynthesis.speak(utterance);
        } catch (e) {
          clearTimeout(safetyTimer);
          done();
        }
      }, delay);
    } else {
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }
  }

  // Announces whose turn it is: first checks if custom recording exists, else speaks in Swedish
  speakPlayerTurn(player, onComplete = null) {
    if (!this.soundEnabled || !this.voiceEnabled || !player) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    const key = `player_turn_${player.id}`;
    // 1. Play custom recording if available
    if (this.hasCustomRecording(key)) {
      this.playCustomAudio(key, onComplete);
      return;
    }

    // 2. Synthesize Swedish speech
    if ('speechSynthesis' in window) {
      this.stopAllVoice();
      const possessive = this.getPossessive(player.name);
      const textToSpeak = `${possessive} att snurra!`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'sv-SE';
      utterance.rate = 1.05;
      utterance.pitch = 1.15;

      const voices = window.speechSynthesis.getVoices();
      const svVoice = voices.find((v) => v.lang.startsWith('sv'));
      if (svVoice) {
        utterance.voice = svVoice;
      }

      let completed = false;
      const done = () => {
        if (completed) return;
        completed = true;
        if (typeof onComplete === 'function') {
          onComplete();
        }
      };

      utterance.onend = done;
      utterance.onerror = done;

      const safetyTimer = setTimeout(done, 4000);

      setTimeout(() => {
        try {
          window.speechSynthesis.speak(utterance);
        } catch (e) {
          clearTimeout(safetyTimer);
          done();
        }
      }, 60);
    } else {
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }
  }

  getPossessive(name) {
    if (!name) return '';
    const clean = name.trim();
    const last = clean.slice(-1).toLowerCase();
    if (last === 's' || last === 'x' || last === 'z') {
      return `${clean} tur`;
    }
    return `${clean}s tur`;
  }
}

window.soundFX = new SoundFX();
