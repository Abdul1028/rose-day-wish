"use client";

import { useState } from "react";
import { COUPLE } from "@/config/content";
import MusicPlayer from "@/components/MusicPlayer";
import Garden from "@/components/Garden";

export default function Home() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showGarden, setShowGarden] = useState(false);
  const [showMusicAlert, setShowMusicAlert] = useState(false);

  const handleEnterGarden = () => {
    if (!isMusicPlaying) {
      // Show music alert
      setShowMusicAlert(true);
    } else {
      setShowGarden(true);
    }
  };

  const handleMusicChoice = (turnOn: boolean) => {
    if (turnOn) {
      setIsMusicPlaying(true);
    }
    setShowMusicAlert(false);
    setShowGarden(true);
  };

  return (
    <main className="min-h-screen relative">
      {/* Music player - fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <MusicPlayer 
          isPlaying={isMusicPlaying} 
          onToggle={() => setIsMusicPlaying(!isMusicPlaying)} 
        />
      </div>

      {showMusicAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-background p-8 rounded-2xl shadow-2xl max-w-sm mx-4 text-center">
            <p className="text-2xl font-dancing text-primary mb-6">
              Would you like to continue with music? 🎵
            </p>
            <div className="flex flex-col gap-4">
              <button 
                className="rose-button group relative overflow-hidden"
                onClick={() => handleMusicChoice(true)}
              >
                <span className="relative z-10">Turn On Music</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button 
                className="px-6 py-3 text-primary border-2 border-primary rounded-full 
                          transition-all duration-300 hover:bg-primary hover:text-white
                          font-dancing text-xl"
                onClick={() => handleMusicChoice(false)}
              >
                Continue Without Music
              </button>
            </div>
          </div>
        </div>
      )}

      {!showGarden ? (
        <section className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-dancing text-primary">
              Happy Rose Day
            </h1>
            
            <p className="text-lg md:text-2xl font-playfair px-4 md:px-8">
              Dear {COUPLE.to}, welcome to this special digital garden filled with
              endless roses, created with love by {COUPLE.from}
            </p>

            <button 
              className="rose-button animate-bounce mt-4"
              onClick={handleEnterGarden}
            >
              Enter the Garden
            </button>
          </div>

          {/* Optional decorative elements */}
          <div className="absolute top-10 left-10 opacity-20 rotate-45">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
              <path d="M12,2C8.5,2,6.7,4.4,6.7,4.4S4.9,2,1.4,2C-2.1,2,2.4,8.5,6.7,12.8C11,8.5,15.5,2,12,2z"/>
            </svg>
          </div>
          <div className="absolute bottom-10 right-10 opacity-20 -rotate-45">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
              <path d="M12,2C8.5,2,6.7,4.4,6.7,4.4S4.9,2,1.4,2C-2.1,2,2.4,8.5,6.7,12.8C11,8.5,15.5,2,12,2z"/>
            </svg>
          </div>
        </section>
      ) : (
        <Garden />
      )}
    </main>
  );
}
