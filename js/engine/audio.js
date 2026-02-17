// Audio Manager with proper sound integration
export class AudioManager {
    constructor() {
        this.sounds = {};
        this.music = null;
        this.musicVolume = 0.3;
        this.sfxVolume = 0.5;
        this.enabled = true;
        
        // Initialize audio context on first user interaction
        this.audioContext = null;
        this.initialized = false;
        
        // Preload sound data
        this.soundData = {
            click: { freq: 800, duration: 0.05, type: 'square' },
            build: { freq: 500, duration: 0.1, type: 'sine' },
            upgrade: { freq: 600, duration: 0.15, type: 'triangle' },
            sell: { freq: 400, duration: 0.1, type: 'sawtooth' },
            shoot: { freq: 1200, duration: 0.05, type: 'square' },
            hit: { freq: 300, duration: 0.08, type: 'sawtooth' },
            kill: { freq: 600, duration: 0.1, type: 'sine' },
            damage: { freq: 200, duration: 0.2, type: 'sawtooth' },
            wave: { freq: 700, duration: 0.2, type: 'triangle' },
            victory: { freq: 800, duration: 0.3, type: 'sine' },
            defeat: { freq: 200, duration: 0.4, type: 'sawtooth' }
        };
    }
    
    init() {
        if (this.initialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.warn('Audio not supported:', e);
            this.enabled = false;
        }
    }
    
    play(soundName) {
        if (!this.enabled) return;
        
        // Initialize on first sound play
        if (!this.initialized) {
            this.init();
        }
        
        if (!this.audioContext) return;
        
        const soundConfig = this.soundData[soundName];
        if (!soundConfig) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = soundConfig.type;
            oscillator.frequency.value = soundConfig.freq;
            
            gainNode.gain.setValueAtTime(this.sfxVolume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                this.audioContext.currentTime + soundConfig.duration
            );
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + soundConfig.duration);
        } catch (e) {
            console.warn('Error playing sound:', e);
        }
    }
    
    playMusic(trackName) {
        if (!this.enabled) return;
        
        // Initialize on first sound play
        if (!this.initialized) {
            this.init();
        }
        
        // Simple background music using oscillators
        this.stopMusic();
        
        if (!this.audioContext) return;
        
        try {
            // Create a simple ambient background tone
            const oscillator1 = this.audioContext.createOscillator();
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator1.type = 'sine';
            oscillator2.type = 'sine';
            
            oscillator1.frequency.value = 220; // A3
            oscillator2.frequency.value = 330; // E4
            
            gainNode.gain.setValueAtTime(this.musicVolume * 0.1, this.audioContext.currentTime);
            
            oscillator1.start();
            oscillator2.start();
            
            this.music = { oscillator1, oscillator2, gainNode };
        } catch (e) {
            console.warn('Error playing music:', e);
        }
    }
    
    stopMusic() {
        if (this.music) {
            try {
                this.music.oscillator1.stop();
                this.music.oscillator2.stop();
            } catch (e) {
                // Already stopped
            }
            this.music = null;
        }
    }
    
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.music && this.music.gainNode) {
            this.music.gainNode.gain.setValueAtTime(
                this.musicVolume * 0.1,
                this.audioContext.currentTime
            );
        }
    }
    
    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }
    
    toggleSound() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopMusic();
        }
        return this.enabled;
    }
}
