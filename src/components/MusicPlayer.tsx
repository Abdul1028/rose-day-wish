"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicPlayer({ isPlaying, onToggle }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/your-audio.mp3');
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isPlaying]);

  return (
    <button
      onClick={onToggle}
      className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <Image
        src={isPlaying ? "/pause.svg" : "/play.svg"}
        alt="Music control"
        width={24}
        height={24}
        className="dark:invert"
      />
    </button>
  );
} 