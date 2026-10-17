// audio.js - Web Audio API Sound Synthesizer for Rupert Star Spinner
// 100% offline, zero latency, authentic retro electronic toy sounds

class SoundFX {
    constructor() {
        this.ctx = null;
        this.soundEnabled = true;
        this.voiceEnabled = true;
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

    // Mechanical tactile click when button is pressed
    playButtonPress() {
        if (!this.soundEnabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
    }

    // The iconic retro electronic "blipp" as the light spins
    playBlip(stepIndex, totalSteps, speedMs) {
        if (!this.soundEnabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        // Base frequency starts at ~920 Hz and rises subtly near the end for suspense
        const progress = Math.min(1, stepIndex / Math.max(1, totalSteps));
        const baseFreq = 940 + progress * 240; // 940Hz -> 1180Hz

        // Dual oscillator for authentic retro toy piezo character
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc1.type = 'square';
        osc1.frequency.setValueAtTime(baseFreq, now);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(baseFreq * 1.01, now);

        // Lowpass filter to smooth the square wave into a pleasant toy beep
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2400, now);

        const dur = Math.min(0.045, Math.max(0.025, speedMs / 1000 * 0.7));
        gain.gain.setValueAtTime(0.25, now);
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

        // Special magical rainbow chime if index 0 (Rainbow / Wildcard)
        if (starIndex === 0) {
            const rainbowNotes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, B5, C6, E6, G6
            rainbowNotes.forEach((freq, idx) => {
                const noteTime = now + idx * 0.08;
                this.playChimeNote(freq, noteTime, 0.45, 0.22);
            });
            return;
        }

        // Standard cheerful victory fanfare: C5, E5, G5, C6
        const notes = [
            { freq: 523.25, delay: 0.00, dur: 0.18, vol: 0.25 }, // C5
            { freq: 659.25, delay: 0.12, dur: 0.18, vol: 0.25 }, // E5
            { freq: 783.99, delay: 0.24, dur: 0.22, vol: 0.28 }, // G5
            { freq: 1046.50, delay: 0.38, dur: 0.65, vol: 0.35 } // C6 (sustained celebration)
        ];

        notes.forEach(n => {
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
        oscHarmonic.frequency.setValueAtTime(freq * 2, startTime); // 1 octave overtone

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

    // Swedish speech synthesis for announcing the color
    speakColor(swedishText) {
        if (!this.voiceEnabled) return;
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(swedishText);
        utterance.lang = 'sv-SE';
        utterance.rate = 1.05;
        utterance.pitch = 1.15; // Friendly, slightly upbeat pitch for kids

        // Find a Swedish voice if available
        const voices = window.speechSynthesis.getVoices();
        const svVoice = voices.find(v => v.lang.startsWith('sv'));
        if (svVoice) {
            utterance.voice = svVoice;
        }

        window.speechSynthesis.speak(utterance);
    }
}

window.soundFX = new SoundFX();
