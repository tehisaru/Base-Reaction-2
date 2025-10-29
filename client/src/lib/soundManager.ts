// Sound Manager using Web Audio API for procedural sound generation
// This creates simple, satisfying sounds without requiring audio files

class SoundManager {
  private audioContext: AudioContext | null = null;
  private masterVolume = 0.3; // Keep sounds subtle
  private enabled = true;

  constructor() {
    // Initialize AudioContext on first user interaction
    if (typeof window !== 'undefined') {
      window.addEventListener('click', () => this.initAudioContext(), { once: true });
      window.addEventListener('keydown', () => this.initAudioContext(), { once: true });
    }
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private getContext(): AudioContext | null {
    this.initAudioContext();
    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  // Soft click sound for placing dots
  playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Short, high-pitched click
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.05);
    
    gainNode.gain.setValueAtTime(this.masterVolume * 0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    oscillator.start(now);
    oscillator.stop(now + 0.05);
  }

  // Satisfying explosion sound
  playExplosion() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Create noise buffer for explosion texture
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(1000, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(100, now + 0.5);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(this.masterVolume * 0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    noise.start(now);
    noise.stop(now + 0.5);
    
    // Add bass thump
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    
    bass.frequency.setValueAtTime(80, now);
    bass.frequency.exponentialRampToValueAtTime(40, now + 0.3);
    
    bassGain.gain.setValueAtTime(this.masterVolume * 0.4, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    
    bass.start(now);
    bass.stop(now + 0.3);
  }

  // Power-up collection sound (magical chime)
  playPowerUp() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 - major chord
    
    notes.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, now + index * 0.08);
      oscillator.type = 'sine';
      
      const startTime = now + index * 0.08;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.2, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  }

  // Game over sound (descending tones)
  playGameOver() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [392, 349.23, 293.66, 261.63]; // G4, F4, D4, C4
    
    notes.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, now + index * 0.2);
      oscillator.type = 'triangle';
      
      const startTime = now + index * 0.2;
      gainNode.gain.setValueAtTime(this.masterVolume * 0.25, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.5);
    });
  }

  // Victory sound (ascending triumph)
  playVictory() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [261.63, 329.63, 392, 523.25]; // C4, E4, G4, C5
    
    notes.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, now + index * 0.15);
      oscillator.type = 'sine';
      
      const startTime = now + index * 0.15;
      gainNode.gain.setValueAtTime(this.masterVolume * 0.25, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.6);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.6);
    });
  }

  // HQ damage sound (alarm beep)
  playHQDamage() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    for (let i = 0; i < 2; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      const startTime = now + i * 0.15;
      oscillator.frequency.setValueAtTime(660, startTime);
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(this.masterVolume * 0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.1);
    }
  }

  // Soft whoosh for turn changes
  playTurnChange() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(200, now);
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.15);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(this.masterVolume * 0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    oscillator.start(now);
    oscillator.stop(now + 0.15);
  }

  // Chain reaction cascade sound (rapid pops)
  playChainReaction(intensity: number = 1) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const pops = Math.min(5, Math.max(1, Math.floor(intensity)));
    
    for (let i = 0; i < pops; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      const startTime = now + i * 0.05;
      const freq = 600 + Math.random() * 400;
      
      oscillator.frequency.setValueAtTime(freq, startTime);
      oscillator.frequency.exponentialRampToValueAtTime(freq * 0.5, startTime + 0.08);
      
      gainNode.gain.setValueAtTime(this.masterVolume * 0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.08);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.08);
    }
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
