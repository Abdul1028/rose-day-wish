"use client";

import { useState } from 'react';
import { LOVE_NOTES } from '@/config/content';
import Image from 'next/image';

export default function LoveNotesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % LOVE_NOTES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + LOVE_NOTES.length) % LOVE_NOTES.length);
  };

  return (
    <section className="garden-section">
      <h2 className="text-3xl font-dancing text-primary mb-8">Love Notes</h2>
      
      <div className="relative w-full max-w-2xl">
        <div className="relative bg-white/90 dark:bg-black/90 p-8 rounded-lg shadow-xl">
          <div className="absolute -top-4 -left-4 w-8 h-8">
            <Image
              src="/images/rose-corner.svg"
              alt="Rose decoration"
              width={32}
              height={32}
            />
          </div>
          
          <p className="text-2xl font-dancing text-primary text-center min-h-[100px] flex items-center justify-center">
            {LOVE_NOTES[currentIndex].message}
          </p>
          
          <div className="absolute -bottom-4 -right-4 w-8 h-8 transform rotate-180">
            <Image
              src="/images/rose-corner.svg"
              alt="Rose decoration"
              width={32}
              height={32}
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={prevSlide}
            className="rose-button !px-4"
            aria-label="Previous note"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="rose-button !px-4"
            aria-label="Next note"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
} 