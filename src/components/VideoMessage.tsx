"use client";

import { useState, useRef } from 'react';
import { COUPLE } from '@/config/content';

export default function VideoMessage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing video:", error);
        });
    }
  };

  return (
    <section className="garden-section">
      <h2 className="text-3xl font-dancing text-primary mb-8">
        The Best Girl I Know
      </h2>

      <div className="relative w-[320px] h-[560px] rounded-lg overflow-hidden">
        {/* Heart-shaped frame overlay */}
        <div className="absolute inset-0 border-[20px] border-primary/20 rounded-lg z-10"></div>
        
        {!isPlaying && (
          <div 
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 cursor-pointer"
            onClick={handlePlay}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  className="w-10 h-10"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-white font-dancing text-xl">
                Click to watch {COUPLE.from}&apos;s message
              </p>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls={isPlaying}
          playsInline
          preload="metadata"
          muted
          onEnded={() => setIsPlaying(false)}
        >
          <source src="/video/message.mp4" type="video/mp4" />
          <source src="/video/message.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      <p className="text-sm text-foreground/70 mt-4 text-center max-w-md">
        A heartfelt message from {COUPLE.from} to {COUPLE.to} ❤️
      </p>
    </section>
  );
} 