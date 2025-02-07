"use client";

import { useState } from "react";
import { COUPLE } from "@/config/content";
import MusicPlayer from "@/components/MusicPlayer";
import Garden from "@/components/Garden";

export default function Home() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showGarden, setShowGarden] = useState(false);

  return (
    <main className="min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <MusicPlayer 
          isPlaying={isMusicPlaying} 
          onToggle={() => setIsMusicPlaying(!isMusicPlaying)} 
        />
      </div>

      {!showGarden ? (
        <section className="garden-section">
          <h1 className="text-4xl md:text-6xl text-center font-dancing text-primary mb-8">
            Happy Rose Day
          </h1>
          
          <p className="text-xl md:text-2xl text-center font-playfair mb-8 max-w-2xl">
            Dear {COUPLE.to}, welcome to this special digital garden filled with
            endless roses, created with love by {COUPLE.from}
          </p>

          <button 
            className="rose-button"
            onClick={() => setShowGarden(true)}
          >
            Enter the Garden
          </button>
        </section>
      ) : (
        <Garden />
      )}
    </main>
  );
}
