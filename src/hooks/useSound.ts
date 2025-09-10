import { useCallback, useRef } from 'react';

type SoundType = 'move' | 'win' | 'draw' | 'reset' | 'button';

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playBeep = useCallback((frequency: number, duration: number, volume: number = 0.1) => {
    try {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }, [getAudioContext]);

  const playSound = useCallback((type: SoundType) => {
    switch (type) {
      case 'move':
        playBeep(800, 0.1, 0.1);
        break;
      case 'win':
        // Play a victory melody
        setTimeout(() => playBeep(523, 0.2, 0.15), 0);   // C
        setTimeout(() => playBeep(659, 0.2, 0.15), 200); // E
        setTimeout(() => playBeep(784, 0.4, 0.15), 400); // G
        break;
      case 'draw':
        playBeep(400, 0.3, 0.1);
        break;
      case 'reset':
        playBeep(600, 0.15, 0.1);
        break;
      case 'button':
        playBeep(1000, 0.05, 0.05);
        break;
      default:
        break;
    }
  }, [playBeep]);

  return { playSound };
}